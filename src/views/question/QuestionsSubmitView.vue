<template>
  <div id="questionsSubmitView">
    <!-- 搜索表单 -->
    <a-card class="search-card">
      <a-form :model="searchParams" layout="inline">
        <a-form-item field="questionId" label="题号" class="form-item">
          <a-input
            v-model="searchParams.questionId"
            placeholder="请输入题号"
            allow-clear
            class="input-field"
          />
        </a-form-item>
        <a-form-item field="language" label="编程语言" class="form-item">
          <a-select
            v-model="searchParams.language"
            placeholder="选择编程语言"
            allow-clear
            class="select-field"
          >
            <a-option value="java">Java</a-option>
            <a-option value="cpp">C++</a-option>
            <a-option value="go">Go</a-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" class="search-button" @click="doSubmit">
            <template #icon>
              <icon-search />
            </template>
            搜索
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>

    <!-- 表格区域 -->
    <a-card class="table-card">
      <a-table
        :ref="tableRef"
        :columns="columns"
        :data="dataList"
        :pagination="{
          showTotal: true,
          pageSize: searchParams.pageSize,
          current: searchParams.current,
          total,
        }"
        class="data-table"
        @page-change="onPageChange"
        @row-click="onRowClick"
      >
        <!-- 提交号 -->
        <template #id="{ record }">
          <div class="hidden-id">
            {{ formatHiddenId(record.id) }}
          </div>
        </template>

        <!-- 题目 ID -->
        <template #questionId="{ record }">
          <div class="hidden-id">
            {{ formatHiddenId(record.questionId) }}
          </div>
        </template>

        <!-- 评测信息 -->
        <template #judgeInfo="{ record }">
          <a-tag :color="getJudgeInfoColor(record.judgeInfo)" class="judge-tag">
            {{ JSON.stringify(record.judgeInfo) }}
          </a-tag>
        </template>

        <!-- 评测状态 -->
        <template #status="{ record }">
          <a-tag :color="getStatusColor(record.status)" class="status-tag">
            {{ getStatusIcon(record.status) }}
            {{ getStatusText(record.status) }}
          </a-tag>
        </template>

        <!-- 创建时间 -->
        <template #createTime="{ record }">
          <div class="create-time">
            {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
          </div>
        </template>

        <!-- 智能代码分析 -->
        <template #analysisData="{ record }">
          <a-textarea
            v-model="record.analysisData"
            :auto-size="{ minRows: 3, maxRows: 5 }"
            placeholder="分析结果"
            class="analysis-textarea"
            readonly
          />
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import {
  QuestionControllerService,
  QuestionSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import moment from "moment";
import axios from "axios";
import router from "@/router";
import { IconSearch } from "@arco-design/web-vue/es/icon";

interface QuestionSubmitRecord {
  id: number;
  language: string;
  judgeInfo: any;
  status: number;
  questionId: number;
  userId: number;
  createTime: string;
  analysisData?: string;
}

const tableRef = ref();
const dataList = ref<QuestionSubmitRecord[]>([]);
const total = ref(0);
const searchParams = ref<QuestionSubmitQueryRequest>({
  questionId: undefined,
  language: undefined,
  pageSize: 10,
  current: 1,
});

let timer: any;

onMounted(() => {
  loadData();
  timer = setInterval(loadData, 2000);
});

onUnmounted(() => {
  clearInterval(timer);
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionSubmitByPageUsingPost(
    searchParams.value
  );

  if (res.code === 0) {
    dataList.value = res.data.records.map((record: any) => ({
      id: record.id,
      language: record.language,
      judgeInfo: record.judgeInfo,
      status: record.status,
      questionId: record.questionId,
      userId: record.userId,
      createTime: record.createTime,
      analysisData: undefined,
    }));
    total.value = res.data.total;

    console.log("JudgeInfo Data:", dataList.value[0].judgeInfo); // 打印第一条记录的 judgeInfo

    dataList.value.forEach(async (record) => {
      try {
        const analysisDataRes = await axios.get(
          `http://localhost:8101/api/question/inner/question_submit/getAnalysisData?questionSubmitId=${record.id}`
        );
        if (analysisDataRes.data) {
          record.analysisData = analysisDataRes.data;
        }
      } catch (error) {
        console.error("Error fetching analysis data:", error);
      }
    });
  } else {
    message.error("加载失败" + res.message);
  }
};

// 格式化隐藏 ID
const formatHiddenId = (id: number) => {
  const idStr = id.toString();
  if (idStr.length <= 8) {
    return idStr; // 如果长度不足 8 位，直接返回
  }
  const prefix = idStr.slice(0, 4); // 前四位
  const suffix = idStr.slice(-4); // 后四位
  return `${prefix}***${suffix}`;
};

// 获取评测信息颜色
const getJudgeInfoColor = (judgeInfo: any) => {
  if (judgeInfo?.message === "Accepted") {
    return "green";
  } else if (judgeInfo?.message === "Null") {
    return "orange";
  } else {
    return "red";
  }
};

// 获取状态颜色
const getStatusColor = (status: number) => {
  switch (status) {
    case 0: // 待评测
      return "blue";
    case 1: // 评测中
      return "orange";
    case 2: // 成功
      return "green";
    case 3: // 失败
      return "red";
    default:
      return "gray";
  }
};

// 获取状态图标
const getStatusIcon = (status: number) => {
  switch (status) {
    case 0: // 待评测
      return "🔒";
    case 1: // 评测中
      return "🚀";
    case 2: // 成功
      return "✅";
    case 3: // 失败
      return "❌";
    default:
      return "";
  }
};

// 获取状态文本
const getStatusText = (status: number) => {
  switch (status) {
    case 0:
      return "待评测";
    case 1:
      return "评测中";
    case 2:
      return "成功";
    case 3:
      return "失败";
    default:
      return "未知状态";
  }
};

const columns = [
  {
    title: "提交号",
    slotName: "id",
    width: 160, // 增加宽度以适应长 ID
  },
  {
    title: "编程语言",
    dataIndex: "language",
    width: 120,
  },
  {
    title: "评测信息",
    slotName: "judgeInfo",
    width: 200,
  },
  {
    title: "评测状态",
    slotName: "status",
    width: 120,
  },
  {
    title: "题目 ID",
    slotName: "questionId",
    width: 160, // 增加宽度以适应长 ID
  },
  {
    title: "创建时间",
    slotName: "createTime",
    width: 180,
  },
  {
    title: "智能代码分析",
    slotName: "analysisData",
    width: 300,
  },
];

const onPageChange = (page: number) => {
  searchParams.value.current = page;
};
const doSubmit = () => {
  searchParams.value.current = 1;
  loadData();
};
const onRowClick = (record: QuestionSubmitRecord) => {
  router.push({
    path: "/analysis",
    query: { questionSubmitId: record.id },
  });
};
</script>

<style scoped>
#questionsSubmitView {
  max-width: 1920px;
  margin: 0 auto;
  padding: 24px;
  background: linear-gradient(135deg, #f5f7fa, #e6e9ef);
}

.search-card {
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.search-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.table-card {
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.table-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.form-item {
  margin-right: 24px;
}

.input-field,
.select-field {
  width: 240px;
  border-radius: 8px;
}

.search-button {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.search-button:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
  transform: scale(1.05);
}

.data-table {
  border-radius: 12px;
}

.create-time {
  font-size: 14px;
  color: #606266;
}

.analysis-textarea {
  width: 100%;
  border-radius: 8px;
  border: 1px solid #dcdfe6;
  transition: border-color 0.3s ease;
  padding: 8px;
  font-size: 14px;
}

.analysis-textarea:hover {
  border-color: #409eff;
}

.analysis-textarea:focus {
  border-color: #409eff;
  outline: none;
}

.hidden-id {
  font-family: monospace; /* 使用等宽字体，使格式更整齐 */
}

:deep(.arco-table-th) {
  background-color: #f5f7fa;
  font-weight: 600;
  color: #303133;
}

:deep(.arco-table-tr) {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

:deep(.arco-table-tr:hover) {
  background-color: #f5f7fa;
  transform: scale(1.02);
}

.judge-tag {
  font-weight: bold;
  padding: 4px 12px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.judge-tag[color="green"] {
  background: linear-gradient(135deg, #4caf50, #81c784);
  color: white;
}

.judge-tag[color="orange"] {
  background: linear-gradient(135deg, #ff9800, #ffb74d);
  color: white;
}

.judge-tag[color="red"] {
  background: linear-gradient(135deg, #f44336, #e57373);
  color: white;
}

.status-tag {
  font-weight: bold;
  padding: 4px 12px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.status-tag[color="blue"] {
  background: linear-gradient(135deg, #2196f3, #64b5f6);
  color: white;
}

.status-tag[color="orange"] {
  background: linear-gradient(135deg, #ff9800, #ffb74d);
  color: white;
}

.status-tag[color="green"] {
  background: linear-gradient(135deg, #4caf50, #81c784);
  color: white;
}

.status-tag[color="red"] {
  background: linear-gradient(135deg, #f44336, #e57373);
  color: white;
}
</style>

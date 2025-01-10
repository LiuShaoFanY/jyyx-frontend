<template>
  <div id="questionsSubmitView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="questionId" label="题号" style="min-width: 240px">
        <a-input v-model="searchParams.questionId" placeholder="请输入" />
      </a-form-item>
      <a-form-item field="language" label="编程语言" style="min-width: 240px">
        <a-select
          v-model="searchParams.language"
          :style="{ width: '320px' }"
          placeholder="选择编程语言"
        >
          <a-option>java</a-option>
          <a-option>cpp</a-option>
          <a-option>go</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider :size="0" />
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
      @page-change="onPageChange"
      @row-click="onRowClick"
    >
      <template #judgeInfo="{ record }">
        {{ JSON.stringify(record.judgeInfo) }}
      </template>
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <template #analysisData="{ record }">
        <a-textarea
          v-model="record.analysisData"
          :auto-size="{ minRows: 5, maxRows: 6 }"
          placeholder="分析结果"
          style="width: 500px"
        />
      </template>
    </a-table>
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

const columns = [
  {
    title: "提交号",
    dataIndex: "id",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题信息",
    slotName: "judgeInfo",
  },
  {
    title: "判题状态",
    dataIndex: "status",
  },
  {
    title: "题目 id",
    dataIndex: "questionId",
  },
  {
    title: "提交者 id",
    dataIndex: "userId",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    title: "智能分析",
    slotName: "analysisData",
  },
];

const onPageChange = (page: number) => {
  searchParams.value.current = page;
};
const doSubmit = () => {
  searchParams.value.current = 1;
  loadData();
};
// 跳转到智能分析页面，并传递 questionSubmitId
const onRowClick = (record: QuestionSubmitRecord) => {
  // eslint-disable-next-line no-undef
  router.push({
    path: "/analysis", // 普通路由
    query: { questionSubmitId: record.id }, // 通过 query 传递参数
  });
};
</script>

<style scoped>
#questionsSubmitView {
  max-width: 1920px;
  margin: 0 auto;
}
</style>

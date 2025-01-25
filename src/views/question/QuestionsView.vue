<template>
  <div id="questionsView">
    <!-- 搜索表单 -->
    <a-form :model="searchParams" layout="inline" class="search-form">
      <!-- 名称输入框 -->
      <a-form-item field="title" label="名称" style="min-width: 240px">
        <a-input
          v-model="searchParams.title"
          placeholder="请输入名称"
          class="custom-input"
        />
      </a-form-item>
      <!-- 题目难度输入框 -->
      <a-form-item field="tags" label="题目难度" style="min-width: 240px">
        <a-input-tag
          v-model="searchParams.tags"
          placeholder="请输入题目难度"
          class="custom-input"
        />
      </a-form-item>
      <!-- 提交按钮 -->
      <a-form-item>
        <a-button type="primary" @click="doSubmit" class="submit-button"
          >提交
        </a-button>
      </a-form-item>
    </a-form>
    <!-- 分割线 -->
    <a-divider :size="0" class="custom-divider" />
    <!-- 表格 -->
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
      class="custom-table"
    >
      <!-- 题目难度标签列模板 -->
      <template #tags="{ record }">
        <a-space wrap>
          <a-tag
            v-for="(tag, index) of record.tags"
            :key="index"
            closable
            color="green"
            class="custom-tag"
            >{{ tag }}
          </a-tag>
        </a-space>
      </template>
      <!-- 通过率列模板 -->
      <template #acceptedRate="{ record }">
        {{
          `${
            record.submitNum ? record.acceptedNum / record.submitNum : "0"
          }% (${record.acceptedNum}/${record.submitNum})`
        }}
      </template>
      <!-- 创建时间列模板 -->
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
      <!-- 操作列模板 -->
      <template #optional="{ record }">
        <a-space>
          <a-button
            type="primary"
            @click="toQuestionPage(record)"
            class="action-button"
            >做题
          </a-button>
          <!--          <a-button status="danger" @click="doDelete(record)">删除</a-button>-->
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watchEffect } from "vue";
import {
  Question,
  QuestionControllerService,
  QuestionQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

// 表格引用
const tableRef = ref();
// 数据列表
const dataList = ref([]);
// 数据总数
const total = ref(0);
// 搜索参数
const searchParams = ref<QuestionQueryRequest>({
  title: "",
  tags: [],
  pageSize: 10,
  current: 1,
});

// 加载数据
const loadData = async () => {
  const res = await QuestionControllerService.listQuestionVoByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("加载失败" + res.message);
  }
};

/**
 * 监听searchParams 变量 改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});
/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});
// 表格列配置
const columns = [
  {
    title: "题号",
    dataIndex: "id",
  },
  {
    title: "题目名称",
    dataIndex: "title",
  },
  {
    title: "题目难度",
    slotName: "tags",
  },
  {
    title: "通过率",
    slotName: "acceptedRate",
  },
  {
    title: "创建时间",
    slotName: "createTime",
  },
  {
    slotName: "optional",
  },
];
// 分页变化处理
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

// 路由引用
const router = useRouter();
// 跳转到题目页面
const toQuestionPage = (question: Question) => {
  router.push({
    path: `/view/question/${question.id}`,
  });
};
// 提交搜索表单
const doSubmit = () => {
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};
</script>

<style scoped>
#questionsView {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.search-form {
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-input {
  border-radius: 4px;
  border: 1px solid #ddd;
  transition: border-color 0.3s ease;
}

.custom-input:hover {
  border-color: #409eff;
}

.submit-button {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border: none;
  border-radius: 4px;
  color: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(64, 158, 255, 0.3);
}

.custom-divider {
  margin: 20px 0;
  border-color: #ddd;
}

.custom-table {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-tag {
  border-radius: 12px;
  transition: transform 0.2s ease;
}

.custom-tag:hover {
  transform: scale(1.05);
}

.action-button {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border: none;
  border-radius: 4px;
  color: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(103, 194, 58, 0.3);
}
</style>

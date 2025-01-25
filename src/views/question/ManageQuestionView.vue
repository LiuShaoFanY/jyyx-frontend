<template>
  <div class="question-manage">
    <div class="content-card">
      <div class="header">
        <h2>题目管理</h2>
      </div>
      <a-table
        :ref="tableRef"
        :columns="columns"
        :data="dataList"
        :loading="loading"
        :scroll="{ x: '100%', y: 600 }"
        :pagination="{
          showTotal: true,
          pageSize: searchParams.pageSize,
          current: searchParams.current,
          total,
          showJumper: true,
          size: 'small',
        }"
        size="small"
        @page-change="onPageChange"
        class="custom-table"
      >
        <template #optional="{ record }">
          <a-space>
            <a-button
              class="action-btn edit-btn"
              type="primary"
              @click="doUpdate(record)"
            >
              <icon-edit />
              修改
            </a-button>
            <a-button
              class="action-btn delete-btn"
              status="danger"
              @click="doDelete(record)"
            >
              <icon-delete />
              删除
            </a-button>
          </a-space>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { h, onMounted, onUnmounted, ref, watchEffect } from "vue";
import { Question, QuestionControllerService } from "../../../generated";
import type { TableColumnData } from "@arco-design/web-vue";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import { IconDelete, IconEdit } from "@arco-design/web-vue/es/icon";

const tableRef = ref();
const dataList = ref([]);
const total = ref(0);
const loading = ref(false);

const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  loading.value = true;
  try {
    const res = await QuestionControllerService.listQuestionByPageUsingPost(
      searchParams.value
    );
    if (res.code === 0) {
      dataList.value = res.data.records;
      total.value = res.data.total;
    } else {
      Message.error("加载失败: " + res.message);
    }
  } catch (error) {
    Message.error("请求异常");
  } finally {
    loading.value = false;
  }
};

watchEffect(() => {
  loadData();
});

onMounted(() => {
  loadData();
  const timer = setInterval(loadData, 2000);

  onUnmounted(() => {
    clearInterval(timer);
  });
});

const formatDateTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date
    .toLocaleString("zh-CN", {
      timeZone: "Asia/Shanghai",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(/\//g, "-");
};

const formatId = (id: string) => {
  return id.toString().substring(0, 4) + "***" + id.toString().slice(-4);
};

const formatJsonContent = (content: any) => {
  if (typeof content === "string") {
    try {
      const obj = JSON.parse(content);
      return JSON.stringify(obj, null, 2);
    } catch {
      return content;
    }
  }
  return JSON.stringify(content, null, 2);
};

const createTextArea = (content: any) => {
  const formattedContent = formatJsonContent(content);
  return h("div", { class: "textarea-wrapper" }, [
    h("pre", { class: "content-pre" }, formattedContent),
  ]);
};

const getDifficultyColor = (tags: string) => {
  if (tags.includes("简单")) return "var(--easy-color)";
  if (tags.includes("中等")) return "var(--medium-color)";
  if (tags.includes("困难")) return "var(--hard-color)";
  return "var(--text-secondary)";
};

const columns: TableColumnData[] = [
  {
    title: "ID",
    dataIndex: "id",
    width: 120,
    render: ({ record }) => formatId(record.id),
  },
  {
    title: "标题",
    dataIndex: "title",
    width: 180,
    ellipsis: true,
  },
  {
    title: "内容",
    dataIndex: "content",
    width: 300,
    render: ({ record }) => createTextArea(record.content),
  },
  {
    title: "题目难度",
    dataIndex: "tags",
    width: 90,
    render: ({ record }) =>
      h(
        "span",
        { style: { color: getDifficultyColor(record.tags) } },
        record.tags
      ),
  },
  {
    title: "答案",
    dataIndex: "answer",
    width: 150,
    ellipsis: true,
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
    width: 80,
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
    width: 80,
  },
  {
    title: "评测配置",
    dataIndex: "judgeConfig",
    width: 250,
    render: ({ record }) => createTextArea(record.judgeConfig),
  },
  {
    title: "评测用例",
    dataIndex: "judgeCase",
    width: 250,
    render: ({ record }) => createTextArea(record.judgeCase),
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    width: 150,
    render: ({ record }) => formatDateTime(record.createTime),
  },
  {
    title: "操作",
    slotName: "optional",
    width: 130,
    fixed: "right",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();

const doDelete = async (question: Question) => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: question.id,
  });
  if (res.code === 0) {
    Message.success("删除成功");
    loadData();
  } else {
    Message.error("删除失败");
  }
};

const doUpdate = (question: Question) => {
  router.push({
    path: "/update/question",
    query: { id: question.id },
  });
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap");

:root {
  --primary-color: #4f46e5;
  --danger-color: #ef4444;
  --bg-color: #f9fafb;
  --border-color: #e5e7eb;
  --text-primary: #1f2937;
  --text-secondary: #4b5563;
  --easy-color: #10b981;
  --medium-color: #f59e0b;
  --hard-color: #ef4444;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --transition: all 0.2s ease-in-out;
}

* {
  font-family: "Inter", sans-serif;
}

.question-manage {
  padding: 24px;
  min-height: calc(100vh - 48px);
  background-color: var(--bg-color);
}

.content-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
  padding: 24px;
  transition: var(--transition);
}

.content-card:hover {
  box-shadow: var(--shadow-md);
}

.header {
  margin-bottom: 24px;
  padding: 0 8px;
}

.header h2 {
  color: var(--text-primary);
  font-size: 20px;
  font-weight: 600;
  margin: 0;
}

.custom-table {
  width: 100%;
  font-size: 14px;
}

.custom-table .arco-table-container {
  border-radius: 8px;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.custom-table .arco-table-th {
  background: #f3f4f6;
  font-weight: 600;
  padding: 12px;
  color: var(--text-primary);
  font-size: 14px;
}

.custom-table .arco-table-td {
  padding: 12px;
  transition: var(--transition);
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.5;
  vertical-align: top;
}

.custom-table .arco-table-tr:hover .arco-table-td {
  background-color: #f9fafb;
}

.textarea-wrapper {
  max-height: 200px;
  overflow-y: auto;
  background-color: #f9fafb;
  border: 1px solid var(--border-color);
  border-radius: 6px;
}

.content-pre {
  margin: 0;
  padding: 12px;
  font-family: "Courier New", Courier, monospace;
  font-size: 13px;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.action-btn {
  border-radius: 6px;
  padding: 0 12px;
  font-size: 13px;
  height: 32px;
  line-height: 32px;
  transition: var(--transition);
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.edit-btn {
  background: var(--primary-color);
  border: none;
}

.edit-btn:hover {
  background: #4338ca;
}

.delete-btn {
  background: var(--danger-color);
  border: none;
}

.delete-btn:hover {
  background: #dc2626;
}

.arco-pagination {
  margin-top: 24px;
  padding: 12px 0;
}

.arco-pagination-item {
  height: 32px;
  min-width: 32px;
  line-height: 30px;
  font-size: 14px;
  border-radius: 6px;
  transition: var(--transition);
}

.arco-pagination-item:hover {
  color: var(--primary-color);
  border-color: var(--primary-color);
}

.arco-pagination-item-active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: #fff;
}

@media screen and (max-width: 768px) {
  .question-manage {
    padding: 16px;
  }

  .content-card {
    padding: 16px;
  }

  .custom-table .arco-table-th,
  .custom-table .arco-table-td {
    padding: 8px;
    font-size: 13px;
  }

  .action-btn {
    padding: 0 8px;
    height: 28px;
    line-height: 28px;
  }
}
</style>

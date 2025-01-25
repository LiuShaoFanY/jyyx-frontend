<template>
  <div id="addQuestionView" class="container">
    <a-card class="form-card">
      <h2 class="form-title">创建题目</h2>
      <a-form :model="form" label-align="left" class="form">
        <!-- 标题 -->
        <a-form-item field="title" label="标题" class="form-item">
          <a-input
            v-model="form.title"
            placeholder="请输入标题"
            class="input"
          />
        </a-form-item>
        <!-- 题目难度 -->
        <a-form-item field="tags" label="题目难度" class="form-item">
          <a-select
            v-model="form.tags"
            placeholder="请选择题目难度"
            multiple
            allow-clear
            class="select"
          >
            <a-option value="简单">简单</a-option>
            <a-option value="中等">中等</a-option>
            <a-option value="困难">困难</a-option>
          </a-select>
        </a-form-item>
        <!-- 题目内容 -->
        <a-form-item field="content" label="题目内容" class="form-item">
          <MdEditor
            :handle-change="onContentChange"
            :value="form.content"
            class="editor"
          />
        </a-form-item>
        <!-- 答案 -->
        <a-form-item field="answer" label="答案" class="form-item">
          <MdEditor
            :handle-change="onAnswerChange"
            :value="form.answer"
            class="editor"
          />
        </a-form-item>
        <!-- 评测配置 -->
        <a-card class="config-card">
          <h3 class="config-title">评测配置</h3>
          <a-space direction="vertical" class="config-space">
            <!-- 时间限制 -->
            <a-form-item
              field="judgeConfig.timeLimit"
              label="时间限制"
              class="config-item"
            >
              <a-input-number
                v-model="form.judgeConfig.timeLimit"
                :min="0"
                mode="button"
                placeholder="请输入时间限制"
                class="input-number"
              />
            </a-form-item>

            <!-- 内存限制 -->
            <a-form-item
              field="judgeConfig.memoryLimit"
              label="内存限制"
              class="config-item"
            >
              <a-input-number
                v-model="form.judgeConfig.memoryLimit"
                :min="0"
                mode="button"
                placeholder="请输入内存限制"
                class="input-number"
              />
            </a-form-item>

            <!-- 堆栈限制 -->
            <a-form-item
              field="judgeConfig.stackLimit"
              label="堆栈限制"
              class="config-item"
            >
              <a-input-number
                v-model="form.judgeConfig.stackLimit"
                :min="0"
                mode="button"
                placeholder="请输入堆栈限制"
                class="input-number"
              />
            </a-form-item>
          </a-space>
        </a-card>

        <!-- 测试用例配置 -->
        <a-card class="config-card">
          <h3 class="config-title">测试用例配置</h3>
          <div
            v-for="(judgeCaseItem, index) in form.judgeCase"
            :key="index"
            class="test-case-item"
          >
            <a-space direction="vertical" class="test-case-space">
              <!-- 输入用例 -->
              <a-form-item
                :field="`form.judgeCase[${index}].input`"
                :label="`输入用例-${index + 1}`"
                class="test-case-form-item"
              >
                <a-textarea
                  v-model="judgeCaseItem.input"
                  :auto-size="{ minRows: 3, maxRows: 5 }"
                  placeholder="请输入测试输入用例"
                  class="textarea"
                />
              </a-form-item>

              <!-- 输出用例 -->
              <a-form-item
                :field="`form.judgeCase[${index}].output`"
                :label="`输出用例-${index + 1}`"
                class="test-case-form-item"
              >
                <a-textarea
                  v-model="judgeCaseItem.output"
                  :auto-size="{ minRows: 3, maxRows: 5 }"
                  placeholder="请输入测试输出用例"
                  class="textarea"
                />
              </a-form-item>

              <!-- 删除按钮 -->
              <a-button
                status="danger"
                class="delete-button"
                @click="handleDelete(index)"
              >
                删除
              </a-button>
            </a-space>
          </div>
          <a-button
            status="success"
            type="outline"
            class="add-button"
            @click="handleAdd"
          >
            新增测试用例
          </a-button>
        </a-card>

        <!-- 提交按钮 -->
        <a-form-item class="submit-item">
          <a-button type="primary" class="submit-button" @click="doSubmit">
            提交
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const route = useRoute();
const store = useStore();
const updatePage = route.path.includes("update");
let form = ref({
  title: "",
  tags: [] as string[], // 修改为数组类型
  answer: "",
  content: "",
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
  judgeCase: [
    {
      input: "",
      output: "",
    },
  ],
});
const hasPermission = () => {
  const userRole = store.state.user.loginUser.userRole;
  return userRole === "teacher" || userRole === "administrator";
};
const loadData = async () => {
  if (!hasPermission()) {
    message.error("您没有权限访问此页面");
    return;
  }
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    if (!form.value.judgeCase) {
      form.value.judgeCase = [
        {
          input: "",
          output: "",
        },
      ];
    } else {
      form.value.judgeCase = JSON.parse(form.value.judgeCase as any);
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        memoryLimit: 1000,
        stackLimit: 1000,
        timeLimit: 1000,
      };
    } else {
      form.value.judgeConfig = JSON.parse(form.value.judgeConfig as any);
    }
    if (!form.value.tags) {
      form.value.tags = [];
    } else {
      form.value.tags = JSON.parse(form.value.tags as any);
    }
  } else {
    message.error("加载失败" + res.message);
  }
};

onMounted(() => {
  if (!hasPermission()) {
    message.error("您没有权限访问此页面");
    return;
  }

  loadData();
});

const doSubmit = async () => {
  if (!hasPermission()) {
    message.error("您没有权限执行此操作");
    return;
  }

  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("更新成功");
    } else {
      message.error("更新失败" + res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("创建成功");
    } else {
      message.error("创建失败" + res.message);
    }
  }
};

const handleAdd = () => {
  if (!hasPermission()) {
    message.error("您没有权限执行此操作");
    return;
  }

  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};

const handleDelete = (index: number) => {
  if (!hasPermission()) {
    message.error("您没有权限执行此操作");
    return;
  }

  form.value.judgeCase.splice(index, 1);
};

const onContentChange = (value: string) => {
  form.value.content = value;
};

const onAnswerChange = (value: string) => {
  form.value.answer = value;
};
</script>

<style scoped>
.container {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  min-height: 100vh;
}

.form-card {
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: white;
  padding: 24px;
}

.form-title {
  text-align: center;
  margin-bottom: 24px;
  font-size: 24px;
  color: #2c3e50;
}

.form-item {
  margin-bottom: 16px;
}

.input,
.select,
.textarea {
  width: 100%;
}

.editor {
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  overflow: hidden;
}

.config-card {
  margin-top: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: #f9fafb;
  padding: 16px;
}

.config-title {
  font-size: 18px;
  color: #34495e;
  margin-bottom: 16px;
}

.config-space {
  width: 100%;
}

.config-item {
  margin-bottom: 12px;
}

.input-number {
  width: 100%;
}

.test-case-item {
  margin-bottom: 16px;
}

.test-case-space {
  width: 100%;
}

.test-case-form-item {
  margin-bottom: 12px;
}

.textarea {
  width: 100%;
}

.delete-button {
  margin-top: 8px;
}

.add-button {
  margin-top: 16px;
  width: 100%;
}

.submit-item {
  margin-top: 24px;
  text-align: center;
}

.submit-button {
  width: 200px;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 6px;
  padding: 12px 24px;
  transition: background 0.3s ease;
}

.submit-button:hover {
  background: linear-gradient(135deg, #2575fc, #6a11cb);
}
</style>

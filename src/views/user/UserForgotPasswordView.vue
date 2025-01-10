<template>
  <a-card class="forgot-password-card">
    <h2 class="title">忘记密码</h2>
    <a-form
      :model="formData"
      :style="{ maxWidth: '400px', margin: '0 auto' }"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        :rules="[{ required: true, message: '请输入用户账号' }]"
        field="userAccount"
        label="用户账号"
      >
        <a-input v-model="formData.userAccount" placeholder="请输入用户账号" />
      </a-form-item>

      <a-form-item
        :rules="[
          { required: true, message: '请输入新密码' },
          { minLength: 6, message: '密码长度不能少于6位' },
        ]"
        field="newPassword"
        label="新密码"
      >
        <a-input-password
          v-model="formData.newPassword"
          placeholder="请输入新密码"
        />
      </a-form-item>

      <a-form-item
        :rules="[
          { required: true, message: '请确认密码' },
          {
            validator: (value, callback) => {
              if (value !== formData.newPassword) {
                callback('两次输入的密码不一致');
              }
            },
          },
        ]"
        field="checkPassword"
        label="确认密码"
      >
        <a-input-password
          v-model="formData.checkPassword"
          placeholder="请确认密码"
        />
      </a-form-item>

      <a-form-item>
        <a-button
          :loading="loading"
          :style="{ width: '100%' }"
          html-type="submit"
          type="primary"
        >
          重置密码
        </a-button>
      </a-form-item>

      <a-form-item>
        <a-button type="text" @click="goToLogin">返回登录</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";
import axios from "axios";

const router = useRouter();
const formData = ref({
  userAccount: "",
  newPassword: "",
  checkPassword: "",
});
const loading = ref(false);

const handleSubmit = async () => {
  try {
    loading.value = true;
    const response = await axios.post(
      "\n" + "http://localhost:8101/api/user/resetPassword",
      formData.value
    );
    if (response.data.code === 0) {
      Message.success("密码重置成功，请重新登录");
      router.push("/user/login"); // 重置成功后跳转到登录页面
    } else {
      Message.error(response.data.message || "重置密码失败");
    }
  } catch (error) {
    Message.error("请求失败，请稍后重试");
  } finally {
    loading.value = false;
  }
};
// 跳转到登录页面
const goToLogin = () => {
  router.push("/user/login");
};
</script>

<style scoped>
.forgot-password-card {
  max-width: 500px;
  margin: 100px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.arco-btn-primary {
  background-color: #1890ff;
  border-color: #1890ff;
}

.arco-btn-primary:hover {
  background-color: #40a9ff;
  border-color: #40a9ff;
}

.arco-btn-text {
  color: #1890ff;
}

.arco-btn-text:hover {
  color: #40a9ff;
}
</style>

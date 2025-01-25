<!--<template>-->
<!--  <a-card style="width: 400px; margin: 100px auto" title="登录">-->
<!--    <a-form :model="form" @submit="handleSubmit">-->
<!--      <a-form-item field="role" label="登录角色">-->
<!--        <a-radio-group v-model="form.role" @change="handleRoleChange">-->
<!--          <a-radio value="administrator">超级管理员</a-radio>-->
<!--          <a-radio value="teacher">教师</a-radio>-->
<!--          <a-radio value="student">学生</a-radio>-->
<!--        </a-radio-group>-->
<!--      </a-form-item>-->

<!--      <a-form-item field="userAccount" label="账号">-->
<!--        <a-input v-model="form.userAccount" placeholder="请输入账号" />-->
<!--      </a-form-item>-->

<!--      <a-form-item field="userPassword" label="密码">-->
<!--        <a-input-password-->
<!--          v-model="form.userPassword"-->
<!--          placeholder="请输入密码"-->
<!--        />-->
<!--      </a-form-item>-->

<!--      <a-form-item>-->
<!--        <a-button-->
<!--          :loading="loading"-->
<!--          html-type="submit"-->
<!--          style="width: 100%"-->
<!--          type="primary"-->
<!--        >-->
<!--          登录-->
<!--        </a-button>-->
<!--      </a-form-item>-->

<!--      <a-form-item>-->
<!--        <div style="text-align: center">-->
<!--          <a style="color: #1890ff; cursor: pointer" @click="goToRegister"-->
<!--            >没有账号？立即注册</a-->
<!--          >-->
<!--          <span style="margin: 0 10px">|</span>-->
<!--          <a style="color: #1890ff; cursor: pointer" @click="goToForgotPassword"-->
<!--            >忘记密码？</a-->
<!--          >-->
<!--        </div>-->
<!--      </a-form-item>-->
<!--    </a-form>-->
<!--  </a-card>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref } from "vue";-->
<!--import { useRouter } from "vue-router";-->
<!--import axios from "axios";-->
<!--import { useStore } from "vuex";-->
<!--import { Message } from "@arco-design/web-vue";-->

<!--const router = useRouter();-->
<!--const store = useStore();-->

<!--const form = ref({-->
<!--  role: "administrator",-->
<!--  userAccount: "",-->
<!--  userPassword: "",-->
<!--});-->

<!--const loading = ref(false);-->

<!--const handleRoleChange = (value) => {-->
<!--  console.log("选择的登录角色:", value);-->
<!--};-->

<!--const handleSubmit = async () => {-->
<!--  loading.value = true;-->
<!--  try {-->
<!--    const { role, userAccount, userPassword } = form.value;-->

<!--    let loginUrl = "";-->
<!--    if (role === "administrator") {-->
<!--      loginUrl = "http://localhost:8101/api/user/administrator/login";-->
<!--    } else if (role === "teacher") {-->
<!--      loginUrl = "http://localhost:8101/api/user/teacher/login";-->
<!--    } else if (role === "student") {-->
<!--      loginUrl = "http://localhost:8101/api/user/student/login";-->
<!--    }-->

<!--    // 发送登录请求-->
<!--    const response = await axios.post(-->
<!--      loginUrl,-->
<!--      {-->
<!--        userAccount,-->
<!--        userPassword,-->
<!--      },-->
<!--      { withCredentials: true }-->
<!--    );-->

<!--    if (response.data.code === 0) {-->
<!--      Message.success("登录成功！");-->

<!--      // 存储 user_id 到 localStorage-->
<!--      localStorage.setItem("user_id", response.data.data.user_id);-->
<!--      console.log(-->
<!--        "登录成功，user_id 已存储到 localStorage:",-->
<!--        response.data.data.user_id-->
<!--      );-->

<!--      // 更新 Vuex 中的用户信息-->
<!--      store.commit("user/updateUser", {-->
<!--        username: response.data.data.userName,-->
<!--        userRole: response.data.data.userRole,-->
<!--        user_id: response.data.data.user_id,-->
<!--      });-->

<!--      // 根据角色跳转到不同页面-->
<!--      if (response.data.data.userRole === "teacher") {-->
<!--        router.push("/teacher-dashboard");-->
<!--      } else if (response.data.data.userRole === "student") {-->
<!--        router.push("/student-dashboard");-->
<!--      } else if (response.data.data.userRole === "administrator") {-->
<!--        router.push("/admin-dashboard");-->
<!--      } else {-->
<!--        router.push("/dashboard");-->
<!--      }-->
<!--    } else {-->
<!--      Message.error("登录失败，请检查账号和密码！");-->
<!--    }-->
<!--  } catch (error) {-->
<!--    Message.error("请求失败，请稍后重试！");-->
<!--    console.error("登录请求失败:", error);-->
<!--  } finally {-->
<!--    loading.value = false;-->
<!--  }-->
<!--};-->

<!--const goToRegister = () => {-->
<!--  router.push("/user/register");-->
<!--};-->

<!--const goToForgotPassword = () => {-->
<!--  router.push("/user/forgot-password");-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.a-card {-->
<!--  border-radius: 8px;-->
<!--  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);-->
<!--}-->

<!--.a-button {-->
<!--  background-color: #1890ff;-->
<!--  border-color: #1890ff;-->
<!--}-->

<!--.a-button:hover {-->
<!--  background-color: #40a9ff;-->
<!--  border-color: #40a9ff;-->
<!--}-->

<!--.a-button:active {-->
<!--  background-color: #096dd9;-->
<!--  border-color: #096dd9;-->
<!--}-->

<!--.a-button[disabled] {-->
<!--  background-color: #f5f5f5;-->
<!--  border-color: #d9d9d9;-->
<!--  color: rgba(0, 0, 0, 0.25);-->
<!--}-->

<!--a {-->
<!--  color: #1890ff;-->
<!--  text-decoration: none;-->
<!--}-->

<!--a:hover {-->
<!--  color: #40a9ff;-->
<!--}-->

<!--a:active {-->
<!--  color: #096dd9;-->
<!--}-->
<!--</style>-->
<!--<style scoped>-->
<!--.a-card {-->
<!--  border-radius: 8px;-->
<!--  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);-->
<!--}-->

<!--.a-button {-->
<!--  background-color: #1890ff;-->
<!--  border-color: #1890ff;-->
<!--}-->

<!--.a-button:hover {-->
<!--  background-color: #40a9ff;-->
<!--  border-color: #40a9ff;-->
<!--}-->

<!--.a-button:active {-->
<!--  background-color: #096dd9;-->
<!--  border-color: #096dd9;-->
<!--}-->

<!--.a-button[disabled] {-->
<!--  background-color: #f5f5f5;-->
<!--  border-color: #d9d9d9;-->
<!--  color: rgba(0, 0, 0, 0.25);-->
<!--}-->

<!--a {-->
<!--  color: #1890ff;-->
<!--  text-decoration: none;-->
<!--}-->

<!--a:hover {-->
<!--  color: #40a9ff;-->
<!--}-->

<!--a:active {-->
<!--  color: #096dd9;-->
<!--}-->
<!--</style>-->
<template>
  <div class="login-container">
    <a-card class="login-card">
      <h1 class="login-title">登录</h1>
      <a-form :model="form" @submit="handleSubmit">
        <a-form-item field="role" label="登录角色">
          <a-radio-group v-model="form.role" @change="handleRoleChange">
            <a-radio value="administrator">超级管理员</a-radio>
            <a-radio value="teacher">教师</a-radio>
            <a-radio value="student">学生</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item field="userAccount" label="账号">
          <a-input
            v-model="form.userAccount"
            placeholder="请输入账号"
            class="input-field"
          >
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item field="userPassword" label="密码">
          <a-input-password
            v-model="form.userPassword"
            placeholder="请输入密码"
            class="input-field"
          >
            <template #prefix>
              <icon-lock />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button
            :loading="loading"
            html-type="submit"
            class="login-button"
            type="primary"
          >
            登录
          </a-button>
        </a-form-item>

        <a-form-item>
          <div class="login-links">
            <a class="link" @click="goToRegister">没有账号？立即注册</a>
            <span class="link-divider">|</span>
            <a class="link" @click="goToForgotPassword">忘记密码？</a>
          </div>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";
import { Message } from "@arco-design/web-vue";
import { IconUser, IconLock } from "@arco-design/web-vue/es/icon";

const router = useRouter();
const store = useStore();

const form = ref({
  role: "administrator",
  userAccount: "",
  userPassword: "",
});

const loading = ref(false);

const handleRoleChange = (value) => {
  console.log("选择的登录角色:", value);
};

const handleSubmit = async () => {
  loading.value = true;
  try {
    const { role, userAccount, userPassword } = form.value;

    let loginUrl = "";
    if (role === "administrator") {
      loginUrl = "http://localhost:8101/api/user/administrator/login";
    } else if (role === "teacher") {
      loginUrl = "http://localhost:8101/api/user/teacher/login";
    } else if (role === "student") {
      loginUrl = "http://localhost:8101/api/user/student/login";
    }

    // 发送登录请求
    const response = await axios.post(
      loginUrl,
      {
        userAccount,
        userPassword,
      },
      { withCredentials: true }
    );

    if (response.data.code === 0) {
      Message.success("登录成功！");

      // 存储 user_id 到 localStorage
      localStorage.setItem("user_id", response.data.data.user_id);
      console.log(
        "登录成功，user_id 已存储到 localStorage:",
        response.data.data.user_id
      );

      // 更新 Vuex 中的用户信息
      store.commit("user/updateUser", {
        username: response.data.data.userName,
        userRole: response.data.data.userRole,
        user_id: response.data.data.user_id,
      });

      // 根据角色跳转到不同页面
      if (response.data.data.userRole === "teacher") {
        router.push("/teacher-dashboard");
      } else if (response.data.data.userRole === "student") {
        router.push("/student-dashboard");
      } else if (response.data.data.userRole === "administrator") {
        router.push("/admin-dashboard");
      } else {
        router.push("/dashboard");
      }
    } else {
      Message.error("登录失败，请检查账号和密码！");
    }
  } catch (error) {
    Message.error("请求失败，请稍后重试！");
    console.error("登录请求失败:", error);
  } finally {
    loading.value = false;
  }
};

const goToRegister = () => {
  router.push("/user/register");
};

const goToForgotPassword = () => {
  router.push("/user/forgot-password");
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;

  padding: 20px;
}

.login-card {
  width: 400px;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.login-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 24px;
}

.input-field {
  width: 100%;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.input-field:hover {
  border-color: #409eff;
}

.login-button {
  width: 100%;
  border-radius: 8px;
  background-color: #1890ff;
  border-color: #1890ff;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.login-button:hover {
  background-color: #40a9ff;
  border-color: #40a9ff;
  transform: scale(1.05);
}

.login-button:active {
  background-color: #096dd9;
  border-color: #096dd9;
}

.login-links {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
}

.link {
  color: #1890ff;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.link:hover {
  color: #40a9ff;
}

.link:active {
  color: #096dd9;
}

.link-divider {
  margin: 0 10px;
  color: #d9d9d9;
}
</style>

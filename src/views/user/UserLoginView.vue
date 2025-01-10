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

<!--      &lt;!&ndash; 添加注册和忘记密码的链接 &ndash;&gt;-->
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
<!--import { Message } from "@arco-design/web-vue"; // 引入 Message 组件-->

<!--const router = useRouter();-->
<!--const store = useStore();-->

<!--// 表单数据-->
<!--const form = ref({-->
<!--  role: "user", // 默认选择普通用户-->
<!--  userAccount: "",-->
<!--  userPassword: "",-->
<!--});-->

<!--// 加载状态-->
<!--const loading = ref(false);-->

<!--// 处理角色切换-->
<!--const handleRoleChange = (value) => {-->
<!--  console.log("选择的登录角色:", value);-->
<!--};-->

<!--const handleSubmit = async () => {-->
<!--  loading.value = true;-->
<!--  try {-->
<!--    const { role, userAccount, userPassword } = form.value;-->

<!--    let loginUrl = "";-->
<!--    if (role === "user") {-->
<!--      loginUrl = "http://localhost:8101/api/user/login"; // 普通用户登录接口-->
<!--    } else if (role === "teacher") {-->
<!--      loginUrl = "http://localhost:8101/api/user/teacher/login"; // 教师登录接口-->
<!--    } else if (role === "student") {-->
<!--      loginUrl = "http://localhost:8101/api/user/student/login"; // 学生登录接口-->
<!--    } else if (role === "administrator") {-->
<!--      loginUrl = "http://localhost:8101/api/user/administrator/login"; // 超级管理员登录接口-->
<!--    }-->

<!--    // 发送登录请求-->
<!--    const response = await axios.post(loginUrl, {-->
<!--      userAccount,-->
<!--      userPassword,-->
<!--    });-->

<!--    if (response.data.code === 0) {-->
<!--      // 登录成功-->
<!--      console.log("登录成功", response.data);-->

<!--      // 显示成功提示信息-->
<!--      Message.success("登录成功！");-->

<!--      // 获取用户信息-->
<!--      const userInfo = response.data.data;-->

<!--      // 将用户信息存储到 Vuex 中-->
<!--      store.commit("user/updateUser", {-->
<!--        username: userInfo.userName, // 确保昵称被传递-->
<!--        userRole: userInfo.userRole, // 确保用户角色被传递-->
<!--      });-->

<!--      // 根据角色信息进行不同的处理-->
<!--      if (userInfo.userRole === "teacher") {-->
<!--        router.push("/teacher-dashboard"); // 跳转到教师仪表盘-->
<!--      } else if (userInfo.userRole === "student") {-->
<!--        router.push("/student-dashboard"); // 跳转到学生仪表盘-->
<!--      } else if (userInfo.userRole === "administrator") {-->
<!--        router.push("/admin-dashboard"); // 跳转到超级管理员仪表盘-->
<!--      } else {-->
<!--        router.push("/dashboard"); // 跳转到普通用户仪表盘-->
<!--      }-->
<!--    } else {-->
<!--      // 登录失败-->
<!--      console.error("登录失败", response.data.message);-->

<!--      // 显示失败提示信息-->
<!--      if (response.data.message.includes("账号")) {-->
<!--        Message.error("登录失败，账号错误！");-->
<!--      } else if (response.data.message.includes("密码")) {-->
<!--        Message.error("登录失败，密码错误！");-->
<!--      } else {-->
<!--        Message.error("登录失败，请检查账号和密码！");-->
<!--      }-->
<!--    }-->
<!--  } catch (error) {-->
<!--    console.error("请求失败", error);-->

<!--    // 显示请求失败提示信息-->
<!--    Message.error("请求失败，请稍后重试！");-->
<!--  } finally {-->
<!--    loading.value = false;-->
<!--  }-->
<!--};-->

<!--// 跳转到注册页面-->
<!--const goToRegister = () => {-->
<!--  router.push("/user/register");-->
<!--};-->

<!--// 跳转到忘记密码页面-->
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

<template>
  <a-card style="width: 400px; margin: 100px auto" title="登录">
    <a-form :model="form" @submit="handleSubmit">
      <a-form-item field="role" label="登录角色">
        <a-radio-group v-model="form.role" @change="handleRoleChange">
          <a-radio value="administrator">超级管理员</a-radio>
          <a-radio value="teacher">教师</a-radio>
          <a-radio value="student">学生</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>

      <a-form-item field="userPassword" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>

      <a-form-item>
        <a-button
          :loading="loading"
          html-type="submit"
          style="width: 100%"
          type="primary"
        >
          登录
        </a-button>
      </a-form-item>

      <a-form-item>
        <div style="text-align: center">
          <a style="color: #1890ff; cursor: pointer" @click="goToRegister"
            >没有账号？立即注册</a
          >
          <span style="margin: 0 10px">|</span>
          <a style="color: #1890ff; cursor: pointer" @click="goToForgotPassword"
            >忘记密码？</a
          >
        </div>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";
import { Message } from "@arco-design/web-vue";

const router = useRouter();
const store = useStore();

const form = ref({
  role: "user",
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
    if (role === "user") {
      loginUrl = "http://localhost:8101/api/user/login";
    } else if (role === "teacher") {
      loginUrl = "http://localhost:8101/api/user/teacher/login";
    } else if (role === "student") {
      loginUrl = "http://localhost:8101/api/user/student/login";
    } else if (role === "administrator") {
      loginUrl = "http://localhost:8101/api/user/administrator/login";
    }

    const response = await axios.post(loginUrl, {
      userAccount,
      userPassword,
    });

    if (response.data.code === 0) {
      Message.success("登录成功！");

      // 存储 Token
      localStorage.setItem("token", response.data.data.token);

      // 更新 Vuex 中的用户信息
      store.commit("user/updateUser", {
        username: response.data.data.userName,
        userRole: response.data.data.userRole,
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
.a-card {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.a-button {
  background-color: #1890ff;
  border-color: #1890ff;
}

.a-button:hover {
  background-color: #40a9ff;
  border-color: #40a9ff;
}

.a-button:active {
  background-color: #096dd9;
  border-color: #096dd9;
}

.a-button[disabled] {
  background-color: #f5f5f5;
  border-color: #d9d9d9;
  color: rgba(0, 0, 0, 0.25);
}

a {
  color: #1890ff;
  text-decoration: none;
}

a:hover {
  color: #40a9ff;
}

a:active {
  color: #096dd9;
}
</style>

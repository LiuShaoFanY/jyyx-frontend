<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout>
        <!-- 在 BasicLayout 中添加导航菜单 -->
        <template #header>
          <a-menu mode="horizontal" theme="light">
            <a-menu-item @click="goToUserLogin">用户登录</a-menu-item>
            <a-menu-item @click="goToTeacherLogin">教师登录</a-menu-item>
            <a-menu-item @click="goToStudentLogin">学生登录</a-menu-item>
          </a-menu>
        </template>
        <router-view />
      </BasicLayout>
    </template>
  </div>
</template>

<style>
#app {
}
</style>

<script lang="ts" setup>
import BasicLayout from "@/layouts/BasicLayout.vue";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// 全局初始化函数，有全局单次调用的代码，都可以写到这里
const doInit = () => {
  console.log("hello 欢迎来到我的项目");
};

onMounted(() => {
  doInit();
});

// 跳转到用户登录页面
const goToUserLogin = () => {
  router.push("/user/login");
};

// 跳转到教师登录页面
const goToTeacherLogin = () => {
  router.push("/teacher/login");
};

// 跳转到学生登录页面
const goToStudentLogin = () => {
  router.push("/student/login");
};
</script>

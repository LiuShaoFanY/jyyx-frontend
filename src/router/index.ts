import { createRouter, createWebHistory } from "vue-router";
import { useStore } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { routes } from "@/router/routes";
import checkAccess from "@/access/checkAccess";

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASEURL),
  routes,
});

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  const store = useStore();
  let loginUser = store.state.user.loginUser;

  // 自动登录
  if (!loginUser || !loginUser.userRole) {
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }

  // 获取页面需要的权限
  const needAccess =
    (to.meta?.access as string | string[]) ?? ACCESS_ENUM.NOT_LOGIN;

  // 检查用户是否有权限访问页面
  if (!checkAccess(loginUser, needAccess)) {
    next("/noAuth"); // 无权限，跳转到无权限页面
    return;
  }

  // 如果是智能代码分析页面，提取 questionSubmitId 并存储到 Vuex
  if (to.path.startsWith("/analysis/")) {
    const questionSubmitId = to.params.questionSubmitId as string;
    console.log("Dynamic questionSubmitId:", questionSubmitId);

    // 将 questionSubmitId 存储到 Vuex
    store.commit("setQuestionSubmitId", questionSubmitId);
  }

  // 允许访问
  next();
});

export default router;

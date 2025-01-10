import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import { useStore } from "vuex";

// 定义 LoginUser 类型
interface LoginUser {
  username: string;
  userRole: string;
}

router.beforeEach(async (to, from, next) => {
  const store = useStore();
  let loginUser = store.state.user.loginUser;

  if (!loginUser || !loginUser.userRole) {
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }

  const needAccess =
    (to.meta?.access as string | string[]) ?? ACCESS_ENUM.NOT_LOGIN;

  if (!checkAccess(loginUser, needAccess)) {
    next("/noAuth");
    return;
  }

  updateMenu(loginUser);

  next();
});

const updateMenu = (loginUser: LoginUser) => {
  const menuItems = [
    { path: "/questions", name: "浏览题目", access: ACCESS_ENUM.STUDENT },
    {
      path: "/questions_submit",
      name: "浏览提交题目",
      access: [ACCESS_ENUM.STUDENT, ACCESS_ENUM.TEACHER],
    },
    { path: "/add/question", name: "创建题目", access: ACCESS_ENUM.TEACHER },
    {
      path: "/manage/question",
      name: "管理题目",
      access: [ACCESS_ENUM.TEACHER, ACCESS_ENUM.ADMINISTRATOR],
    },
    { path: "/", name: "主页", access: ACCESS_ENUM.STUDENT },
    {
      path: "/user-management",
      name: "用户管理",
      access: ACCESS_ENUM.ADMINISTRATOR,
    },
    {
      path: "/analysis", // 动态路由，questionSubmitId 作为参数
      name: "智能分析",
      access: [ACCESS_ENUM.TEACHER, ACCESS_ENUM.ADMINISTRATOR], // 只有教师和超级管理员可以访问
    },
  ];

  const visibleMenuItems = menuItems.filter((item) =>
    checkAccess(loginUser, item.access)
  );

  store.commit("updateMenuItems", visibleMenuItems);
};

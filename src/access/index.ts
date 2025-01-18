import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
import { useStore } from "vuex";

/**
 * 定义 LoginUser 类型，包含用户名和用户角色
 */
interface LoginUser {
  username: string;
  userRole: string;
}

/**
 * 路由守卫，用于在路由跳转前进行权限检查
 * @param to 目标路由
 * @param from 当前路由
 * @param next 路由跳转的下一个步骤
 */
router.beforeEach(async (to, from, next) => {
  const store = useStore();
  let loginUser = store.state.user.loginUser;

  // 如果 loginUser 未定义或没有 userRole，从后端获取
  if (!loginUser || !loginUser.userRole) {
    await store.dispatch("user/getLoginUser");
    loginUser = store.state.user.loginUser;
  }

  // 获取目标路由所需的访问权限，如果没有设置，则默认为未登录可访问
  const needAccess =
    (to.meta?.access as string | string[]) ?? ACCESS_ENUM.NOT_LOGIN;

  // 如果用户没有所需的访问权限，跳转到 /noAuth 页面
  if (!checkAccess(loginUser, needAccess)) {
    next("/noAuth");
    return;
  }

  // 更新菜单项
  updateMenu(loginUser);

  // 放行，允许跳转到目标路由
  next();
});

/**
 * 更新菜单项，根据用户权限动态显示菜单
 * @param loginUser 登录用户信息
 */
const updateMenu = (loginUser: LoginUser) => {
  // 定义所有菜单项，包括路径、名称和访问权限
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
    {
      path: "/home",
      name: "主页",
      access: [
        ACCESS_ENUM.STUDENT,
        ACCESS_ENUM.TEACHER,
        ACCESS_ENUM.ADMINISTRATOR,
      ],
    },
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
    {
      path: "/administrator_operation_view",
      name: "超级管理员操作页面",
      access: [ACCESS_ENUM.TEACHER, ACCESS_ENUM.ADMINISTRATOR],
    },
  ];

  // 根据用户权限过滤出可见的菜单项
  const visibleMenuItems = menuItems.filter((item) =>
    checkAccess(loginUser, item.access)
  );

  // 更新 Vuex store 中的菜单项
  store.commit("updateMenuItems", visibleMenuItems);
};

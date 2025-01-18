import { RouteRecordRaw } from "vue-router";
import NoAuthView from "@/views/NoAuthView.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";
import QuestionsView from "@/views/question/QuestionsView.vue";
import ViewQuestionsView from "@/views/question/ViewQuestionView.vue";
import QuestionsSubmitView from "@/views/question/QuestionsSubmitView.vue";
import UserForgotPasswordView from "@/views/user/UserForgotPasswordView.vue";
import AdminUserManagement from "@/views/AdminUserManagement.vue";
import AnalysisView from "@/views/analysis/AnalysisView.vue";
import HomeView from "@/views/home/HomeView.vue";
import AdministratorOperationView from "@/views/user/AdministratorOperationView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
      {
        path: "/user/forgot-password",
        name: "忘记密码",
        component: UserForgotPasswordView,
      },
    ],
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/questions",
    name: "浏览题目",
    component: QuestionsView,
    meta: {
      access: ACCESS_ENUM.STUDENT, // 学生可以访问
    },
  },
  {
    path: "/questions_submit",
    name: "浏览提交题目",
    component: QuestionsSubmitView,
    meta: {
      access: [ACCESS_ENUM.STUDENT, ACCESS_ENUM.TEACHER], // 学生可以访问
    },
  },
  {
    path: "/view/question/:id",
    name: "在线做题",
    component: ViewQuestionsView,
    props: true,
    meta: {
      access: ACCESS_ENUM.STUDENT, // 学生可以访问
      hideInMenu: true,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: [ACCESS_ENUM.TEACHER, ACCESS_ENUM.ADMINISTRATOR], // 教师和管理员可以访问
    },
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.TEACHER, // 只有教师可以访问
      hideInMenu: true,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: ManageQuestionView,
    meta: {
      access: [ACCESS_ENUM.TEACHER, ACCESS_ENUM.ADMINISTRATOR], // 只有教师和管理员可以访问
    },
  },
  {
    path: "/home",
    name: "主页",
    component: HomeView,
    meta: {
      access: [
        ACCESS_ENUM.TEACHER,
        ACCESS_ENUM.ADMINISTRATOR,
        ACCESS_ENUM.STUDENT,
      ], // 学生可以访问
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,
    meta: {
      hideInMenu: true,
      access: ACCESS_ENUM.ADMINISTRATOR, // 超级管理员可以访问
    },
  },
  {
    path: "/user-management", // 超级管理员用户管理页面路径
    name: "用户管理",
    component: AdminUserManagement,
    meta: {
      access: ACCESS_ENUM.ADMINISTRATOR, // 只有超级管理员可以访问
    },
  },
  {
    path: "/analysis", // 动态路由，questionSubmitId 作为参数
    component: AnalysisView,
    name: "智能分析",
    meta: {
      access: [ACCESS_ENUM.TEACHER, ACCESS_ENUM.ADMINISTRATOR], // 只有教师和超级管理员可以访问
      hideInMenu: false,
    },
  },
  {
    path: "/administrator_operation_view",
    name: "超级管理员",
    component: AdministratorOperationView,
    meta: {
      access: [ACCESS_ENUM.TEACHER, ACCESS_ENUM.ADMINISTRATOR], // 学生可以访问
    },
  },
];
// const router = createRouter({
//   history: createWebHistory(process.env.VUE_APP_BASEURL),
//   routes,
// });
// export default router;

import { createStore } from "vuex";
import user from "./user";
import ACCESS_ENUM from "@/access/accessEnum";

interface RootState {
  menuItems: { path: string; name: string; access: string }[];
  user: {
    loginUser: {
      username: string;
      userRole: string;
    };
  };
  questionSubmitId: string; // 新增 questionSubmitId 状态
  user_id: string;
}

export default createStore<RootState>({
  state: {
    menuItems: [], // 存储菜单项
    user: {
      loginUser: {
        username: "未登录", // 默认昵称为“未登录”
        userRole: ACCESS_ENUM.NOT_LOGIN,
      },
    },
    questionSubmitId: "", // 初始化为空
    user_id: "",
  },
  mutations: {
    updateMenuItems(state, menuItems) {
      state.menuItems = menuItems;
    },
    setQuestionSubmitId(state, id: string) {
      state.questionSubmitId = id;
    },
  },
  actions: {},
  modules: {
    user,
  },
});

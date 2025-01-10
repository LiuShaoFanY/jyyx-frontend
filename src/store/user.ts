import { Commit } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";

interface UserState {
  loginUser: {
    username: string;
    userRole: string;
  };
}

interface UpdateUserPayload {
  username: string;
  userRole: string;
}

export default {
  namespaced: true,
  state: (): UserState => ({
    loginUser: {
      username: "未登录", // 默认昵称为“未登录”
      userRole: ACCESS_ENUM.NOT_LOGIN, // 默认用户角色为未登录
    },
  }),

  actions: {
    async getLoginUser({ commit }: { commit: Commit }) {
      try {
        const res = await UserControllerService.getLoginUserUsingGet();
        if (res.code === 0) {
          commit("updateUser", {
            username: res.data?.userName || "未登录", // 确保昵称被传递
            userRole: res.data?.userRole || ACCESS_ENUM.NOT_LOGIN, // 确保用户角色被传递
          });
        } else {
          commit("updateUser", {
            username: "未登录", // 设置昵称为“未登录”
            userRole: ACCESS_ENUM.NOT_LOGIN, // 设置用户角色为未登录
          });
        }
      } catch (error) {
        console.error("获取登录用户信息失败", error);
        commit("updateUser", {
          username: "未登录", // 设置昵称为“未登录”
          userRole: ACCESS_ENUM.NOT_LOGIN, // 设置用户角色为未登录
        });
      }
    },
  },

  mutations: {
    updateUser(state: UserState, payload: UpdateUserPayload) {
      state.loginUser = {
        ...state.loginUser,
        username: payload.username,
        userRole: payload.userRole,
      };
    },
    logout(state: UserState) {
      state.loginUser = {
        username: "未登录",
        userRole: ACCESS_ENUM.NOT_LOGIN,
      };
    },
  },
};

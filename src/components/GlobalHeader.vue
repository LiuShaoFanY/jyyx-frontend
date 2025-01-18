<template>
  <a-row id="globalHeader" :wrap="false" align="center">
    <a-col flex="auto">
      <a-menu
        :selected-keys="selectedKeys"
        mode="horizontal"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/oj-logo.png" />
            <div class="title">代码评测</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in menuItems" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>
        <!--获取状态变量-->
        {{ loginUser.username ?? "未登录" }}
      </div>
      <a-button
        v-if="loginUser.userRole !== ACCESS_ENUM.NOT_LOGIN"
        @click="logout"
        >退出登录
      </a-button>
    </a-col>
  </a-row>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { Message } from "@arco-design/web-vue"; // 引入 Message 组件

const router = useRouter();
const store = useStore();

// 定义 loginUser 的类型
interface LoginUser {
  username: string;
  userRole: string;
}

// 获取 loginUser 并指定类型
const loginUser = computed<LoginUser>(() => store.state.user.loginUser);

// 获取菜单项
const menuItems = computed(() => store.state.menuItems);

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转后，更新选中的菜单项
router.afterEach((to) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

// 退出登录逻辑
const logout = () => {
  store.commit("user/updateUser", {
    username: "未登录",
    userRole: ACCESS_ENUM.NOT_LOGIN,
  });

  // 显示退出成功的提示信息
  Message.success("退出登录成功！");

  router.push("/user/login");
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>

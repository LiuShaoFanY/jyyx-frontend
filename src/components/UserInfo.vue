<template>
  <div>
    <p>昵称: {{ loginUser.username }}</p>
    <p>角色: {{ loginUser.userRole }}</p>
    <p v-if="loginUser.grade">年级: {{ loginUser.grade }}</p>
    <p v-if="loginUser.major">专业: {{ loginUser.major }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("user", ["loginUser"]),
  },
};
</script>

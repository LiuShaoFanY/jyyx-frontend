<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader></GlobalHeader>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://shcall.com" target="_blank"> 待备案 </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<style scoped>
#basicLayout .header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
}

#basicLayout .content {
  padding: 20px;
  background: linear-gradient(to right, #fefefe, #fff);
  margin-bottom: 16px;
}

#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>

<script lang="ts" setup>
// 你的逻辑代码可以放在这里
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>

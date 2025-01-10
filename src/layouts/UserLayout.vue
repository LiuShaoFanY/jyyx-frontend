<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img class="logo" src="../assets/oj-logo.png" />
          <div class="title">面向教学应用的基于微服务架构的OJ判题系统设计</div>
        </a-space>
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
#userLayout .header {
  margin-top: 16px;
}

#userLayout {
  text-align: center;
}

#userLayout .logo {
  width: 64px;
  height: 64px;
}

#userLayout .content {
  padding: 20px;
  margin-bottom: 16px;
  background: url(https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png)
    0% 0% / 100% 100%;
}

src /assets/ homeai2.gif #userLayout .footer {
  background: #efefef;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

/* 新增的样式类 */
#userLayout .title {
  font-weight: bold;
  font-size: 1.5em;
  color: #1890ff; /* 你可以根据需要调整颜色 */
}
</style>

<script></script>

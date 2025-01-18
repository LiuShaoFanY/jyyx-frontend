<!--<template>-->
<!--  <div class="administrator">-->
<!--    &lt;!&ndash; 公告栏管理 &ndash;&gt;-->
<!--    <div class="announcement-management card">-->
<!--      <h2>✨ 公告栏管理 🚀</h2>-->
<!--      <div v-if="!announcementLoading && !announcementError">-->
<!--        &lt;!&ndash; 显示管理员信息 &ndash;&gt;-->
<!--        <div v-if="administratorInfo" class="administrator-info">-->
<!--          <p>管理员姓名: {{ administratorInfo.userName }}</p>-->
<!--          <p>管理员邮箱: {{ administratorInfo.email }}</p>-->
<!--        </div>-->

<!--        &lt;!&ndash; 公告列表 &ndash;&gt;-->
<!--        <div-->
<!--          v-for="(item, index) in announcements"-->
<!--          :key="item.id"-->
<!--          class="announcement-item"-->
<!--        >-->
<!--          <input-->
<!--            v-model="item.title"-->
<!--            placeholder="公告标题"-->
<!--            class="input-field"-->
<!--          />-->
<!--          <textarea-->
<!--            v-model="item.content"-->
<!--            placeholder="公告内容"-->
<!--            class="textarea-field"-->
<!--          ></textarea>-->
<!--          <p class="announcement-info">-->
<!--            创建人ID: {{ item.creatorId || "无" }} | 创建时间:-->
<!--            {{ formatDate(item.createTime) }} | 更新时间:-->
<!--            {{ formatDate(item.updateTime) }}-->
<!--          </p>-->
<!--          <div class="action-buttons">-->
<!--            <button @click="updateAnnouncement(item)" class="btn-update">-->
<!--              更新-->
<!--            </button>-->
<!--            <button @click="deleteAnnouncement(item.id)" class="btn-delete">-->
<!--              删除-->
<!--            </button>-->
<!--          </div>-->
<!--          <hr v-if="index < announcements.length - 1" class="divider" />-->
<!--        </div>-->

<!--        &lt;!&ndash; 添加新公告 &ndash;&gt;-->
<!--        <div class="add-announcement">-->
<!--          <input-->
<!--            v-model="newAnnouncement.title"-->
<!--            placeholder="新公告标题"-->
<!--            class="input-field"-->
<!--          />-->
<!--          <textarea-->
<!--            v-model="newAnnouncement.content"-->
<!--            placeholder="新公告内容"-->
<!--            class="textarea-field"-->
<!--          ></textarea>-->

<!--          &lt;!&ndash; 显示创建人ID、创建时间和创建日期 &ndash;&gt;-->
<!--          <div class="announcement-info">-->
<!--            <p>创建人ID: {{ currentUserId || "无" }}</p>-->
<!--            <p>创建日期: {{ currentDate }}</p>-->
<!--            <p>创建时间: {{ currentTime }}</p>-->
<!--          </div>-->

<!--          <button @click="addAnnouncement" class="btn-add">添加公告</button>-->
<!--        </div>-->
<!--      </div>-->
<!--      <p v-if="announcementLoading" class="loading-text">加载中...</p>-->
<!--      <p v-if="announcementError" class="error-text">-->
<!--        加载公告失败，请稍后重试。-->
<!--      </p>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import { ref, onMounted } from "vue";-->
<!--import axios from "axios";-->
<!--import { v4 as uuidv4 } from "uuid";-->
<!--import { Message } from "@arco-design/web-vue";-->

<!--export default {-->
<!--  name: "AdministratorView",-->
<!--  setup() {-->
<!--    // 公告栏内容-->
<!--    const announcements = ref([]);-->
<!--    const announcementLoading = ref(false);-->
<!--    const announcementError = ref(false);-->
<!--    const newAnnouncement = ref({ title: "", content: "" });-->

<!--    // 当前登录用户的 ID-->
<!--    const currentUserId = ref(null);-->

<!--    // 当前系统日期和时间-->
<!--    const currentDate = ref(new Date().toLocaleDateString());-->
<!--    const currentTime = ref(new Date().toLocaleTimeString());-->

<!--    // 管理员信息-->
<!--    const administratorInfo = ref(null);-->

<!--    // 格式化日期时间-->
<!--    const formatDate = (dateString) => {-->
<!--      if (!dateString) return "无";-->
<!--      const date = new Date(dateString);-->
<!--      return date.toLocaleString();-->
<!--    };-->

<!--    // 获取当前登录用户的 user_id-->
<!--    const fetchCurrentUserId = async () => {-->
<!--      try {-->
<!--        // 假设登录后后端返回了 user_id，并存储在 localStorage 中-->
<!--        const userId = localStorage.getItem("user_id");-->
<!--        if (userId) {-->
<!--          currentUserId.value = userId;-->
<!--          console.log("当前用户ID:", currentUserId.value);-->
<!--        } else {-->
<!--          Message.error("未找到用户ID，请重新登录");-->
<!--        }-->
<!--      } catch (error) {-->
<!--        console.error("获取用户ID失败:", error);-->
<!--        Message.error("获取用户ID失败，请稍后重试。");-->
<!--      }-->
<!--    };-->

<!--    // 获取管理员信息-->
<!--    const fetchAdministratorInfo = async () => {-->
<!--      try {-->
<!--        if (!currentUserId.value) {-->
<!--          Message.error("用户ID无效，无法获取管理员信息");-->
<!--          return;-->
<!--        }-->

<!--        const response = await axios.get(-->
<!--          `http://localhost:8101/api/user/administrator/${currentUserId.value}`,-->
<!--          { withCredentials: true }-->
<!--        );-->

<!--        if (response.data.code === 0) {-->
<!--          administratorInfo.value = response.data.data;-->
<!--          console.log("管理员信息:", administratorInfo.value);-->
<!--        } else {-->
<!--          Message.error("获取管理员信息失败");-->
<!--        }-->
<!--      } catch (error) {-->
<!--        console.error("获取管理员信息失败:", error);-->
<!--        Message.error("获取管理员信息失败，请稍后重试。");-->
<!--      }-->
<!--    };-->

<!--    // 获取公告数据-->
<!--    const fetchAnnouncement = async () => {-->
<!--      announcementLoading.value = true;-->
<!--      announcementError.value = false;-->
<!--      try {-->
<!--        const response = await axios.get(-->
<!--          "http://localhost:8101/api/user/announcement/list",-->
<!--          { withCredentials: true }-->
<!--        );-->
<!--        if (response.data.code === 0) {-->
<!--          announcements.value = response.data.data;-->
<!--          console.log("公告数据:", announcements.value);-->
<!--        } else {-->
<!--          announcements.value = [];-->
<!--        }-->
<!--      } catch (err) {-->
<!--        console.error("获取公告数据失败:", err);-->
<!--        announcementError.value = true;-->
<!--        Message.error("加载公告失败，请稍后重试。");-->
<!--      } finally {-->
<!--        announcementLoading.value = false;-->
<!--      }-->
<!--    };-->

<!--    // 添加公告-->
<!--    const addAnnouncement = async () => {-->
<!--      if (!currentUserId.value) {-->
<!--        Message.error("用户未登录，无法添加公告");-->
<!--        return;-->
<!--      }-->

<!--      if (!newAnnouncement.value.title || !newAnnouncement.value.content) {-->
<!--        Message.error("标题和内容不能为空");-->
<!--        return;-->
<!--      }-->

<!--      const id = uuidv4();-->
<!--      const currentTime = new Date().toLocaleString();-->

<!--      try {-->
<!--        const response = await axios.post(-->
<!--          "http://localhost:8101/api/user/announcement/add",-->
<!--          {-->
<!--            id,-->
<!--            title: newAnnouncement.value.title,-->
<!--            content: newAnnouncement.value.content,-->
<!--            creatorId: currentUserId.value, // 使用当前登录用户的 user_id-->
<!--            createTime: currentTime,-->
<!--            updateTime: currentTime,-->
<!--          },-->
<!--          { withCredentials: true }-->
<!--        );-->

<!--        if (response.data.code === 0) {-->
<!--          Message.success("公告添加成功！");-->
<!--          fetchAnnouncement();-->
<!--          newAnnouncement.value = { title: "", content: "" };-->
<!--        } else {-->
<!--          Message.error("公告添加失败，请稍后重试！");-->
<!--        }-->
<!--      } catch (error) {-->
<!--        console.error("添加公告失败:", error);-->
<!--        Message.error("请求失败，请稍后重试！");-->
<!--      }-->
<!--    };-->

<!--    // 组件加载时获取用户ID、公告数据和管理员信息-->
<!--    onMounted(async () => {-->
<!--      await fetchCurrentUserId(); // 先获取 user_id-->
<!--      fetchAnnouncement();-->
<!--      fetchAdministratorInfo();-->
<!--    });-->

<!--    return {-->
<!--      announcements,-->
<!--      newAnnouncement,-->
<!--      currentUserId,-->
<!--      currentDate,-->
<!--      currentTime,-->
<!--      administratorInfo,-->
<!--      announcementLoading,-->
<!--      announcementError,-->
<!--      addAnnouncement,-->
<!--      formatDate,-->
<!--    };-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.administrator {-->
<!--  max-width: 800px;-->
<!--  margin: 0 auto;-->
<!--  padding: 20px;-->
<!--  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;-->
<!--  background-color: #f9f9f9;-->
<!--  min-height: 100vh;-->
<!--}-->

<!--.card {-->
<!--  background-color: #ffffff;-->
<!--  border-radius: 12px;-->
<!--  padding: 20px;-->
<!--  margin-bottom: 20px;-->
<!--  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);-->
<!--  transition: transform 0.2s ease;-->
<!--}-->

<!--.card:hover {-->
<!--  transform: translateY(-5px);-->
<!--}-->

<!--h2 {-->
<!--  margin-bottom: 20px;-->
<!--  color: #333;-->
<!--  font-size: 24px;-->
<!--  font-weight: 600;-->
<!--  text-align: center;-->
<!--}-->

<!--.announcement-item {-->
<!--  margin-bottom: 20px;-->
<!--  padding: 15px;-->
<!--  border-radius: 8px;-->
<!--  background-color: #f5f5f5;-->
<!--  transition: background-color 0.3s ease;-->
<!--}-->

<!--.announcement-item:hover {-->
<!--  background-color: #e0e0e0;-->
<!--}-->

<!--.input-field,-->
<!--.textarea-field {-->
<!--  width: 100%;-->
<!--  padding: 10px;-->
<!--  margin-bottom: 10px;-->
<!--  border: 1px solid #ddd;-->
<!--  border-radius: 6px;-->
<!--  font-size: 14px;-->
<!--  transition: border-color 0.3s ease;-->
<!--}-->

<!--.input-field:focus,-->
<!--.textarea-field:focus {-->
<!--  border-color: #007bff;-->
<!--  outline: none;-->
<!--}-->

<!--.textarea-field {-->
<!--  height: 100px;-->
<!--  resize: vertical;-->
<!--}-->

<!--.announcement-info {-->
<!--  font-size: 12px;-->
<!--  color: #888;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.action-buttons {-->
<!--  display: flex;-->
<!--  gap: 10px;-->
<!--}-->

<!--.btn-update,-->
<!--.btn-delete,-->
<!--.btn-add {-->
<!--  padding: 8px 12px;-->
<!--  border: none;-->
<!--  border-radius: 6px;-->
<!--  cursor: pointer;-->
<!--  font-size: 14px;-->
<!--  transition: background-color 0.3s ease;-->
<!--}-->

<!--.btn-update {-->
<!--  background-color: #28a745;-->
<!--  color: white;-->
<!--}-->

<!--.btn-update:hover {-->
<!--  background-color: #218838;-->
<!--}-->

<!--.btn-delete {-->
<!--  background-color: #dc3545;-->
<!--  color: white;-->
<!--}-->

<!--.btn-delete:hover {-->
<!--  background-color: #c82333;-->
<!--}-->

<!--.btn-add {-->
<!--  background-color: #007bff;-->
<!--  color: white;-->
<!--  width: 100%;-->
<!--  padding: 10px;-->
<!--  font-size: 16px;-->
<!--}-->

<!--.btn-add:hover {-->
<!--  background-color: #0056b3;-->
<!--}-->

<!--.divider {-->
<!--  border: 0;-->
<!--  height: 1px;-->
<!--  background: #ddd;-->
<!--  margin: 10px 0;-->
<!--}-->

<!--.loading-text {-->
<!--  text-align: center;-->
<!--  color: #007bff;-->
<!--  font-weight: bold;-->
<!--}-->

<!--.error-text {-->
<!--  text-align: center;-->
<!--  color: #dc3545;-->
<!--  font-weight: bold;-->
<!--}-->

<!--.administrator-info {-->
<!--  margin-bottom: 20px;-->
<!--  padding: 15px;-->
<!--  border-radius: 8px;-->
<!--  background-color: #e9ecef;-->
<!--  font-size: 14px;-->
<!--  color: #333;-->
<!--}-->

<!--.administrator-info p {-->
<!--  margin: 5px 0;-->
<!--}-->
<!--</style>-->
<template>
  <div class="administrator">
    <!-- 公告栏管理 -->
    <div class="announcement-management card">
      <h2>✨ 公告栏管理 🚀</h2>
      <div v-if="!announcementLoading && !announcementError">
        <!-- 显示管理员信息 -->
        <div v-if="administratorInfo" class="administrator-info">
          <p>管理员姓名: {{ administratorInfo.userName }}</p>
          <p>管理员邮箱: {{ administratorInfo.email }}</p>
        </div>

        <!-- 公告列表 -->
        <div
          v-for="(item, index) in announcements"
          :key="item.id"
          class="announcement-item"
        >
          <input
            v-model="item.title"
            placeholder="公告标题"
            class="input-field"
          />
          <textarea
            v-model="item.content"
            placeholder="公告内容"
            class="textarea-field"
          ></textarea>
          <p class="announcement-info">
            创建人ID: {{ item.creatorId || "无" }} | 创建时间:
            {{ formatDate(item.createTime) }} | 更新时间:
            {{ formatDate(item.updateTime) }}
          </p>
          <div class="action-buttons">
            <button @click="updateAnnouncement(item)" class="btn-update">
              更新
            </button>
            <button @click="deleteAnnouncement(item.id)" class="btn-delete">
              删除
            </button>
          </div>
          <hr v-if="index < announcements.length - 1" class="divider" />
        </div>

        <!-- 添加新公告 -->
        <div class="add-announcement">
          <input
            v-model="newAnnouncement.title"
            placeholder="新公告标题"
            class="input-field"
          />
          <textarea
            v-model="newAnnouncement.content"
            placeholder="新公告内容"
            class="textarea-field"
          ></textarea>

          <!-- 显示创建人ID、创建时间和创建日期 -->
          <div class="announcement-info">
            <p>创建人ID: {{ currentUserId || "无" }}</p>
            <p>创建日期: {{ currentDate }}</p>
            <p>创建时间: {{ currentTime }}</p>
          </div>

          <button @click="addAnnouncement" class="btn-add">添加公告</button>
        </div>
      </div>
      <p v-if="announcementLoading" class="loading-text">加载中...</p>
      <p v-if="announcementError" class="error-text">
        加载公告失败，请稍后重试。
      </p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { Message } from "@arco-design/web-vue";

export default {
  name: "AdministratorView",
  setup() {
    // 公告栏内容
    const announcements = ref([]);
    const announcementLoading = ref(false);
    const announcementError = ref(false);
    const newAnnouncement = ref({ title: "", content: "" });

    // 当前登录用户的 ID
    const currentUserId = ref(null);

    // 当前系统日期和时间
    const currentDate = ref(new Date().toLocaleDateString());
    const currentTime = ref(new Date().toLocaleTimeString());

    // 管理员信息
    const administratorInfo = ref(null);

    // 格式化日期时间
    const formatDate = (dateString) => {
      if (!dateString) return "无";
      const date = new Date(dateString);
      return date.toLocaleString();
    };

    // 获取当前登录用户的 user_id
    const fetchCurrentUserId = async () => {
      try {
        // 假设登录后后端返回了 user_id，并存储在 localStorage 中
        const userId = localStorage.getItem("user_id");
        if (userId) {
          currentUserId.value = userId;
          console.log("当前用户ID:", currentUserId.value);
        } else {
          Message.error("未找到用户ID，请重新登录");
        }
      } catch (error) {
        console.error("获取用户ID失败:", error);
        Message.error("获取用户ID失败，请稍后重试。");
      }
    };

    // 获取管理员信息
    const fetchAdministratorInfo = async () => {
      try {
        if (!currentUserId.value) {
          Message.error("用户ID无效，无法获取管理员信息");
          return;
        }

        const response = await axios.get(
          `http://localhost:8101/api/user/administrator/${currentUserId.value}`,
          { withCredentials: true }
        );

        if (response.data.code === 0) {
          administratorInfo.value = response.data.data;
          console.log("管理员信息:", administratorInfo.value);
        } else {
          Message.error("获取管理员信息失败");
        }
      } catch (error) {
        console.error("获取管理员信息失败:", error);
        Message.error("获取管理员信息失败，请稍后重试。");
      }
    };

    // 获取公告数据
    const fetchAnnouncement = async () => {
      announcementLoading.value = true;
      announcementError.value = false;
      try {
        const response = await axios.get(
          "http://localhost:8101/api/user/announcement/list",
          { withCredentials: true }
        );
        if (response.data.code === 0) {
          announcements.value = response.data.data;
          console.log("公告数据:", announcements.value);
        } else {
          announcements.value = [];
        }
      } catch (err) {
        console.error("获取公告数据失败:", err);
        announcementError.value = true;
        Message.error("加载公告失败，请稍后重试。");
      } finally {
        announcementLoading.value = false;
      }
    };

    // 添加公告
    const addAnnouncement = async () => {
      if (!currentUserId.value) {
        Message.error("用户未登录，无法添加公告");
        return;
      }

      if (!newAnnouncement.value.title || !newAnnouncement.value.content) {
        Message.error("标题和内容不能为空");
        return;
      }

      const id = Date.now(); // 使用时间戳作为 ID
      const currentTime = new Date().toISOString(); // 使用 ISO 8601 格式

      try {
        const response = await axios.post(
          "http://localhost:8101/api/user/announcement/add",
          {
            id,
            title: newAnnouncement.value.title,
            content: newAnnouncement.value.content,
            creatorId: currentUserId.value,
            createTime: currentTime,
            updateTime: currentTime,
          },
          { withCredentials: true }
        );

        if (response.data.code === 0) {
          Message.success("公告添加成功！");
          fetchAnnouncement();
          newAnnouncement.value = { title: "", content: "" };
        } else {
          Message.error("公告添加失败，请稍后重试！");
        }
      } catch (error) {
        console.error("添加公告失败:", error);
        Message.error("请求失败，请稍后重试！");
      }
    };
    // 删除公告
    const deleteAnnouncement = async (id) => {
      try {
        const response = await axios.delete(
          `http://localhost:8101/api/user/announcement/delete/${id}`,
          { withCredentials: true }
        );

        if (response.data.code === 0) {
          Message.success("公告删除成功！");
          fetchAnnouncement(); // 重新获取公告列表
        } else {
          Message.error("公告删除失败，请稍后重试！");
        }
      } catch (error) {
        console.error("删除公告失败:", error);
        Message.error("请求失败，请稍后重试！");
      }
    };
    // 更新公告
    const updateAnnouncement = async (item) => {
      if (!item.title || !item.content) {
        Message.error("标题和内容不能为空");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:8101/api/user/announcement/update",
          item,
          { withCredentials: true }
        );
        if (response.data.code === 0) {
          Message.success("更新成功");
          fetchAnnouncement();
        } else {
          Message.error("更新失败");
        }
      } catch (err) {
        console.error("更新公告失败:", err);
        Message.error("更新公告失败");
      }
    };

    // 组件加载时获取用户ID、公告数据和管理员信息
    onMounted(async () => {
      await fetchCurrentUserId(); // 先获取 user_id
      fetchAnnouncement();
      fetchAdministratorInfo();
    });

    return {
      announcements,
      newAnnouncement,
      currentUserId,
      currentDate,
      currentTime,
      administratorInfo,
      announcementLoading,
      announcementError,
      addAnnouncement,
      deleteAnnouncement,
      updateAnnouncement,
      formatDate,
    };
  },
};
</script>

<style scoped>
.administrator {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9f9f9;
  min-height: 100vh;
}

.card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
}

h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}

.announcement-item {
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  background-color: #f5f5f5;
  transition: background-color 0.3s ease;
}

.announcement-item:hover {
  background-color: #e0e0e0;
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.input-field:focus,
.textarea-field:focus {
  border-color: #007bff;
  outline: none;
}

.textarea-field {
  height: 100px;
  resize: vertical;
}

.announcement-info {
  font-size: 12px;
  color: #888;
  margin-bottom: 10px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.btn-update,
.btn-delete,
.btn-add {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.btn-update {
  background-color: #28a745;
  color: white;
}

.btn-update:hover {
  background-color: #218838;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}

.btn-delete:hover {
  background-color: #c82333;
}

.btn-add {
  background-color: #007bff;
  color: white;
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.btn-add:hover {
  background-color: #0056b3;
}

.divider {
  border: 0;
  height: 1px;
  background: #ddd;
  margin: 10px 0;
}

.loading-text {
  text-align: center;
  color: #007bff;
  font-weight: bold;
}

.error-text {
  text-align: center;
  color: #dc3545;
  font-weight: bold;
}

.administrator-info {
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  background-color: #e9ecef;
  font-size: 14px;
  color: #333;
}

.administrator-info p {
  margin: 5px 0;
}
</style>
<style scoped>
.administrator {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9f9f9;
  min-height: 100vh;
}

.card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
}

h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}

.announcement-item {
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  background-color: #f5f5f5;
  transition: background-color 0.3s ease;
}

.announcement-item:hover {
  background-color: #e0e0e0;
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.input-field:focus,
.textarea-field:focus {
  border-color: #007bff;
  outline: none;
}

.textarea-field {
  height: 100px;
  resize: vertical;
}

.announcement-info {
  font-size: 12px;
  color: #888;
  margin-bottom: 10px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.btn-update,
.btn-delete,
.btn-add {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.btn-update {
  background-color: #28a745;
  color: white;
}

.btn-update:hover {
  background-color: #218838;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}

.btn-delete:hover {
  background-color: #c82333;
}

.btn-add {
  background-color: #007bff;
  color: white;
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.btn-add:hover {
  background-color: #0056b3;
}

.divider {
  border: 0;
  height: 1px;
  background: #ddd;
  margin: 10px 0;
}

.loading-text {
  text-align: center;
  color: #007bff;
  font-weight: bold;
}

.error-text {
  text-align: center;
  color: #dc3545;
  font-weight: bold;
}

.administrator-info {
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  background-color: #e9ecef;
  font-size: 14px;
  color: #333;
}

.administrator-info p {
  margin: 5px 0;
}
</style>
<style scoped>
.administrator {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9f9f9;
  min-height: 100vh;
}

.card {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-5px);
}

h2 {
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
}

.announcement-item {
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  background-color: #f5f5f5;
  transition: background-color 0.3s ease;
}

.announcement-item:hover {
  background-color: #e0e0e0;
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s ease;
}

.input-field:focus,
.textarea-field:focus {
  border-color: #007bff;
  outline: none;
}

.textarea-field {
  height: 100px;
  resize: vertical;
}

.announcement-info {
  font-size: 12px;
  color: #888;
  margin-bottom: 10px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.btn-update,
.btn-delete,
.btn-add {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.btn-update {
  background-color: #28a745;
  color: white;
}

.btn-update:hover {
  background-color: #218838;
}

.btn-delete {
  background-color: #dc3545;
  color: white;
}

.btn-delete:hover {
  background-color: #c82333;
}

.btn-add {
  background-color: #007bff;
  color: white;
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

.btn-add:hover {
  background-color: #0056b3;
}

.divider {
  border: 0;
  height: 1px;
  background: #ddd;
  margin: 10px 0;
}

.loading-text {
  text-align: center;
  color: #007bff;
  font-weight: bold;
}

.error-text {
  text-align: center;
  color: #dc3545;
  font-weight: bold;
}

.administrator-info {
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  background-color: #e9ecef;
  font-size: 14px;
  color: #333;
}

.administrator-info p {
  margin: 5px 0;
}
</style>

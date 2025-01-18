<template>
  <div class="home">
    <!-- 公告栏 -->
    <div class="announcement card">
      <h2>✨ 公告栏 🚀</h2>
      <div v-if="!announcementLoading && !announcementError">
        <div
          v-for="(item, index) in announcements"
          :key="item.id"
          class="announcement-item"
        >
          <h3>{{ item.title }}</h3>
          <p>{{ item.content }}</p>
          <p class="announcement-time">
            发布时间: {{ formatDate(item.createTime) }}
          </p>
          <hr v-if="index < announcements.length - 1" />
        </div>
      </div>
      <p v-if="announcementLoading">加载中...</p>
      <p v-if="announcementError" class="error">加载公告失败，请稍后重试。</p>
    </div>

    <!-- 实时时间日期 -->
    <div class="datetime card" @click="handleCardClick('datetime')">
      <h2>✨ 当前时间 🚀</h2>
      <p>{{ currentTime }}</p>
    </div>

    <!-- 排行榜 -->
    <div class="leaderboard card" @click="handleCardClick('leaderboard')">
      <h2>✨ 排行榜 🚀</h2>
      <transition-group name="fade" tag="ul" v-if="!loading && !error">
        <li
          v-for="(student, index) in sortedStudents"
          :key="student.userId"
          @click.stop="handleStudentClick(student)"
        >
          <span class="rank">{{ index + 1 }}.</span>
          <span class="name">{{ student.userName }}🌟</span>
          <span class="correct-answers">✅ 次数:{{ student.acceptedNum }}</span>
        </li>
      </transition-group>
      <p v-if="loading">加载中...</p>
      <p v-if="error" class="error">加载排行榜失败，请稍后重试。</p>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";
import axios from "axios";

export default {
  name: "HomeView",
  setup() {
    // 公告栏内容
    const announcements = ref([]); // 存储多条公告
    const announcementLoading = ref(false); // 加载状态
    const announcementError = ref(false); // 错误状态

    // 获取公告数据
    const fetchAnnouncement = async () => {
      announcementLoading.value = true;
      announcementError.value = false;
      try {
        const response = await axios.get(
          "http://localhost:8101/api/user/announcement/list"
        );
        if (response.data.code === 0 && response.data.data.length > 0) {
          announcements.value = response.data.data; // 存储所有公告
        } else {
          announcements.value = []; // 如果没有公告，清空数组
        }
      } catch (err) {
        console.error("获取公告数据失败:", err);
        announcementError.value = true;
      } finally {
        announcementLoading.value = false;
      }
    };

    // 格式化日期时间
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleString(); // 可以根据需要调整格式
    };

    // 实时时间日期
    const currentTime = ref(new Date().toLocaleString());
    let timer;

    const updateTime = () => {
      currentTime.value = new Date().toLocaleString();
    };

    // 学生数据
    const students = ref([]);
    const loading = ref(false);
    const error = ref(false);

    // 获取排行榜数据
    const fetchLeaderboard = async () => {
      loading.value = true;
      error.value = false;
      try {
        const response = await axios.post(
          "http://localhost:8101/api/question/ranking/list/page",
          {
            current: 1, // 默认第一页
            pageSize: 10, // 默认每页10条
            sortField: "acceptedNum", // 默认按通过次数排序
            sortOrder: "desc", // 默认降序排列
          }
        );
        if (response.data.code === 0) {
          const newStudents = response.data.data.records;

          // 对比新旧数据，只更新变化的部分
          if (JSON.stringify(students.value) !== JSON.stringify(newStudents)) {
            students.value = newStudents;
          }
        } else {
          throw new Error("获取排行榜数据失败");
        }
      } catch (err) {
        console.error("获取排行榜数据失败:", err);
        error.value = true;
      } finally {
        loading.value = false;
      }
    };

    // 排序后的学生列表
    const sortedStudents = computed(() => {
      return students.value
        .slice()
        .sort((a, b) => b.acceptedNum - a.acceptedNum);
    });

    // 处理卡片点击事件
    const handleCardClick = (cardType) => {
      console.log(`点击了 ${cardType} 卡片`);
      // 可以在这里添加更多的逻辑，比如弹出提示或跳转页面
    };

    // 处理学生点击事件
    const handleStudentClick = (student) => {
      console.log(`点击了学生: ${student.userName}，ID: ${student.userId}`);
      // 可以在这里添加更多的逻辑，比如显示学生详情
    };

    // 定时刷新排行榜和公告栏
    let leaderboardTimer;
    let announcementTimer;

    onMounted(() => {
      fetchAnnouncement(); // 组件加载时获取公告数据
      timer = setInterval(updateTime, 1000); // 每秒更新时间
      fetchLeaderboard(); // 组件加载时立即获取排行榜数据

      // 每隔5秒刷新一次排行榜
      leaderboardTimer = setInterval(fetchLeaderboard, 5000); // 5秒刷新一次

      // 每隔5秒刷新一次公告栏
      announcementTimer = setInterval(fetchAnnouncement, 5000); // 5秒刷新一次
    });

    onUnmounted(() => {
      clearInterval(timer); // 清除时间更新定时器
      clearInterval(leaderboardTimer); // 清除排行榜定时器
      clearInterval(announcementTimer); // 清除公告栏定时器
    });

    return {
      announcements,
      currentTime,
      sortedStudents,
      loading,
      error,
      announcementLoading,
      announcementError,
      handleCardClick,
      handleStudentClick,
      formatDate,
    };
  },
};
</script>

<style scoped>
.home {
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
  transition: transform 0.2s ease;
  cursor: pointer;
  border: 1px solid #ddd;
}

.card:active {
  transform: scale(0.98);
}

.card:hover {
  transform: translateY(-5px);
}

h2 {
  margin-bottom: 15px;
  color: #333;
  font-size: 24px;
  font-weight: 600;
}

p {
  color: #666;
  font-size: 16px;
  line-height: 1.6;
}

.announcement-item {
  margin-bottom: 15px;
}

.announcement-item h3 {
  font-size: 18px;
  color: #444;
  margin-bottom: 10px;
}

.announcement-item p {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

.announcement-time {
  font-size: 12px;
  color: #888;
}

hr {
  border: 0;
  height: 1px;
  background: #ddd;
  margin: 10px 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

li:last-child {
  border-bottom: none;
}

li:hover {
  background-color: #f5f5f5;
}

li:active {
  background-color: #e0e0e0;
  transform: scale(0.98);
}

.rank {
  font-weight: bold;
  color: #555;
  min-width: 30px;
}

.name {
  flex-grow: 1;
  margin: 0 15px;
  color: #333;
  font-weight: 500;
}

.correct-answers {
  color: #888;
  font-size: 14px;
}

.datetime p {
  font-size: 18px;
  color: #444;
  font-weight: 500;
}

.error {
  color: red;
  font-weight: bold;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home {
    padding: 10px;
  }

  .card {
    padding: 15px;
  }

  h2 {
    font-size: 20px;
  }

  p {
    font-size: 14px;
  }

  .datetime p {
    font-size: 16px;
  }

  .name {
    font-size: 14px;
  }

  .correct-answers {
    font-size: 12px;
  }
}
</style>

<!--&lt;!&ndash;<template>&ndash;&gt;-->
<!--&lt;!&ndash;  <div class="analysis-container">&ndash;&gt;-->
<!--&lt;!&ndash;    <h1>智能分析页面</h1>&ndash;&gt;-->
<!--&lt;!&ndash;    <a-alert v-if="errorMessage" type="error" :message="errorMessage" />&ndash;&gt;-->
<!--&lt;!&ndash;    <a-spin :spinning="loading">&ndash;&gt;-->
<!--&lt;!&ndash;      <div v-if="analysisData">&ndash;&gt;-->
<!--&lt;!&ndash;        <h2>个性化反馈</h2>&ndash;&gt;-->
<!--&lt;!&ndash;        <a-card>&ndash;&gt;-->
<!--&lt;!&ndash;          <p>{{ analysisData.personalizedFeedback }}</p>&ndash;&gt;-->
<!--&lt;!&ndash;        </a-card>&ndash;&gt;-->

<!--&lt;!&ndash;        <h2>教学指导</h2>&ndash;&gt;-->
<!--&lt;!&ndash;        <a-card>&ndash;&gt;-->
<!--&lt;!&ndash;          <p>{{ analysisData.teachingGuidance }}</p>&ndash;&gt;-->
<!--&lt;!&ndash;        </a-card>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;      <div v-else-if="!loading">&ndash;&gt;-->
<!--&lt;!&ndash;        <a-alert type="info" message="未找到分析数据" />&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;    </a-spin>&ndash;&gt;-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->

<!--&lt;!&ndash;<script lang="ts" setup>&ndash;&gt;-->
<!--&lt;!&ndash;import { computed, onMounted, ref } from "vue";&ndash;&gt;-->
<!--&lt;!&ndash;import { useRoute, useRouter } from "vue-router";&ndash;&gt;-->
<!--&lt;!&ndash;import { Message } from "@arco-design/web-vue";&ndash;&gt;-->
<!--&lt;!&ndash;import ACCESS_ENUM from "@/access/accessEnum";&ndash;&gt;-->
<!--&lt;!&ndash;import { useStore } from "vuex";&ndash;&gt;-->
<!--&lt;!&ndash;import checkAccess from "@/access/checkAccess";&ndash;&gt;-->
<!--&lt;!&ndash;import axios from "axios";&ndash;&gt;-->

<!--&lt;!&ndash;const route = useRoute();&ndash;&gt;-->
<!--&lt;!&ndash;const router = useRouter();&ndash;&gt;-->
<!--&lt;!&ndash;const store = useStore();&ndash;&gt;-->

<!--&lt;!&ndash;// 获取当前登录用户&ndash;&gt;-->
<!--&lt;!&ndash;const loginUser = computed(() => store.state.user.loginUser);&ndash;&gt;-->

<!--&lt;!&ndash;// 动态获取 questionSubmitId&ndash;&gt;-->
<!--&lt;!&ndash;const questionSubmitId = route.params.questionSubmitId as string;&ndash;&gt;-->

<!--&lt;!&ndash;console.log("Question submit ID:", questionSubmitId); // 打印 questionSubmitId&ndash;&gt;-->

<!--&lt;!&ndash;// 分析数据&ndash;&gt;-->
<!--&lt;!&ndash;const analysisData = ref<{&ndash;&gt;-->
<!--&lt;!&ndash;  personalizedFeedback: string;&ndash;&gt;-->
<!--&lt;!&ndash;  teachingGuidance: string;&ndash;&gt;-->
<!--&lt;!&ndash;} | null>(null);&ndash;&gt;-->

<!--&lt;!&ndash;// 加载状态&ndash;&gt;-->
<!--&lt;!&ndash;const loading = ref(false);&ndash;&gt;-->

<!--&lt;!&ndash;// 错误信息&ndash;&gt;-->
<!--&lt;!&ndash;const errorMessage = ref("");&ndash;&gt;-->

<!--&lt;!&ndash;// 检查用户权限&ndash;&gt;-->
<!--&lt;!&ndash;const hasAccess = checkAccess(loginUser.value, [&ndash;&gt;-->
<!--&lt;!&ndash;  ACCESS_ENUM.TEACHER,&ndash;&gt;-->
<!--&lt;!&ndash;  ACCESS_ENUM.ADMINISTRATOR,&ndash;&gt;-->
<!--&lt;!&ndash;]);&ndash;&gt;-->

<!--&lt;!&ndash;console.log("Login user:", loginUser.value); // 打印当前登录用户信息&ndash;&gt;-->
<!--&lt;!&ndash;console.log("Has access:", hasAccess); // 打印权限校验结果&ndash;&gt;-->

<!--&lt;!&ndash;// 权限检查&ndash;&gt;-->
<!--&lt;!&ndash;const checkPermission = () => {&ndash;&gt;-->
<!--&lt;!&ndash;  if (!hasAccess) {&ndash;&gt;-->
<!--&lt;!&ndash;    Message.error("无权限访问此页面");&ndash;&gt;-->
<!--&lt;!&ndash;    router.push("/noAuth");&ndash;&gt;-->
<!--&lt;!&ndash;    return false;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;  return true;&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->

<!--&lt;!&ndash;// 构建请求 URL&ndash;&gt;-->
<!--&lt;!&ndash;const buildRequestUrl = (questionSubmitId: string) => {&ndash;&gt;-->
<!--&lt;!&ndash;  return `http://localhost:8101/api/question/inner/getFeedbackAndGuidance?questionSubmitId=1875052333533593602`;&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->

<!--&lt;!&ndash;// 获取分析数据&ndash;&gt;-->
<!--&lt;!&ndash;const fetchAnalysisData = async () => {&ndash;&gt;-->
<!--&lt;!&ndash;  try {&ndash;&gt;-->
<!--&lt;!&ndash;    loading.value = true;&ndash;&gt;-->
<!--&lt;!&ndash;    errorMessage.value = "";&ndash;&gt;-->
<!--&lt;!&ndash;    //&ndash;&gt;-->
<!--&lt;!&ndash;    if (!questionSubmitId) {&ndash;&gt;-->
<!--&lt;!&ndash;      throw new Error("缺少 questionSubmitId");&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->

<!--&lt;!&ndash;    const url = buildRequestUrl(questionSubmitId);&ndash;&gt;-->
<!--&lt;!&ndash;    console.log("Request URL:", url);&ndash;&gt;-->

<!--&lt;!&ndash;    const response = await axios.get(url);&ndash;&gt;-->

<!--&lt;!&ndash;    console.log("Response data:", response.data);&ndash;&gt;-->

<!--&lt;!&ndash;    if (response.data && response.data.data) {&ndash;&gt;-->
<!--&lt;!&ndash;      analysisData.value = {&ndash;&gt;-->
<!--&lt;!&ndash;        personalizedFeedback: response.data.data.personalizedFeedback,&ndash;&gt;-->
<!--&lt;!&ndash;        teachingGuidance: response.data.data.teachingGuidance,&ndash;&gt;-->
<!--&lt;!&ndash;      };&ndash;&gt;-->
<!--&lt;!&ndash;    } else {&ndash;&gt;-->
<!--&lt;!&ndash;      throw new Error("未找到分析数据");&ndash;&gt;-->
<!--&lt;!&ndash;    }&ndash;&gt;-->
<!--&lt;!&ndash;  } catch (error) {&ndash;&gt;-->
<!--&lt;!&ndash;    console.error("Error fetching analysis data:", error);&ndash;&gt;-->
<!--&lt;!&ndash;    errorMessage.value = (error as Error).message || "获取分析数据失败";&ndash;&gt;-->
<!--&lt;!&ndash;  } finally {&ndash;&gt;-->
<!--&lt;!&ndash;    loading.value = false;&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;};&ndash;&gt;-->

<!--&lt;!&ndash;// 页面加载时获取数据&ndash;&gt;-->
<!--&lt;!&ndash;onMounted(() => {&ndash;&gt;-->
<!--&lt;!&ndash;  if (checkPermission()) {&ndash;&gt;-->
<!--&lt;!&ndash;    fetchAnalysisData();&ndash;&gt;-->
<!--&lt;!&ndash;  }&ndash;&gt;-->
<!--&lt;!&ndash;});&ndash;&gt;-->
<!--&lt;!&ndash;</script>&ndash;&gt;-->

<!--&lt;!&ndash;<style scoped>&ndash;&gt;-->
<!--&lt;!&ndash;.analysis-container {&ndash;&gt;-->
<!--&lt;!&ndash;  padding: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;h1 {&ndash;&gt;-->
<!--&lt;!&ndash;  margin-bottom: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->

<!--&lt;!&ndash;h2 {&ndash;&gt;-->
<!--&lt;!&ndash;  margin-top: 20px;&ndash;&gt;-->
<!--&lt;!&ndash;  margin-bottom: 10px;&ndash;&gt;-->
<!--&lt;!&ndash;}&ndash;&gt;-->
<!--&lt;!&ndash;</style>&ndash;&gt;-->
<!--<template>-->
<!--  <div class="analysis-container">-->
<!--    <h1>智能分析页面</h1>-->
<!--    <a-alert v-if="errorMessage" type="error" :message="errorMessage" />-->
<!--    <a-spin :spinning="loading">-->
<!--      <div v-if="analysisData">-->
<!--        <h2>个性化反馈</h2>-->
<!--        <a-card>-->
<!--          <p>{{ analysisData.personalizedFeedback }}</p>-->
<!--        </a-card>-->

<!--        <h2>教学指导</h2>-->
<!--        <a-card>-->
<!--          <p>{{ analysisData.teachingGuidance }}</p>-->
<!--        </a-card>-->
<!--      </div>-->
<!--      <div v-else-if="!loading">-->
<!--        <a-alert type="info" message="未找到分析数据" />-->
<!--      </div>-->
<!--    </a-spin>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import { onMounted, ref } from "vue";-->
<!--import { useRoute } from "vue-router"; // 引入 useRoute-->
<!--import axios from "axios";-->

<!--const route = useRoute(); // 获取路由实例-->

<!--// 从 query 中获取 questionSubmitId-->
<!--const questionSubmitId = route.query.questionSubmitId as string;-->

<!--const analysisData = ref<{-->
<!--  personalizedFeedback: string;-->
<!--  teachingGuidance: string;-->
<!--} | null>(null);-->

<!--const loading = ref(false);-->
<!--const errorMessage = ref("");-->

<!--const fetchAnalysisData = async () => {-->
<!--  try {-->
<!--    loading.value = true;-->
<!--    errorMessage.value = "";-->

<!--    if (!questionSubmitId) {-->
<!--      throw new Error("缺少 questionSubmitId");-->
<!--    }-->

<!--    const response = await axios.get(-->
<!--      `http://localhost:8101/api/question/getFeedbackAndGuidance?questionSubmitId=${questionSubmitId}`-->
<!--    );-->

<!--    if (response.data && response.data.data) {-->
<!--      analysisData.value = {-->
<!--        personalizedFeedback: response.data.data.personalizedFeedback,-->
<!--        teachingGuidance: response.data.data.teachingGuidance,-->
<!--      };-->
<!--    } else {-->
<!--      throw new Error("未找到分析数据");-->
<!--    }-->
<!--  } catch (error) {-->
<!--    console.error("Error fetching analysis data:", error);-->
<!--    errorMessage.value = (error as Error).message || "获取分析数据失败";-->
<!--  } finally {-->
<!--    loading.value = false;-->
<!--  }-->
<!--};-->

<!--onMounted(() => {-->
<!--  fetchAnalysisData();-->
<!--});-->
<!--</script>-->

<!--<style scoped>-->
<!--.analysis-container {-->
<!--  padding: 20px;-->
<!--}-->

<!--h1 {-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--h2 {-->
<!--  margin-top: 20px;-->
<!--  margin-bottom: 10px;-->
<!--}-->
<!--</style>-->
<template>
  <div class="analysis-container">
    <h1 class="page-title">智能分析页面</h1>
    <a-alert
      v-if="errorMessage"
      type="error"
      :message="errorMessage"
      class="error-alert"
    />
    <a-spin :spinning="loading" class="loading-spinner">
      <div v-if="analysisData" class="analysis-content">
        <h2 class="section-title">个性化反馈</h2>
        <a-card class="feedback-card">
          <p class="feedback-text">
            <strong>{{ analysisData.personalizedFeedback }}</strong>
          </p>
        </a-card>

        <h2 class="section-title">教学指导</h2>
        <a-card class="guidance-card">
          <p class="guidance-text">
            <strong>{{ analysisData.teachingGuidance }}</strong>
          </p>
        </a-card>
      </div>
      <div v-else-if="!loading" class="no-data">
        <a-alert type="info" message="未找到分析数据" class="info-alert" />
      </div>
    </a-spin>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router"; // 引入 useRoute
import axios from "axios";

const route = useRoute(); // 获取路由实例

// 从 query 中获取 questionSubmitId
const questionSubmitId = route.query.questionSubmitId as string;

const analysisData = ref<{
  personalizedFeedback: string;
  teachingGuidance: string;
} | null>(null);

const loading = ref(false);
const errorMessage = ref("");

const fetchAnalysisData = async () => {
  try {
    loading.value = true;
    errorMessage.value = "";

    if (!questionSubmitId) {
      throw new Error("缺少 questionSubmitId");
    }

    const response = await axios.get(
      `http://localhost:8101/api/question/getFeedbackAndGuidance?questionSubmitId=${questionSubmitId}`
    );

    if (response.data && response.data.data) {
      analysisData.value = {
        personalizedFeedback: response.data.data.personalizedFeedback,
        teachingGuidance: response.data.data.teachingGuidance,
      };
    } else {
      throw new Error("未找到分析数据");
    }
  } catch (error) {
    console.error("Error fetching analysis data:", error);
    errorMessage.value = (error as Error).message || "获取分析数据失败";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchAnalysisData();
});
</script>

<style scoped>
.analysis-container {
  padding: 20px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.page-title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 20px;
}

.error-alert {
  margin-bottom: 20px;
}

.loading-spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.analysis-content {
  max-width: 800px;
  margin: 0 auto;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  color: #34495e;
  margin-top: 20px;
  margin-bottom: 10px;
}

.feedback-card,
.guidance-card {
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 300px; /* 设置最大高度 */
  overflow-y: auto; /* 添加垂直滚动条 */
}

.feedback-text,
.guidance-text {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  padding: 10px; /* 添加内边距 */
}

.feedback-text strong,
.guidance-text strong {
  color: #1abc9c;
}

.no-data {
  text-align: center;
  margin-top: 20px;
}

.info-alert {
  margin: 0 auto;
  max-width: 600px;
}
</style>

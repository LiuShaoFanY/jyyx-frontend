<!--<template>-->
<!--  <div class="userRegisterView">-->
<!--    <a-card-->
<!--      style="max-width: 500px; margin: 50px auto; padding: 20px"-->
<!--      title="用户注册"-->
<!--    >-->
<!--      <a-form :model="form" layout="vertical" @submit="handleSubmit">-->
<!--        &lt;!&ndash; 角色选择 &ndash;&gt;-->
<!--        <a-form-item field="role" label="选择注册角色">-->
<!--          <a-radio-group v-model="form.role" @change="handleRoleChange">-->
<!--            <a-radio value="administrator">超级管理员</a-radio>-->
<!--            <a-radio value="teacher">教师</a-radio>-->
<!--            <a-radio value="student">学生</a-radio>-->
<!--          </a-radio-group>-->
<!--        </a-form-item>-->

<!--        &lt;!&ndash; 账号 &ndash;&gt;-->
<!--        <a-form-item field="userAccount" label="账号" required>-->
<!--          <a-input v-model="form.userAccount" placeholder="请输入账号" />-->
<!--        </a-form-item>-->

<!--        &lt;!&ndash; 密码 &ndash;&gt;-->
<!--        <a-form-item field="userPassword" label="密码" required>-->
<!--          <a-input-password-->
<!--            v-model="form.userPassword"-->
<!--            placeholder="请输入密码"-->
<!--          />-->
<!--        </a-form-item>-->

<!--        &lt;!&ndash; 确认密码 &ndash;&gt;-->
<!--        <a-form-item field="checkPassword" label="确认密码" required>-->
<!--          <a-input-password-->
<!--            v-model="form.checkPassword"-->
<!--            placeholder="请再次输入密码"-->
<!--          />-->
<!--        </a-form-item>-->

<!--        &lt;!&ndash; 用户昵称 &ndash;&gt;-->
<!--        <a-form-item field="userName" label="用户昵称">-->
<!--          <a-input v-model="form.userName" placeholder="请输入用户昵称" />-->
<!--        </a-form-item>-->

<!--        &lt;!&ndash; 用户头像 &ndash;&gt;-->
<!--        <a-form-item field="userAvatar" label="用户头像">-->
<!--          <a-input v-model="form.userAvatar" placeholder="请输入用户头像URL" />-->
<!--        </a-form-item>-->

<!--        &lt;!&ndash; 用户简介 &ndash;&gt;-->
<!--        <a-form-item field="userProfile" label="用户简介">-->
<!--          <a-input v-model="form.userProfile" placeholder="请输入用户简介" />-->
<!--        </a-form-item>-->

<!--        &lt;!&ndash; 超级管理员额外字段 &ndash;&gt;-->
<!--        <template v-if="form.role === 'administrator'">-->
<!--          <a-form-item field="adminId" label="超级管理员编号" required>-->
<!--            <a-input-->
<!--              v-model="form.adminId"-->
<!--              placeholder="请输入超级管理员编号"-->
<!--            />-->
<!--          </a-form-item>-->
<!--          <a-form-item field="department" label="管理部门">-->
<!--            <a-input v-model="form.department" placeholder="请输入管理部门" />-->
<!--          </a-form-item>-->
<!--        </template>-->

<!--        &lt;!&ndash; 教师额外字段 &ndash;&gt;-->
<!--        <template v-if="form.role === 'teacher'">-->
<!--          <a-form-item field="teacherId" label="教工号" required>-->
<!--            <a-input v-model="form.teacherId" placeholder="请输入教工号" />-->
<!--          </a-form-item>-->
<!--          <a-form-item field="title" label="职称">-->
<!--            <a-select v-model="form.title" placeholder="请选择职称">-->
<!--              <a-option value="教授">教授</a-option>-->
<!--              <a-option value="副教授">副教授</a-option>-->
<!--              <a-option value="讲师">讲师</a-option>-->
<!--              <a-option value="助教">助教</a-option>-->
<!--            </a-select>-->
<!--          </a-form-item>-->
<!--          <a-form-item field="department" label="所属院系">-->
<!--            <a-input v-model="form.department" placeholder="请输入所属院系" />-->
<!--          </a-form-item>-->
<!--        </template>-->

<!--        &lt;!&ndash; 学生额外字段 &ndash;&gt;-->
<!--        <template v-if="form.role === 'student'">-->
<!--          <a-form-item field="studentId" label="学号" required>-->
<!--            <a-input v-model="form.studentId" placeholder="请输入学号" />-->
<!--          </a-form-item>-->
<!--          <a-form-item field="grade" label="年级">-->
<!--            <a-input v-model="form.grade" placeholder="请输入年级" />-->
<!--          </a-form-item>-->
<!--          <a-form-item field="major" label="专业">-->
<!--            <a-input v-model="form.major" placeholder="请输入专业" />-->
<!--          </a-form-item>-->
<!--        </template>-->

<!--        &lt;!&ndash; 提交按钮 &ndash;&gt;-->
<!--        <a-form-item>-->
<!--          <a-button :loading="loading" html-type="submit" long type="primary"-->
<!--            >注册-->
<!--          </a-button>-->
<!--        </a-form-item>-->

<!--        &lt;!&ndash; 跳转到登录页面 &ndash;&gt;-->
<!--        <a-form-item>-->
<!--          <div style="text-align: center">-->
<!--            <a @click="goToLogin">已有账号？立即登录</a>-->
<!--          </div>-->
<!--        </a-form-item>-->
<!--      </a-form>-->
<!--    </a-card>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import { reactive, ref } from "vue";-->
<!--import axios from "axios";-->
<!--import message from "@arco-design/web-vue/es/message";-->
<!--import { useRouter } from "vue-router";-->

<!--const router = useRouter();-->

<!--// 表单数据-->
<!--const form = reactive({-->
<!--  role: "student", // 默认选择学生-->
<!--  userAccount: "",-->
<!--  userPassword: "",-->
<!--  checkPassword: "", // 新增确认密码字段-->
<!--  userName: "",-->
<!--  userAvatar: "",-->
<!--  userProfile: "",-->
<!--  adminId: "",-->
<!--  department: "",-->
<!--  teacherId: "",-->
<!--  title: "",-->
<!--  studentId: "",-->
<!--  grade: "",-->
<!--  major: "",-->
<!--});-->

<!--// 加载状态-->
<!--const loading = ref(false);-->

<!--// 处理角色切换-->
<!--const handleRoleChange = (value: any) => {-->
<!--  console.log("选择的注册角色:", value);-->
<!--};-->

<!--// 处理表单提交-->
<!--const handleSubmit = async () => {-->
<!--  loading.value = true;-->
<!--  try {-->
<!--    const {-->
<!--      role,-->
<!--      userAccount,-->
<!--      userPassword,-->
<!--      checkPassword, // 新增确认密码字段-->
<!--      userName,-->
<!--      userAvatar,-->
<!--      userProfile,-->
<!--      adminId,-->
<!--      department,-->
<!--      teacherId,-->
<!--      title,-->
<!--      studentId,-->
<!--      grade,-->
<!--      major,-->
<!--    } = form;-->

<!--    // 校验密码一致性-->
<!--    if (userPassword !== checkPassword) {-->
<!--      message.error("两次输入的密码不一致");-->
<!--      return;-->
<!--    }-->

<!--    let registerUrl = "";-->
<!--    let requestData = {};-->

<!--    if (role === "administrator") {-->
<!--      registerUrl = "http://localhost:8101/api/user/administrator/register";-->
<!--      requestData = {-->
<!--        userAccount,-->
<!--        userPassword,-->
<!--        checkPassword,-->
<!--        userName,-->
<!--        userAvatar,-->
<!--        userProfile,-->
<!--        adminId,-->
<!--        department,-->
<!--      };-->
<!--    } else if (role === "teacher") {-->
<!--      registerUrl = "http://localhost:8101/api/user/teacher/register";-->
<!--      requestData = {-->
<!--        userAccount,-->
<!--        userPassword,-->
<!--        checkPassword,-->
<!--        userName,-->
<!--        userAvatar,-->
<!--        userProfile,-->
<!--        teacherId,-->
<!--        title,-->
<!--        department,-->
<!--      };-->
<!--    } else if (role === "student") {-->
<!--      registerUrl = "http://localhost:8101/api/user/student/register";-->
<!--      requestData = {-->
<!--        userAccount,-->
<!--        userPassword,-->
<!--        checkPassword,-->
<!--        userName,-->
<!--        userAvatar,-->
<!--        userProfile,-->
<!--        studentId,-->
<!--        grade,-->
<!--        major,-->
<!--      };-->
<!--    }-->

<!--    // 发送注册请求-->
<!--    const response = await axios.post(registerUrl, requestData);-->

<!--    if (response.data.code === 0) {-->
<!--      // 注册成功-->
<!--      message.success("注册成功，请登录");-->
<!--      router.push("/user/login"); // 跳转到登录页面-->
<!--    } else {-->
<!--      // 注册失败-->
<!--      message.error("注册失败: " + response.data.message);-->
<!--    }-->
<!--  } catch (error) {-->
<!--    console.error("请求失败", error);-->
<!--    message.error("注册失败: 网络错误");-->
<!--  } finally {-->
<!--    loading.value = false;-->
<!--  }-->
<!--};-->

<!--// 跳转到登录页面-->
<!--const goToLogin = () => {-->
<!--  router.push("/user/login");-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.userRegisterView {-->
<!--  padding: 20px;-->
<!--  text-align: center;-->
<!--}-->

<!--.a-card {-->
<!--  border-radius: 8px;-->
<!--}-->

<!--.a-form-item {-->
<!--  margin-bottom: 20px;-->
<!--}-->

<!--.a-button {-->
<!--  margin-top: 10px;-->
<!--}-->
<!--</style>-->
<template>
  <div class="userRegisterView">
    <a-card
      style="max-width: 500px; margin: 50px auto; padding: 20px"
      title="用户注册"
    >
      <a-form :model="form" layout="vertical" @submit="handleSubmit">
        <!-- 角色选择 -->
        <a-form-item field="role" label="选择注册角色">
          <a-radio-group v-model="form.role" @change="handleRoleChange">
            <a-radio value="administrator">超级管理员</a-radio>
            <a-radio value="teacher">教师</a-radio>
            <a-radio value="student">学生</a-radio>
          </a-radio-group>
        </a-form-item>

        <!-- 账号 -->
        <a-form-item field="userAccount" label="账号" required>
          <a-input v-model="form.userAccount" placeholder="请输入账号" />
        </a-form-item>

        <!-- 密码 -->
        <a-form-item field="userPassword" label="密码" required>
          <a-input-password
            v-model="form.userPassword"
            placeholder="请输入密码"
          />
        </a-form-item>

        <!-- 确认密码 -->
        <a-form-item field="checkPassword" label="确认密码" required>
          <a-input-password
            v-model="form.checkPassword"
            placeholder="请再次输入密码"
          />
        </a-form-item>

        <!-- 用户昵称 -->
        <a-form-item field="userName" label="用户昵称">
          <a-input v-model="form.userName" placeholder="请输入用户昵称" />
        </a-form-item>

        <!-- 用户头像 -->
        <a-form-item field="userAvatar" label="用户头像">
          <a-upload
            v-model:file-list="fileList"
            list-type="picture-card"
            :before-upload="beforeUpload"
            :limit="1"
            accept="image/png, image/jpeg, image/jpg, image/gif"
          >
            <div v-if="fileList.length < 1">
              <icon-plus />
              <div style="margin-top: 8px">上传头像</div>
            </div>
          </a-upload>
        </a-form-item>

        <!-- 用户简介 -->
        <a-form-item field="userProfile" label="用户简介">
          <a-input v-model="form.userProfile" placeholder="请输入用户简介" />
        </a-form-item>

        <!-- 超级管理员额外字段 -->
        <template v-if="form.role === 'administrator'">
          <a-form-item field="adminId" label="超级管理员编号" required>
            <a-input
              v-model="form.adminId"
              placeholder="请输入超级管理员编号"
            />
          </a-form-item>
          <a-form-item field="department" label="管理部门">
            <a-input v-model="form.department" placeholder="请输入管理部门" />
          </a-form-item>
        </template>

        <!-- 教师额外字段 -->
        <template v-if="form.role === 'teacher'">
          <a-form-item field="teacherId" label="教工号" required>
            <a-input v-model="form.teacherId" placeholder="请输入教工号" />
          </a-form-item>
          <a-form-item field="title" label="职称">
            <a-select v-model="form.title" placeholder="请选择职称">
              <a-option value="教授">教授</a-option>
              <a-option value="副教授">副教授</a-option>
              <a-option value="讲师">讲师</a-option>
              <a-option value="助教">助教</a-option>
            </a-select>
          </a-form-item>
          <a-form-item field="department" label="所属院系">
            <a-input v-model="form.department" placeholder="请输入所属院系" />
          </a-form-item>
        </template>

        <!-- 学生额外字段 -->
        <template v-if="form.role === 'student'">
          <a-form-item field="studentId" label="学号" required>
            <a-input v-model="form.studentId" placeholder="请输入学号" />
          </a-form-item>
          <a-form-item field="grade" label="年级">
            <a-input v-model="form.grade" placeholder="请输入年级" />
          </a-form-item>
          <a-form-item field="major" label="专业">
            <a-input v-model="form.major" placeholder="请输入专业" />
          </a-form-item>
        </template>

        <!-- 提交按钮 -->
        <a-form-item>
          <a-button :loading="loading" html-type="submit" long type="primary"
            >注册
          </a-button>
        </a-form-item>

        <!-- 跳转到登录页面 -->
        <a-form-item>
          <div style="text-align: center">
            <a @click="goToLogin">已有账号？立即登录</a>
          </div>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import axios from "axios";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { IconPlus } from "@arco-design/web-vue/es/icon";

const router = useRouter();

// 表单数据
const form = reactive({
  role: "student", // 默认选择学生
  userAccount: "",
  userPassword: "",
  checkPassword: "", // 新增确认密码字段
  userName: "",
  userAvatar: "",
  userProfile: "",
  adminId: "",
  department: "",
  teacherId: "",
  title: "",
  studentId: "",
  grade: "",
  major: "",
});

// 文件列表
const fileList = ref([]);

// 加载状态
const loading = ref(false);

// 处理角色切换
const handleRoleChange = (value: any) => {
  console.log("选择的注册角色:", value);
};

// 处理文件上传前的校验
const beforeUpload = (file: File) => {
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    message.error("只能上传图片文件");
    return false;
  }
  const isLt4M = file.size / 1024 / 1024 < 4; // 限制文件大小为 4MB
  if (!isLt4M) {
    message.error("图片大小不能超过 4MB");
    return false;
  }
  return true;
};

// 处理表单提交
const handleSubmit = async () => {
  loading.value = true;
  try {
    const {
      role,
      userAccount,
      userPassword,
      checkPassword, // 新增确认密码字段
      userName,
      userProfile,
      adminId,
      department,
      teacherId,
      title,
      studentId,
      grade,
      major,
    } = form;

    // 校验密码一致性
    if (userPassword !== checkPassword) {
      message.error("两次输入的密码不一致");
      return;
    }

    // 如果有上传头像，将头像转换为 Base64
    if (fileList.value.length > 0) {
      const file = fileList.value[0];
      form.userAvatar = await fileToBase64(file);
    }

    let registerUrl = "";
    let requestData = {};

    if (role === "administrator") {
      registerUrl = "http://localhost:8101/api/user/administrator/register";
      requestData = {
        userAccount,
        userPassword,
        checkPassword,
        userName,
        userAvatar: form.userAvatar,
        userProfile,
        adminId,
        department,
      };
    } else if (role === "teacher") {
      registerUrl = "http://localhost:8101/api/user/teacher/register";
      requestData = {
        userAccount,
        userPassword,
        checkPassword,
        userName,
        userAvatar: form.userAvatar,
        userProfile,
        teacherId,
        title,
        department,
      };
    } else if (role === "student") {
      registerUrl = "http://localhost:8101/api/user/student/register";
      requestData = {
        userAccount,
        userPassword,
        checkPassword,
        userName,
        userAvatar: form.userAvatar,
        userProfile,
        studentId,
        grade,
        major,
      };
    }

    // 发送注册请求
    const response = await axios.post(registerUrl, requestData);

    if (response.data.code === 0) {
      // 注册成功
      message.success("注册成功，请登录");
      router.push("/user/login"); // 跳转到登录页面
    } else {
      // 注册失败
      message.error("注册失败: " + response.data.message);
    }
  } catch (error) {
    console.error("请求失败", error);
    message.error("注册失败: 网络错误");
  } finally {
    loading.value = false;
  }
};

// 将文件转换为 Base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// 跳转到登录页面
const goToLogin = () => {
  router.push("/user/login");
};
</script>

<style scoped>
.userRegisterView {
  padding: 20px;
  text-align: center;
}

.a-card {
  border-radius: 8px;
}

.a-form-item {
  margin-bottom: 20px;
}

.a-button {
  margin-top: 10px;
}
</style>

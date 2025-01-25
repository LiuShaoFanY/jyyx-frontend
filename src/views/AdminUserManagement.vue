<template>
  <a-layout class="admin-user-management">
    <!-- 头部 -->
    <a-layout-header class="header">
      <a-space>
        <a-button type="primary" @click="goBack" class="back-button">
          <icon-arrow-left />
          返回上一页
        </a-button>
        <a-typography-title :level="2" class="title"
          >用户管理</a-typography-title
        >
      </a-space>
    </a-layout-header>

    <!-- 内容 -->
    <a-layout-content class="content">
      <!-- 添加用户表单 -->
      <a-card class="add-user-form" title="添加用户" :bordered="false">
        <a-space direction="vertical" size="small" fill>
          <a-select
            v-model="userType"
            placeholder="请选择用户类型"
            class="select"
          >
            <a-option value="student">学生</a-option>
            <a-option value="teacher">教师</a-option>
          </a-select>

          <a-input
            v-model="newUser.userAccount"
            placeholder="账号"
            class="input"
          />
          <a-input-password
            v-model="newUser.userPassword"
            placeholder="密码"
            class="input"
          />
          <a-input-password
            v-model="newUser.checkPassword"
            placeholder="确认密码"
            class="input"
          />

          <!-- 学生信息 -->
          <template v-if="userType === 'student'">
            <a-input
              v-model="newUser.studentId"
              placeholder="学号"
              class="input"
            />
            <a-input v-model="newUser.grade" placeholder="年级" class="input" />
            <a-input v-model="newUser.major" placeholder="专业" class="input" />
          </template>

          <!-- 教师信息 -->
          <template v-if="userType === 'teacher'">
            <a-input
              v-model="newUser.teacherId"
              placeholder="教师编号"
              class="input"
            />
            <a-select
              v-model="newUser.title"
              placeholder="请选择职称"
              class="select"
            >
              <a-option value="教授">教授</a-option>
              <a-option value="副教授">副教授</a-option>
              <a-option value="讲师">讲师</a-option>
              <a-option value="助教">助教</a-option>
            </a-select>
            <a-input
              v-model="newUser.department"
              placeholder="部门"
              class="input"
            />
          </template>

          <a-button type="primary" @click="addUser" class="button">
            添加用户
          </a-button>
        </a-space>
      </a-card>

      <!-- 用户列表 -->
      <a-card class="user-list" title="用户列表" :bordered="false">
        <a-table
          :columns="columns"
          :data="filteredUsers"
          :pagination="{
            showTotal: true,
            pageSize: searchParams.pageSize,
            current: searchParams.current,
            total,
          }"
          @page-change="onPageChange"
          class="table"
        >
          <template #details="{ record }">
            <div v-if="record.userRole === 'student' && record.studentInfo">
              <p>学号: {{ record.studentInfo.studentId }}</p>
              <p>年级: {{ record.studentInfo.grade }}</p>
              <p>专业: {{ record.studentInfo.major }}</p>
            </div>
            <div v-if="record.userRole === 'teacher' && record.teacherInfo">
              <p>教师编号: {{ record.teacherInfo.teacherId }}</p>
              <p>职称: {{ record.teacherInfo.title }}</p>
              <p>部门: {{ record.teacherInfo.department }}</p>
            </div>
            <div
              v-if="
                record.userRole === 'administrator' && record.administratorInfo
              "
            >
              <p>管理员编号: {{ record.administratorInfo.adminId }}</p>
              <p>部门: {{ record.administratorInfo.department }}</p>
            </div>
          </template>
          <template #actions="{ record }">
            <a-space>
              <a-button
                type="text"
                @click="editUser(record)"
                class="action-button"
              >
                <icon-edit />
                编辑
              </a-button>
              <a-button
                type="text"
                status="danger"
                @click="deleteUser(record)"
                class="action-button"
              >
                <icon-delete />
                删除
              </a-button>
              <a-button
                type="text"
                @click="showUserDetails(record)"
                class="action-button"
              >
                <icon-eye />
                查看详情
              </a-button>
            </a-space>
          </template>
        </a-table>
      </a-card>
    </a-layout-content>

    <!-- 底部 -->
    <a-layout-footer class="footer">© 2025 超级管理员</a-layout-footer>

    <!-- 编辑用户模态框 -->
    <a-modal
      v-model:visible="editingUserVisible"
      title="编辑用户"
      @ok="updateUser"
      @cancel="cancelEdit"
      class="modal"
    >
      <a-form :model="editingUser" v-if="editingUser">
        <a-form-item label="账号">
          <a-input v-model="editingUser.userAccount" class="input" />
        </a-form-item>
        <a-form-item label="密码">
          <a-input-password v-model="editingUser.userPassword" class="input" />
        </a-form-item>
        <a-form-item
          v-if="editingUser.userRole === 'student' && editingUser.studentInfo"
          label="学号"
        >
          <a-input v-model="editingUser.studentInfo.studentId" class="input" />
        </a-form-item>
        <a-form-item
          v-if="editingUser.userRole === 'student' && editingUser.studentInfo"
          label="年级"
        >
          <a-input v-model="editingUser.studentInfo.grade" class="input" />
        </a-form-item>
        <a-form-item
          v-if="editingUser.userRole === 'student' && editingUser.studentInfo"
          label="专业"
        >
          <a-input v-model="editingUser.studentInfo.major" class="input" />
        </a-form-item>
        <a-form-item
          v-if="editingUser.userRole === 'teacher' && editingUser.teacherInfo"
          label="教师编号"
        >
          <a-input v-model="editingUser.teacherInfo.teacherId" class="input" />
        </a-form-item>
        <a-form-item
          v-if="editingUser.userRole === 'teacher' && editingUser.teacherInfo"
          label="职称"
        >
          <a-select
            v-model="editingUser.teacherInfo.title"
            placeholder="请选择职称"
            class="select"
          >
            <a-option value="教授">教授</a-option>
            <a-option value="副教授">副教授</a-option>
            <a-option value="讲师">讲师</a-option>
            <a-option value="助教">助教</a-option>
          </a-select>
        </a-form-item>
        <a-form-item
          v-if="editingUser.userRole === 'teacher' && editingUser.teacherInfo"
          label="部门"
        >
          <a-input v-model="editingUser.teacherInfo.department" class="input" />
        </a-form-item>
        <a-form-item
          v-if="
            editingUser.userRole === 'administrator' &&
            editingUser.administratorInfo
          "
          label="管理员编号"
        >
          <a-input
            v-model="editingUser.administratorInfo.adminId"
            class="input"
          />
        </a-form-item>
        <a-form-item
          v-if="
            editingUser.userRole === 'administrator' &&
            editingUser.administratorInfo
          "
          label="部门"
        >
          <a-input
            v-model="editingUser.administratorInfo.department"
            class="input"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 用户详情模态框 -->
    <a-modal
      v-model:visible="userDetailsVisible"
      :title="`用户详情 - ${userDetails.userAccount || '未知用户'}`"
      @cancel="closeUserDetails"
      class="modal"
    >
      <a-descriptions :column="1" v-if="userDetails.userAccount">
        <a-descriptions-item label="账号"
          >{{ userDetails.userAccount || "无" }}
        </a-descriptions-item>
        <a-descriptions-item label="姓名"
          >{{ userDetails.userName || "无" }}
        </a-descriptions-item>
        <a-descriptions-item label="角色"
          >{{ userDetails.userRole || "无" }}
        </a-descriptions-item>
        <a-descriptions-item
          v-if="userDetails.userRole === 'student' && userDetails.studentInfo"
          label="学号"
        >
          {{ userDetails.studentInfo.studentId || "无" }}
        </a-descriptions-item>
        <a-descriptions-item
          v-if="userDetails.userRole === 'student' && userDetails.studentInfo"
          label="年级"
        >
          {{ userDetails.studentInfo.grade || "无" }}
        </a-descriptions-item>
        <a-descriptions-item
          v-if="userDetails.userRole === 'student' && userDetails.studentInfo"
          label="专业"
        >
          {{ userDetails.studentInfo.major || "无" }}
        </a-descriptions-item>
        <a-descriptions-item
          v-if="userDetails.userRole === 'teacher' && userDetails.teacherInfo"
          label="教师编号"
        >
          {{ userDetails.teacherInfo.teacherId || "无" }}
        </a-descriptions-item>
        <a-descriptions-item
          v-if="userDetails.userRole === 'teacher' && userDetails.teacherInfo"
          label="职称"
        >
          {{ userDetails.teacherInfo.title || "无" }}
        </a-descriptions-item>
        <a-descriptions-item
          v-if="userDetails.userRole === 'teacher' && userDetails.teacherInfo"
          label="部门"
        >
          {{ userDetails.teacherInfo.department || "无" }}
        </a-descriptions-item>
        <a-descriptions-item
          v-if="
            userDetails.userRole === 'administrator' &&
            userDetails.administratorInfo
          "
          label="管理员编号"
        >
          {{ userDetails.administratorInfo.adminId || "无" }}
        </a-descriptions-item>
        <a-descriptions-item
          v-if="
            userDetails.userRole === 'administrator' &&
            userDetails.administratorInfo
          "
          label="部门"
        >
          {{ userDetails.administratorInfo.department || "无" }}
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </a-layout>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import { Message } from "@arco-design/web-vue";
import {
  IconArrowLeft,
  IconDelete,
  IconEdit,
  IconEye,
} from "@arco-design/web-vue/es/icon";
import { useRouter } from "vue-router";

const router = useRouter();

const goBack = () => {
  router.go(-1);
};

interface UserRecord {
  id: string;
  userAccount: string;
  userPassword: string;
  userName: string;
  userRole: string;
  createTime: string;
  studentInfo?: {
    studentId: string;
    grade: string;
    major: string;
  };
  teacherInfo?: {
    teacherId: string;
    title: string;
    department: string;
  };
  administratorInfo?: {
    adminId: string;
    department: string;
  };
}

interface ApiResponse {
  code: number;
  data: UserRecord[];
  total: number;
  message?: string;
}

const userType = ref("student");
const newUser = ref({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
  studentId: "",
  grade: "",
  major: "",
  teacherId: "",
  title: "",
  department: "",
});
const dataList = ref<UserRecord[]>([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});
const editingUser = ref<UserRecord | null>(null);
const editingUserVisible = ref(false);
const userDetails = ref<UserRecord>({
  id: "",
  userAccount: "",
  userPassword: "",
  userName: "",
  userRole: "",
  createTime: "",
  studentInfo: undefined,
  teacherInfo: undefined,
  administratorInfo: undefined,
});
const userDetailsVisible = ref(false);

const filteredUsers = computed(() => {
  return dataList.value.map((user) => ({
    id: user.id,
    userAccount: user.userAccount,
    userName: user.userName,
    userRole: user.userRole,
    createTime: user.createTime,
    studentInfo: user.studentInfo,
    teacherInfo: user.teacherInfo,
    administratorInfo: user.administratorInfo,
  }));
});

const loadData = async () => {
  try {
    const response = await axios.get<ApiResponse>(
      "http://localhost:8101/api/user/administrator/getAllUsers",
      {
        params: searchParams.value,
      }
    );
    if (response.data.code === 0) {
      dataList.value = response.data.data;
      total.value = response.data.total || response.data.data.length;
    } else {
      Message.error("加载失败: " + (response.data.message || "未知错误"));
    }
  } catch (error) {
    if (error instanceof Error) {
      Message.error("请求失败: " + error.message);
    } else {
      Message.error("请求失败: 未知错误");
    }
  }
};

const onPageChange = (page: number) => {
  searchParams.value.current = page;
  loadData();
};

const addUser = async () => {
  const url =
    userType.value === "student"
      ? "http://localhost:8101/api/user/administrator/addStudent"
      : "http://localhost:8101/api/user/administrator/addTeacher";

  try {
    const response = await axios.post<ApiResponse>(url, newUser.value);
    if (response.data.code === 0) {
      Message.success("用户添加成功");
      loadData();
    } else {
      Message.error("用户添加失败: " + (response.data.message || "未知错误"));
    }
  } catch (error) {
    if (error instanceof Error) {
      Message.error("请求失败: " + error.message);
    } else {
      Message.error("请求失败: 未知错误");
    }
  }
};

const editUser = (user: UserRecord) => {
  editingUser.value = { ...user };
  editingUserVisible.value = true;
};

const updateUser = async () => {
  if (!editingUser.value) {
    Message.error("当前没有可编辑的用户");
    return;
  }

  const url =
    editingUser.value.userRole === "student"
      ? "http://localhost:8101/api/user/administrator/updateStudent"
      : "http://localhost:8101/api/user/administrator/updateTeacher";

  try {
    const response = await axios.post<ApiResponse>(url, {
      id: editingUser.value.id,
      studentId: editingUser.value.studentInfo?.studentId,
      grade: editingUser.value.studentInfo?.grade,
      major: editingUser.value.studentInfo?.major,
      teacherId: editingUser.value.teacherInfo?.teacherId,
      title: editingUser.value.teacherInfo?.title,
      department: editingUser.value.teacherInfo?.department,
    });
    if (response.data.code === 0) {
      Message.success("用户更新成功");
      loadData(); // 重新加载数据
      cancelEdit();
    } else {
      Message.error("用户更新失败: " + (response.data.message || "未知错误"));
    }
  } catch (error) {
    if (error instanceof Error) {
      Message.error("请求失败: " + error.message);
    } else {
      Message.error("请求失败: 未知错误");
    }
  }
};

const cancelEdit = () => {
  editingUser.value = null;
  editingUserVisible.value = false;
};

const deleteUser = async (user: UserRecord) => {
  const url =
    user.userRole === "student"
      ? "http://localhost:8101/api/user/administrator/deleteStudent"
      : "http://localhost:8101/api/user/administrator/deleteTeacher";

  try {
    const response = await axios.post<ApiResponse>(url, { id: user.id });
    if (response.data.code === 0) {
      Message.success("用户删除成功");
      loadData();
    } else {
      Message.error("用户删除失败: " + (response.data.message || "未知错误"));
    }
  } catch (error) {
    if (error instanceof Error) {
      Message.error("请求失败: " + error.message);
    } else {
      Message.error("请求失败: 未知错误");
    }
  }
};

const showUserDetails = async (user: UserRecord) => {
  try {
    let response;
    if (user.userRole === "student") {
      response = await axios.get<UserRecord>(
        `http://localhost:8101/api/user/student/${user.id}`
      );
    } else if (user.userRole === "teacher") {
      response = await axios.get<UserRecord>(
        `http://localhost:8101/api/user/teacher/${user.id}`
      );
    } else if (user.userRole === "administrator") {
      response = await axios.get<UserRecord>(
        `http://localhost:8101/api/user/administrator/${user.id}`
      );
    }

    if (response && response.data) {
      userDetails.value = {
        ...userDetails.value,
        ...response.data,
      };
      userDetailsVisible.value = true;
    } else {
      Message.error("获取用户信息失败");
    }
  } catch (error) {
    if (error instanceof Error) {
      Message.error("请求失败: " + error.message);
    } else {
      Message.error("请求失败: 未知错误");
    }
  }
};

const closeUserDetails = () => {
  userDetails.value = {
    id: "",
    userAccount: "",
    userPassword: "",
    userName: "",
    userRole: "",
    createTime: "",
    studentInfo: undefined,
    teacherInfo: undefined,
    administratorInfo: undefined,
  };
  userDetailsVisible.value = false;
};

onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "姓名",
    dataIndex: "userName",
  },
  {
    title: "角色",
    dataIndex: "userRole",
  },
  {
    title: "详细信息",
    slotName: "details",
  },
  {
    title: "操作",
    slotName: "actions",
  },
];
</script>

<style scoped>
.admin-user-management {
  padding: 16px;
  background: linear-gradient(135deg, #f5f7fa, #e6e9ef);
  min-height: 100vh;
}

.header {
  background-color: #ffffff;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 16px;
}

.title {
  color: #2c3e50;
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.content {
  margin-top: 16px;
}

.add-user-form,
.user-list {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-bottom: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.add-user-form:hover,
.user-list:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.input,
.select {
  width: 100%;
  margin-bottom: 8px;
  border-radius: 6px;
}

.button {
  width: 100%;
  margin-top: 8px;
  border-radius: 6px;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  transition: background 0.3s;
}

.button:hover {
  background: linear-gradient(135deg, #2575fc, #6a11cb);
}

.table {
  margin-top: 16px;
}

.action-button {
  margin-right: 8px;
  transition: color 0.2s;
}

.action-button:hover {
  color: #2575fc;
}

.footer {
  text-align: center;
  padding: 16px;
  background-color: #ffffff;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 16px;
}

.modal {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.back-button {
  background: linear-gradient(135deg, #ff9a9e, #fad0c4);
  border: none;
  color: white;
  transition: transform 0.2s, box-shadow 0.2s;
}

.back-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 154, 158, 0.3);
}
</style>

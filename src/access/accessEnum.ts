/**
 * 权限定义
 * 这个枚举类用于定义系统中的不同用户权限级别
 * 从最低的状态到最高的管理员权限，涵盖了用户、学生、教师等角色
 */
const ACCESS_ENUM = {
  NOT_LOGIN: "notLogin", // 未登录状态
  USER: "user", // 普通用户
  STUDENT: "student", // 学生角色
  TEACHER: "teacher", // 教师角色
  ADMINISTRATOR: "administrator", // 新增超级管理员角色
};
export default ACCESS_ENUM;

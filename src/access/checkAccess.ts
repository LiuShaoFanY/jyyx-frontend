// src/access/checkAccess.ts
import ACCESS_ENUM from "@/access/accessEnum";

interface LoginUser {
  username: string;
  userRole: string;
}

/**
 * 检查用户是否有权限访问某个页面
 * @param loginUser 当前登录用户
 * @param needAccess 需要的权限（可以是单个权限或权限数组）
 * @returns 是否有权限
 */
const checkAccess = (
  loginUser: LoginUser | null,
  needAccess: string | string[] = ACCESS_ENUM.NOT_LOGIN
): boolean => {
  // 获取当前用户具有的权限（如果没有 loginUser，则表示未登录）
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;

  // 如果用户是超级管理员，直接返回 true（超级管理员拥有所有权限）
  if (loginUserAccess === ACCESS_ENUM.ADMINISTRATOR) {
    return true;
  }

  // 如果需要的权限是未登录，直接返回 true
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) {
    return true;
  }

  // 如果 needAccess 是数组，检查用户权限是否在数组中
  if (Array.isArray(needAccess)) {
    return needAccess.includes(loginUserAccess);
  }

  // 如果 needAccess 是字符串，直接比较
  return needAccess === loginUserAccess;
};

export default checkAccess;

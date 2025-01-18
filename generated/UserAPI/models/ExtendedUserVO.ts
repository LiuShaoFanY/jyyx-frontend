/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Administrator } from "./Administrator";
import type { Student } from "./Student";
import type { Teacher } from "./Teacher";

export type ExtendedUserVO = {
  administratorInfo?: Administrator;
  createTime?: string;
  id?: number;
  studentInfo?: Student;
  teacherInfo?: Teacher;
  userAvatar?: string;
  userName?: string;
  userProfile?: string;
  userRole?: string;
};

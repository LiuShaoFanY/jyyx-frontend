// 在 generated/models.ts 中定义 BaseResponse
export interface BaseResponse<T> {
  code: number;
  message: string;
  data: T;
}

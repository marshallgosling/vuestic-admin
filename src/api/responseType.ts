// responseTpe.ts
// 定义一个接口，用于规范响应数据的格式
export interface ResponseData<T = any> {
  code: number
  data: T
  message: string
}

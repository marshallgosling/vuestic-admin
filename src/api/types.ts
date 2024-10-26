// type.ts
import type { ResponseData } from './responseType'

export interface empty extends ResponseData {}

export interface loginUser extends ResponseData {
  data: {
    id: number
    name: string
    token: string
    group: string
    avatar: string
    email: string
  }
}
// 定义一个接口，用于规范用户的数据类型
export interface userList extends ResponseData {
  data: {
    id: number
    name: string
    age: number
    email: string
    avatar: string
  }
}

import request from '../../services/request'
import { userList } from '../types'

enum API {
  USERINFO_LIST_URL = '/user/list',
}

// 用于获取用户列表
export const getUserList = () => {
  return request.get<any, userList>(API.USERINFO_LIST_URL)
}

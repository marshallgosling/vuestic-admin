import request from '../services/request'
import { userProfile } from './types'

enum API {
  USER_PROFILE_URL = '/user/profile',
}

// 用于获取用户信息
export const getUserProfile = () => {
  return request.get<any, userProfile>(API.USER_PROFILE_URL)
}

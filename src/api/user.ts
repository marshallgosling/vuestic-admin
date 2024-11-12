import request from '../services/request'
import { userProfile } from './types'

enum API {
  ME_URL = '/auth/me',
  PROFILE_URL = '/auth/profile',
  PASSWORD_URL = '/auth/password',
}

// 用于获取用户信息
export const getUserProfile = () => {
  return request.get<any, userProfile>(API.ME_URL)
}

export const setUserProfile = (data: { name: string }) => {
  return request.post<any, userProfile>(API.PROFILE_URL, data)
}

export const setUserPassword = (data: { password: string }) => {
  return request.put<any, userProfile>(API.PASSWORD_URL, data)
}

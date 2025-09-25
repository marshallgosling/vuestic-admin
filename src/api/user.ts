import request from '../services/request'
import { userProfile } from './types'

enum API {
  ME_URL = '/auth/me',
  PROFILE_URL = '/auth/profile',
  PASSWORD_URL = '/auth/password',
}

// 用于获取用户信息
export const getUserProfile = (uid: string) => {
  return request.get<any, userProfile>(API.ME_URL + '?uid=' + uid)
}

export const setUserProfile = (data: { uid: string; name: string }) => {
  return request.post<any, userProfile>(API.PROFILE_URL, data)
}

export const setUserPassword = (data: { uid: string; password: string }) => {
  return request.put<any, userProfile>(API.PASSWORD_URL, data)
}

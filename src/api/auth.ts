import request from '../services/request'
import { loginUser, empty } from './types'

enum API {
  AUTH_LOGIN_URL = '/auth/login',
  AUTH_REGISTER_URL = '/auth/register',
  AUTH_FORGOT_PASSWORD = '/auth/forgot',
}

export const login = (email: string, password: string, remember: boolean) => {
  return request.post<any, loginUser>(API.AUTH_LOGIN_URL, { email, password, remember })
}

export const register = (email: string, name: string, password: string) => {
  return request.post<any, loginUser>(API.AUTH_REGISTER_URL, { email, name, password })
}

export const forgot = (email: string) => {
  return request.post<any, empty>(API.AUTH_FORGOT_PASSWORD, { email })
}

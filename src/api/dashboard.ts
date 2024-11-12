import request from '../services/request'

enum API {
  EXPENSE_URL = '/dashboard/expense',
  PROFILE_URL = '/dashboard/profile',
  PASSWORD_URL = '/auth/password',
}

export const getExpense = () => {
  return request.get<any, any>(API.EXPENSE_URL)
}

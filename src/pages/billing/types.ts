export interface Invoice {
  id: string
  name: string
  amount: number
  currency: string
  tax: number
  tax_amount: number
}

export interface Billing {
  id: string
  name: string
  amount: number
  month: string
  status: number
  created_at: string
}

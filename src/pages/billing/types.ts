export interface Invoice {
  id: string
  name: string
  amount: number
  currency: string
  tax: number
  tax_amount: number
  status: number
  items: InvoiceItem[]
}

export interface InvoiceItem {
  id: string
  name: string
  amount: number
  duration: string
  description: string
  price: number
  quantity: number
  created_at: string
  updated_at: string
}

export interface Billing {
  id: string
  name: string
  amount: number
  month: string
  duration: string
  status: number
  created_at: string
}

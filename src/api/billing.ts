import request from '../services/request'
import { paymentCardList, paymentCardItem, invoiceList, invoiceItem, empty } from './types'
import { PaymentCard } from '../pages/payments/types'

enum API {
  INVOICES_URL = '/billing/invoices',
  INVOICE_URL = '/billing/invoice/',
  CARD_URL = '/billing/card',
  CARDS_URL = '/billing/cards',
  CREATE_URL = '/billing/create',
  UPDATE_URL = '/billing/update',
  DELETE_URL = '/billing/delete/',
  DOWNLOAD_URL = '/invoice/download/',
}

export const getInvoices = (query: string) => {
  return request.get<any, invoiceList>(API.INVOICES_URL + '?' + query)
}

export const getInvoiceDetails = (id: string) => {
  return request.get<any, invoiceItem>(API.INVOICE_URL + '/' + id)
}

export const getPaymentCard = () => {
  return request.get<any, paymentCardItem>(API.CARD_URL)
}

export const getPaymentCards = (query: string) => {
  return request.get<any, paymentCardList>(API.CARDS_URL + '?' + query)
}

export const deletePaymentCard = (id: string) => {
  return request.delete<any, empty>(API.DELETE_URL + id)
}

export const updatePaymentCard = (card: PaymentCard) => {
  return request.put<any, paymentCardItem>(API.UPDATE_URL, card)
}

export const createPaymentCard = (card: any) => {
  return request.post<any, paymentCardItem>(API.CREATE_URL, card)
}

export const downloadInvoice = (id: string) => {
  return request.get<any, any>(API.DOWNLOAD_URL + id)
}

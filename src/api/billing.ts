import request from '../services/request'
import { paymentCardList, paymentCardItem, invoiceList, empty } from './types'
import { PaymentCard } from '../pages/payments/types'

enum API {
  INVOICES_URL = '/billing/invoices',
  CARD_URL = '/billing/card',
  CARDS_URL = '/billing/cards',
  CREATE_URL = '/billing/create',
  UPDATE_URL = '/billing/update',
  DELETE_URL = '/billing/delete/'
}

export const getInvoices = (query: string) => {
    return request.get<any, invoiceList>(API.INVOICES_URL+"?"+query)
}

export const getPaymentCard = () => {
    return request.get<any, paymentCardItem>(API.CARD_URL)
}

export const getPaymentCards = (query: string) => {
    return request.get<any, paymentCardList>(API.CARDS_URL+"?"+query)
}

export const deletePaymentCard = (id: string) => {
    return request.delete<any, empty>(API.DELETE_URL+id)
}

export const updatePaymentCard = (card: PaymentCard) => {
    return request.put<any, paymentCardItem>(API.UPDATE_URL, card)
}

export const createPaymentCard = (card: any) => {
    return request.post<any, paymentCardItem>(API.CREATE_URL, card)
}

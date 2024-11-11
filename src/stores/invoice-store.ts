// src/stores/cards.ts

import { defineStore } from 'pinia'
import { getInvoices } from '../api/billing'
import { Invoice } from '../pages/billing/types'

// Simulated fetch function
const fetchInvoices = async () => {
  const { data } = await getInvoices("");
  return data as Invoice[]
}

export const usePaymentInvoicesStore = defineStore({
  id: 'paymentInvoices',
  state: () => ({
    invoices: [] as Invoice[],
    loading: false,
    currency: '$'
  }),
  getters: {
    //currentPaymentCard: (state): PaymentCard | undefined => state.paymentCards.find((card) => card.isPrimary),
    allInvoices: (state) => state.invoices,
  },
  actions: {
    async load() {
      this.loading = true
      this.invoices = await fetchInvoices()
      this.loading = false
    }
  },
})

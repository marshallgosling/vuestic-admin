import { defineStore } from 'pinia'
import { getInvoices } from '../api/billing'
import { Invoice } from '../pages/billing/types'

// Simulated fetch function
const fetchInvoices = async () => {
  const { data } = await getInvoices('')
  return data as Invoice[]
}

export const usePaymentInvoicesStore = defineStore({
  id: 'paymentInvoices',
  state: () => ({
    invoices: [] as Invoice[],
    loading: false,
    currency: '$',
  }),
  getters: {
    //currentPaymentCard: (state): PaymentCard | undefined => state.paymentCards.find((card) => card.isPrimary),
    latestInvoice: (state) => (state.invoices.length == 0 ? null : state.invoices[0]),
    allInvoices: (state) => state.invoices,
    month: (state) => (state.invoices.length == 0 ? '' : state.invoices[0].name),
    //invoiceTabs: (state) =>
  },
  actions: {
    async load() {
      if (this.invoices.length > 0) return
      this.loading = true
      this.invoices = await fetchInvoices()
      this.loading = false
    },
  },
})

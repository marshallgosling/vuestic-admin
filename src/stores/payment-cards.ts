// src/stores/cards.ts

import { defineStore } from 'pinia'
import { PaymentCard } from '../pages/payments/types' // adjust the import path accordingly
import { getPaymentCards, deletePaymentCard } from '../api/billing'

// Simulated fetch function
const fetchPaymentCards = async () => {
  const { data } = await getPaymentCards('')
  return data as PaymentCard[]
}

const removePaymentCard = async (cardId: string): Promise<{ code: number; message: string }> => {
  const { code, message } = await deletePaymentCard(cardId)
  return { code, message }
}

export const usePaymentCardsStore = defineStore({
  id: 'paymentCards',
  state: () => ({
    paymentCards: [] as PaymentCard[],
    loading: false,
  }),
  getters: {
    currentPaymentCard: (state): PaymentCard | undefined => state.paymentCards.find((card) => card.isPrimary),
    allPaymentCards: (state) => state.paymentCards,
  },
  actions: {
    async load() {
      this.loading = true
      this.paymentCards = await fetchPaymentCards()
      this.loading = false
    },
    create(card: PaymentCard) {
      this.paymentCards.unshift(card)
    },
    update(card: PaymentCard) {
      const index = this.paymentCards.findIndex((existingCard) => existingCard.id === card.id)
      if (index !== -1) {
        this.paymentCards.splice(index, 1, card)
      }
    },
    async remove(cardId: string) {
      const { code, message } = await removePaymentCard(cardId)
      if (code === 200) {
        this.paymentCards = this.paymentCards.filter((card) => card.id !== cardId)
      }
      return { code, message }
    },
  },
})

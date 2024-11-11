// src/stores/cards.ts

import { defineStore } from 'pinia'
import { PaymentSystemType, PaymentCard } from '../pages/payments/types' // adjust the import path accordingly
import { getPaymentCards } from '../api/billing';

// Simulated fetch function
const fetchPaymentCards = async () => {
  const { data } = await getPaymentCards("");
  return data as PaymentCard[]
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
      //this.paymentCards.unshift(card)
    },
    update(card: PaymentCard) {
      // const index = this.paymentCards.findIndex((existingCard) => existingCard.id === card.id)
      // if (index !== -1) {
      //   this.paymentCards.splice(index, 1, card)
      // }
    },
    remove(cardId: string) {
      //this.paymentCards = this.paymentCards.filter((card) => card.id !== cardId)
    },
  },
})

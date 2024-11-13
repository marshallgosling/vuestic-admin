import { defineStore } from 'pinia'
import { getInstancePrices } from '../api/instance'
import { InstancePrice } from '../pages/pricing-plans/types'
import { ref } from 'vue'

// Simulated fetch function
const fetchPrices = async () => {
  const { data } = await getInstancePrices()
  return data as InstancePrice[]
}

export const useInstancePricesStore = defineStore({
  id: 'instancePrice',
  state: () => ({
    prices: [] as InstancePrice[],
    loading: ref(false),
    currency: '￥',
  }),
  getters: {
    all: (state) => state.prices,
  },
  actions: {
    async load() {
      if(this.prices.length > 0) return
      this.loading = true
      this.prices = await fetchPrices()
      this.loading = false
    },
  },
})

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useModelStore = defineStore('silicon', () => {
  const currentModel = ref('Pro/deepseek-ai/DeepSeek-R1')

  const setCurrentModel = (newModel: string) => {
    currentModel.value = newModel
  }

  const models = ref([
    { name: 'deepseek-ai/DeepSeek-R1', value: 'Pro/deepseek-ai/DeepSeek-R1' },
    { name: 'deepseek-ai/DeepSeek-V3', value: 'Pro/deepseek-ai/DeepSeek-V3' },
  ])

  return { currentModel, setCurrentModel, models }
})

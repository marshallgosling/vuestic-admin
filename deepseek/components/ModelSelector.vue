<script setup lang="ts">
import { toRefs } from 'vue'
import { useModelStore } from '../../../stores/silicon'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const modelStore = useModelStore()
const { currentModel, models } = toRefs(modelStore)

const newModelSelected = () => {
  localStorage.setItem('lastSelectedModel', currentModel.value)
}
</script>

<template>
  <div id="modelSelectorContainer">
    <div id="modelSelector" class="flex flex-column">
      <VaSelect
        v-model="currentModel"
        :placeholder="t('deepseek.model')"
        :label="t('deepseek.model')"
        track-by="value"
        value-by="value"
        text-by="name"
        :clearable="true"
        :options="models"
        @update:modelValue="newModelSelected"
      />
    </div>
  </div>
</template>

<style scoped>
#modelSelectorContainer {
  display: flex;
}

#modelSelector {
  width: 100%;
  margin: 1rem;
}
</style>

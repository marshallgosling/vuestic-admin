<template>
  <h1 class="page-title">{{ t('bot.title') }}</h1>

  <div class="flex flex-col p-4 bg-backgroundSecondary">
    <iframe
      id="myIframe"
      src="/console/bot/#/chat-demo"
      width="100%"
      frameborder="0"
      @load="adjustIframeHeight"
    ></iframe>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const adjustIframeHeight = (event: any) => {
  const iframe = event.target

  if (iframe) {
    iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px'
  }
}
</script>

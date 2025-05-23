<script setup lang="ts">
import { Message } from '../types'
import { ref, toRefs } from 'vue'
import ChatMessage from './ChatMessage.vue'
import { useModelStore } from '../../../stores/silicon'
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  baseURL: import.meta.env.VITE_OPENAI_BASE_URL,
  dangerouslyAllowBrowser: true,
})
const modelStore = useModelStore()
const { currentModel } = toRefs(modelStore)
const chatArea = ref<HTMLElement | null>(null)
const answerLoading = ref(false)

const scrollToBottom = (force: boolean) => {
  if (!chatArea.value) return
  // don't scroll if the user has scrolled up
  if (!force && chatArea.value.scrollHeight - chatArea.value.scrollTop > chatArea.value.clientHeight + 50) {
    return
  }
  chatArea.value.scrollTop = chatArea.value.scrollHeight
}

const tryChat = async (model: string, inputMessage: Message) => {
  let response
  try {
    response = await client.chat.completions.create({
      model,
      messages: [inputMessage],
      stream: true,
    })
  } catch (error: any) {
    console.error(error)
  }
  return response
}

const submitChat = async (event: Event) => {
  if (event instanceof KeyboardEvent && (event.altKey || event.shiftKey || event.ctrlKey)) {
    return
  }
  answerLoading.value = true
  const content = messageContent.value
  messageContent.value = ''
  const inputMessage = { role: 'user', content }
  messages.value.push(inputMessage)
  scrollToBottom(true)

  const response = await tryChat(currentModel.value, inputMessage)
  answerLoading.value = false
  if (!response) return

  const appendMessage = () => {
    const content = currentOutputMessageContent.value.trim()
    if (content) {
      console.log(content)
      messages.value.push({
        role: 'agent',
        content: content,
      })
      scrollToBottom(true)
      // auto-chat: uncomment to have the agent interact with itself
      // i++;
      // setTimeout(() => {
      //   messageContent.value =
      //     i % 2 === 1
      //       ? `Pose a new question to me based on the main points of this text: \n\n---\n\n${content}\n\n---\n\n`
      //       : content;
      //   submitChat(event);
      // }, 0);
    }
    currentOutputMessageContent.value = ''
  }

  for await (const part of response) {
    const forceScroll = !currentOutputMessageContent.value
    currentOutputMessageContent.value += part.choices[0]?.delta?.content || ''
    setTimeout(() => {
      scrollToBottom(forceScroll)
    }, 100)
  }
  appendMessage()
}

const messageContent = ref('Why is the sky blue?')
const messages = ref([{ role: 'agent', content: 'Hello, I am Lliam. How can I help you?' }])
const currentOutputMessageContent = ref('')
</script>

<template>
  <div id="chatBox">
    <div id="chatContainer">
      <div id="chatArea" ref="chatArea">
        <div v-for="message in messages" :key="message.content">
          <ChatMessage :message="message" />
        </div>
        <div v-if="currentOutputMessageContent">
          <ChatMessage :message="{ role: 'agent', content: currentOutputMessageContent }" />
        </div>
        <div v-else-if="answerLoading">
          <ChatMessage :message="{ role: 'agent', content: '' }">
            <div class="flex flex-column ml-4">
              <VaSkeleton class="mb-2"></VaSkeleton>
              <VaSkeleton width="10rem" class="mb-2"></VaSkeleton>
              <VaSkeleton width="5rem" class="mb-2"></VaSkeleton>
              <VaSkeleton width="2rem" class="mb-2"></VaSkeleton>
            </div>
          </ChatMessage>
        </div>
      </div>
    </div>
    <div id="inputArea">
      <VaTextarea id="chatInput" v-model="messageContent" @keyup.enter="submitChat" />
      <VaButton
        id="submitButton"
        :disabled="answerLoading ? true : undefined"
        size="medium"
        class="mr-6 mb-2"
        @click="submitChat"
        >Submit</VaButton
      >
    </div>
  </div>
</template>

<style scoped>
#chatBox {
  display: flex;
  height: 100%;
  flex-direction: column;
}

#chatContainer {
  position: relative;
  width: 100%;
  height: calc(100% - 100px);
}

#chatArea {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
}

#inputArea {
  display: flex;
  height: 100px;
  width: 100%;
  padding: 10px;
  align-items: space-between;
}

#chatInput {
  width: calc(100% - 82px);
  height: 100%;
  padding: 10px;
  margin-right: 10px;
}
</style>

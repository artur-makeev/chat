<template>
  <div class="chat-widget">
    <div class="chat-header">Чат с ботом</div>
    <div class="chat-messages" ref="chatMessages">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div
          :class="{
            'user-message': message.fromUser,
            'bot-message': !message.fromUser && !message.hint
          }"
        >
          <template v-if="message.hint">
            <button
              @click="sendMessageFromHint(message.text)"
              type="button"
              class="btn btn-secondary"
            >
              {{ message.text }}
            </button>
          </template>
          <template v-else>
            {{ message.text }}
          </template>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <div class="input-container">
        <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Введите сообщение..." />
        <img :src="sendIconSrc" @click="sendMessage" alt="send-icon" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import sendIconSrc from '@/assets/icons/send.svg'

interface Message {
  fromUser: boolean
  text: string
  hint?: boolean
}

export default defineComponent({
  data() {
    return {
      sendIconSrc,
      messages: [] as Message[],
      userInput: '' as string,
      options: ['Заказать пиццу', 'Установить будильник', 'Вывести погоду'] as string[]
    }
  },
  mounted() {
    this.addMessage(false, 'Привет! Что я могу для Вас сделать?')
    this.showOptions()
  },
  methods: {
    addMessage(fromUser: boolean, text: string, hint?: boolean): void {
      this.messages.push({ fromUser, text, hint })
      this.$nextTick(() => {
        this.scrollChatToBottom()
      })
    },
    sendMessage(): void {
      const userMessage = this.userInput.trim()
      if (userMessage !== '') {
        this.addMessage(true, userMessage)
        this.handleUserResponse(userMessage)
        this.userInput = ''
      }
    },
    sendMessageFromHint(text: string): void {
      this.addMessage(true, text)
      this.userInput = ''
      this.handleUserResponse(text)
    },
    handleUserResponse(userMessage: string): void {
      switch (userMessage) {
        case 'Заказать пиццу':
          this.addMessage(false, 'Хорошо, я закажу пиццу. Что еще могу сделать?')
          this.showOptions()
          break
        case 'Установить будильник':
          this.addMessage(false, 'Будильник установлен. Что еще могу сделать?')
          this.showOptions()
          break
        case 'Вывести погоду':
          this.addMessage(false, 'Погода: солнечно. Что еще могу сделать?')
          this.showOptions()
          break
        default:
          this.addMessage(false, 'Извините, не понимаю. Что еще могу сделать?')
          this.showOptions()
          break
      }
    },
    showOptions(): void {
      setTimeout(() => {
        this.options.forEach((option) => {
          this.addMessage(false, option, true)
        })
      }, 1000)
    },
    scrollChatToBottom(): void {
      const chatMessages = this.$refs.chatMessages as HTMLDivElement
      chatMessages.scrollTop = chatMessages.scrollHeight
    }
  }
})
</script>

<style scoped>
.chat-widget {
  width: 300px;
  height: 400px;
  /* Set your desired fixed height */
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.chat-header {
  background-color: #007bff;
  color: white;
  padding: 10px;
  text-align: center;
  font-weight: bold;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  scrollbar-width: thin;
  /* Firefox */
  scrollbar-color: #f2f2f2 #ffffff;
}

/* Chrome, Safari, Opera */
.chat-messages::-webkit-scrollbar {
  width: 12px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: #f2f2f2;
  border-radius: 8px;
}

.chat-messages::-webkit-scrollbar-track {
  background-color: #ffffff;
}

.message {
  margin-bottom: 10px;
}

.user-message {
  text-align: right;
  background-color: #e6f7ff;
  border-radius: 4px;
  padding: 8px;
}

.bot-message {
  text-align: left;
  background-color: #f2f2f2;
  border-radius: 4px;
  padding: 8px;
}

.chat-input {
  padding: 10px;
  background-color: #f0f0f0;
}

.input-container {
  display: flex;
  align-items: center;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

img {
  cursor: pointer;
  margin-left: 8px;
}
</style>

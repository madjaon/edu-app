<script setup lang="ts">
import confetti from 'canvas-confetti'
import { Howl } from 'howler'

const props = defineProps<{
  message?: any
}>()

const emit = defineEmits(['click'])

const celebrateSound = new Howl({
  src: ['/sounds/success-fanfare-trumpets.mp3'],
})

function triggerCelebration() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
  })
  celebrateSound.play()
}

onMounted(() => {
  triggerCelebration()
})
</script>

<template>
  <div class="absolute inset-0 flex flex-col items-center justify-center p-2">
    <div class="bg-white/20 rounded-2xl shadow-lg p-8 text-center w-full">
      <h2 class="text-5xl sm:text-5xl font-bold text-green-600 mb-6">
        🎉 Giỏi lắm bé yêu! 🎉
      </h2>
      <p class="text-3xl text-gray-700 mb-8">
        {{ props?.message || 'Bé đã thành công rồi!' }}
      </p>
      <button
        class="px-8 py-4 text-2xl font-bold bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition duration-300 active:scale-95"
        @click="emit('click')"
      >
        🔁 Chơi Lại
      </button>
    </div>
  </div>
</template>

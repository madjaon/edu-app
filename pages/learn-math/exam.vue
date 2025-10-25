<script setup lang="ts">
import { Howl } from 'howler'

useHead({
  title: 'Tạo bài tập toán (Word)',
})

const count = ref(98)
const min = ref(0)
const max = ref(20)

function playSound(correct: boolean) {
  const sound = new Howl({
    src: [correct ? '/sounds/correct.mp3' : '/sounds/wrong.mp3'],
  })
  sound.play()
}

// /generate?count=14&min=0&max=20
async function downloadFile() {
  const path = `https://createmathdocx.onrender.com/generate?count=${count.value}&min=${min.value}&max=${max.value}`
  try {
    const res = await fetch(path)
    if (!res.ok)
      throw new Error('Download failed')
    // Tải file về (giả sử là file docx)
    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'baitap-toan.docx'
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
    playSound(true)
  }
  catch {
    playSound(false)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-4 pt-16">
    <h1 class="text-3xl font-bold text-purple-700 mb-6 text-center select-none">
      📝 Tạo bài tập toán (Word)
    </h1>

    <div class="flex flex-col items-center gap-4">
      <div class="mb-3 text-xl">
        Tạo 1 bảng gồm số lượng các phép tính cộng trừ trong phạm vi được nhập bên dưới.
      </div>
      <div class="mb-3 text-xl">
        Số lượng câu hỏi:
      </div>
      <input
        v-model="count"
        type="number"
        min="1"
        class="w-full border rounded px-6 py-3 text-center text-xl"
        placeholder="Số lượng câu hỏi"
      >
      <div class="mb-3 text-xl">
        Phạm vi phép toán từ:
      </div>
      <input
        v-model="min"
        type="number"
        min="0"
        class="w-full border rounded px-6 py-3 text-center text-xl"
      >
      <input
        v-model="max"
        type="number"
        min="0"
        class="w-full border rounded px-6 py-3 text-center text-xl"
      >
      <button
        class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-5 rounded flex items-center gap-2"
        @click="downloadFile"
      >
        ⬇️ Tải xuống file Word
      </button>
    </div>
  </div>
</template>

// plugins/disable-contextmenu.client.ts
export default defineNuxtPlugin(() => {
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
  })
})

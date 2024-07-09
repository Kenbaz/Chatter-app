export default defineNuxtPlugin((nuxtApp) => {
  const colorMode = useColorMode()

  nuxtApp.hook('app:mounted', () => {
    watchEffect(() => {
      const htmlElem = document.documentElement
      htmlElem.classList.toggle('dark', colorMode.value === 'dark')
    })
  })
})
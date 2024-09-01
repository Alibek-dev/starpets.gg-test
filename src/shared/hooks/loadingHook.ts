import { ref } from 'vue'

export default function loadingHook() {
  const isLoading = ref(false)

  const loadData = async (callback: Function) => {
    isLoading.value = true

    await callback().finally(() => {
      isLoading.value = false
    })
  }

  return { isLoading, loadData }
}

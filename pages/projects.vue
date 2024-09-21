<template>
  <div class="container mx-auto space-y-4 px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">{{ t('projects.title') }}</h1>
    <TransitionGroup name="project-list" tag="div" class="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div v-if="showProject" :key="1" class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-4 sm:p-6 text-left col-span-full">
        <h2 class="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4">{{ t('projects.comingSoon') }}</h2>
        <p class="text-sm sm:text-base text-gray-600 dark:text-gray-400">
          {{ t('projects.comingSoonMessage') }}
        </p>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
const { t } = useI18n()
const localePath = useLocalePath()

const showProject = ref(false)

onMounted(() => {
  setTimeout(() => {
    showProject.value = true
  }, 100)
})
</script>

<style scoped>
.project-list-enter-active,
.project-list-leave-active {
  transition: all 0.5s ease;
}
.project-list-enter-from,
.project-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

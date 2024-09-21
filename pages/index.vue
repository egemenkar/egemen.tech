<template>
  <div>
    <div class="max-w-2xl w-full px-4 sm:px-0">
      <div class="flex flex-col items-center mb-8">
        <UAvatar
          src="https://avatars.githubusercontent.com/u/85014459?v=4"
          :alt="$t('name')"
          size="xl"
          class="mb-4 border-2 border-gray-700 sm:size-2xl"
        />
        <h1 class="text-3xl sm:text-4xl font-bold mb-2 text-gray-200">{{ $t('name') }}</h1>
        <p class="text-lg sm:text-xl text-gray-400">{{ $t('title') }}</p>
      </div>
      
      <div class="space-y-4 sm:space-y-6 text-center">
        <h2 class="text-xl sm:text-2xl font-semibold text-gray-200">{{ $t('greeting') }}</h2>
        <p class="mb-2 sm:mb-4 text-sm sm:text-base" v-html="renderIntro1"></p>
        <p class="text-sm sm:text-base">{{ $t('intro2') }}</p>
        <div class="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-8">
          <UButton
            v-for="link in links"
            :key="link.name"
            :to="link.to"
            :href="link.href"
            :target="link.target"
            :rel="link.rel"
            color="gray"
            variant="ghost"
            size="sm"
            class="transition-all duration-300 hover:bg-gray-800 text-sm sm:text-base"
          >
            {{ $t(link.name) }}
          </UButton>
        </div>
      </div>
      
      <div class="mt-6 sm:mt-8 flex justify-center space-x-2 sm:space-x-4">
        <UButton 
          v-for="social in socials" 
          :key="social.name" 
          :to="social.url" 
          target="_blank" 
          rel="noopener noreferrer"
          color="gray" 
          variant="ghost"
          size="sm"
          class="transition-all duration-300 hover:bg-gray-800"
        >
          <UIcon :name="social.icon" class="text-lg sm:text-xl" />
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'home'
})

const { t } = useI18n()

const renderIntro1 = computed(() => {
  const companyLink = `<a href="https://despatchcloud.com/" target="_blank" rel="noopener noreferrer" class="text-gray-300 hover:text-gray-100 underline">${t('despatchCloud')}</a>`
  return t('intro1', [companyLink])
})

const links = [
  { name: 'about', to: '/about' },
  { name: 'projects.title', to: '/projects' },
  { name: 'bookmarks.title', to: '/bookmarks' },
  { name: 'contact', to: 'mailto:egemenkar@gmail.com', target: '_blank', rel: 'noopener noreferrer' }
]

const socials = [
  { name: 'GitHub', icon: 'i-simple-icons-github', url: 'https://github.com/egemenkar' },
  { name: 'LinkedIn', icon: 'i-simple-icons-linkedin', url: 'https://www.linkedin.com/in/egemen-kar/' }
]
</script>

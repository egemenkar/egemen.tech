<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center p-4 relative"
  >
    <UAvatar
      src="https://avatars.githubusercontent.com/u/85014459?v=4"
      :alt="$t('name')"
      size="3xl"
      class="mb-4"
      :ui="{
        size: {
          '3xl': 'w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56',
        },
      }"
    />
    <h1 class="mt-4 text-4xl font-bold text-gray-100">{{ $t("name") }}</h1>
    <p class="mt-2 text-xl text-gray-400">{{ $t("title") }}</p>
    <div class="mt-6 flex space-x-4">
      <a
        href="https://github.com/egemenkar"
        target="_blank"
        rel="noopener noreferrer"
        class="text-gray-400 hover:text-white transition-colors duration-200"
      >
        <UIcon name="i-simple-icons-github" class="w-6 h-6" />
      </a>
      <a
        href="https://www.linkedin.com/in/egemenkar/"
        target="_blank"
        rel="noopener noreferrer"
        class="text-gray-400 hover:text-white transition-colors duration-200"
      >
        <UIcon name="i-simple-icons-linkedin" class="w-6 h-6" />
      </a>
    </div>

    <p class="mt-8 text-center text-gray-400 max-w-md">
      {{ $t("greeting") }}
    </p>

    <p class="mt-8 text-center text-gray-400 max-w-md">
      {{ $t("intro1") }}
    </p>

    <p class="mt-8 text-center text-gray-400 max-w-md">
      {{ $t("intro2") }}
    </p>

    <!-- Updated floating navigation menu -->
    <nav
      class="mt-12 bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg"
    >
      <ul class="flex space-x-6">
        <li v-for="link in links" :key="link.to" class="relative group">
          <NuxtLink
            :to="localePath(link.to)"
            class="text-gray-300 hover:text-white transition-colors duration-200 flex items-center"
          >
            <UIcon :name="link.icon" class="mr-2" />
            <span class="hidden sm:inline">{{ $t(link.name) }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useLocalePath } from "vue-i18n-routing";

const { t } = useI18n();
const localePath = useLocalePath();

definePageMeta({
  layout: 'home'
})

const links = [
  { name: "about", to: "/about", icon: "i-heroicons-user" },
  { name: "projects.title", to: "/projects", icon: "i-heroicons-code-bracket" },
  { name: "bookmarks.title", to: "/bookmarks", icon: "i-heroicons-bookmark" },
];
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>

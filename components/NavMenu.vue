<script setup>
const links = [{
  label: 'Egemen Kar',
  avatar: {
    src: 'https://avatars.githubusercontent.com/u/85014459?v=4'
  },
  badge: 'Frontend Developer',
  to: '/'
}, {
  label: 'About me',
  icon: 'i-heroicons-identification',
  to: '/about-me'
}, {
  label: 'Projects',
  icon: 'i-heroicons-code-bracket',
  to: '/projects'
}, {
  label: 'Bookmarks',
  icon: 'i-heroicons-bookmark',
  to: '/bookmarks'
}]
</script>

<template>
  <UVerticalNavigation :links="links" class="border-r border-gray-600 h-screen pr-4 py-4" />
</template>

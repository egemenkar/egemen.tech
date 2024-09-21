<template>
    <div class="min-h-screen flex flex-col justify-center items-center p-4 bg-gradient-to-br from-gray-900 to-black text-gray-300">
    <main class="flex-grow flex flex-col justify-center items-center w-full max-w-4xl">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.home-enter-active,
.home-leave-active {
  transition: all 0.5s ease;
}
.home-enter-from,
.home-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
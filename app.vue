<template>
  <div class="custom-scrollbar">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
html, body {
  scrollbar-width: none;  /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
}

html::-webkit-scrollbar, 
body::-webkit-scrollbar { 
  width: 0;
  height: 0;
  display: none;  /* Safari and Chrome */
}

.custom-scrollbar {
  overflow-y: auto;
  scrollbar-width: none;  /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
}

.custom-scrollbar::-webkit-scrollbar { 
  width: 0;
  height: 0;
  display: none;  /* Safari and Chrome */
}
</style>

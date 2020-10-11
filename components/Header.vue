<template>
  <header class="fixed top-0 bg-lightblue w-full max-w-sm h-16 py-4 z-10">
    <div class="relative flex justify-center w-full">
      <h2 class="text-2xl font-semibold text-white">Nuxt-chat-app</h2>
    </div>
    <template v-if="isChatPage">
      <nuxt-link
        to="/"
        class="absolute left-20 flex items-center justify-center no-underline"
      >
        <i class="material-icons text-4xl text-white">chevron_left</i>
      </nuxt-link>
    </template>
  </header>
</template>

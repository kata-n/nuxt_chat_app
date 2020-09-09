<template>
  <teansition appear>
    <div class="z-10 max-w-sm h-screen w-screen fixed top-0 flex flex-col items-center justify-center modal-wrap"
    >

    <slot/>

    <button @click="$emit('closeModal')">
      <i class="material-icons text-white text-5xl">clear</i>
    </button>
    </div>
  </teansition>
</template>
<style>
</style>

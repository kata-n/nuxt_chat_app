<template>
  <div class="bg-white shadow rounded-lg m-4 w-11/12 p-4">
    <form @submit.prevnet="onSubmit">
      <div class="flex justify-center items-center flex-col mt-3">
        <div
          :class="{ 'border border-red-500': form.imageUrl.errorMessage }"
          class="rounded-lg w-32 h-32 bg-gray-200 flex items-center justify-center"
        >
        </div>
      </div>
    </form>
  </div>
</template>

<template>
  <div class="m-4 p-4 bg-white shadow rounded">
    <h2 class="text-2xl text-center text-darkGray">アカウント登録</h2>
    <form>
      <div class="text-2xl text-center text-darkGray">
        <div class="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full border border-gray-400">
          <i class="material-icons text-7xl text-gray">
            person
          </i>
          <input
            ref="image"
            type="file"
            style="display: none"
            accept="image/*"
          />
        </div>
      </div>
    </form>
  </div>
</template>

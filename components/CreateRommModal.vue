<template>
  <div class="bg-white shadow rounded-lg m-4 w-11/12 p-4">
    <form @submit.prevnet="onSubmit">
      <div class="flex justify-center items-center flex-col mt-3">
        <div
          :class="{ 'border border-red-500': form.imageUrl.errorMessage }"
          class="rounded-lg w-32 h-32 bg-gray-200 flex items-center justify-center"
        >
          <template v-if="form.imageUrl.val">
            <img :src="form.imageUrl.val"  @click="selectImage" class="w-32 h-32 object-cover border rounded-lg" alt="">
          </template>
          <template v-else>
            <i @click="selectImage" class="material-icons text-6xl text-gray">
              add_photo_alternate
            </i>
          </template>
          <input
            ref="image"
            @change="onFileSelect"
            type="file"
            style="display: none"
            accept="image/*"
           />
        </div>
        <span
          v-show="form.imageUrl.errorMessage"
          class="text-red text-sm text-center"
        >
          {{ form.imageUrl.errorMessage }}
        </span>
      </div>
      <div class="h-20 mb-4 mt-10">
        <textarea
          v-model="form.name.val"
          @blur="validateName"
          :class="{'border-red-500': form.name.errorMessage}"
          placeholder="部屋の名前を入力しよう"
          class="appearance-none block w-full bg-gray-200 text-darkGray border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
          maxlength="maxlength"
        />
        <span v-show="form.name.errorMessage" class="text-red text-sm">
          {{ form.name.errorMessage }}
        </span>
      </div>
      <div class="flex">
        <button　class="gradation rounded-full p-3 text-white w-full">
          作成
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      form: {
        name: {
          label: '名前',
          val: null,
          errorMessage: null
        },
        imageUrl: {
          label: '画像',
          val: null,
          errorMessage: null
        }
      }
    }
  },

  computed: {
    isValidateError() {
      return this.form.name.errorMessage || this.form.imageUrl.errorMessage
    },
    maxlength() {
      return 35
    }
  },
}
</script>

<template>
  <div class="m-4 p-4 bg-white shadow rounded">
    <h2 class="text-2xl text-center text-darkGray">アカウント登録</h2>
    <form @submit.prevent="onSubmit">
      <div class="text-2xl text-center text-darkGray">
        <div
          class="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full border border-gray-400"
          :class="{ 'border-red-500': form.imageUrl.errorMessage }"
        >
          <template v-if="form.imageUrl.val">
            <img
              :src="form.imageUrl.val"
              class="w-32 h-32 object-cover border rounded-full"
              @click = "selectImage"
              />
          </template>
          <template v-else>
            <i class="material-icons text-7xl text-gray" @click="selectImage">
              person
            </i>
          </template>
          <input
            ref="image"
            type="file"
            style="display: none"
            accept="image/*"
            @change="onSelectFile"
          />
        </div>
        <span v-show="form.imageUrl.errorMessage" class="text-red text-sm">
          {{ form.imageUrl.errorMessage }}
        </span>
      </div>
      <label
        class="block mt-8 mb-2 ml-2 uppercase tracking-wide text-darkGray text-s"
      >
        名前
      </label>
      <div class="h-20 mb-6">
        <input
        　v-model= "form.name.val"
          type="text"
          class="block w-full py-3 px-4 appearance-none bg-gray-200 text-darkGray border rounded leading-tight focus:outline-none focus:bg-white"
          :class="{ 'border-red-500': form.name.errorMessage }"
          @blur="validateName"
        />
        <span v-show="form.name.errorMessage" class="text-red text-sm">
          {{ form.name.errorMessage }}
        </span>
      </div>

      <div class="flex">
        <button
          class="w-full p-3 gradation rounded-full text-white"
        >
          登録
        </button>
      </div>
    </form>
  </div>
</template>
<script>
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
          label: 'アイコン画像',
          val: null,
          errorMessage: null
        }
      }
    }
  },
  methods: {
    selectImage() {
      this.$refs.image.click()
    },
    onSelectFile(e){
      const files = e.tartget.files
      if(files.length === 0) return

      const reader = new FileReader()
      reader.readAsDataURL(files[0])

      reader.addEventListemdner('load',()=> {
        this.upload({
          locallmageFile: file[0]
        })
      })
    },
    async upload({ localImageFile }) {
      const user = await this.$auth()

      //未ログインの場合
      if(!user)this.$router.push('/login')

      //ストレージオブジェクトを作成
      const storageRef = this.$fireStorage.ref()

      //ファイルのパスを設定
      const fileName = `${localImageFile.name}_${uuid()}`
      const imageRef = storageRef.child(
        `images/${user.uid}/${localImageFile.name}`
      )

      //ファイルを適用してファイルアップロード開始
      const snapShot = await imageRef.put(localImageFile)
      this.form.imageUrl.val = await snapShot.ref.getDownloadURL()

      this.validateImageUrl()
    },
    validateName() {
      const { name } = this.form
      const maxLength = 8

      if(!name.val) {
        name.errorMessage = `${name.label}は必須入力項目です`
        return
      }

      if(name.val.length > maxLength) {
        name.errorMessage = `${name.label}は${maxLength}文字以内です。`
        return
      }
      name.errorMessage = null
    },
    validateImageUrl() {
      const { imageUrl } = this.form

      if (!imageUrl.val) {
        imageUrl.errorMessage = `${imageUrl.label}は必須入力項目です`
        return
      }
      //バリデーション
      imageUrl.errorMessage = null
    },
    onSubmit() {
      this.validateName()
      this.validateImageUrl()
    }
  }
}
</script>

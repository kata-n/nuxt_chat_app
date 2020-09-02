<template>
  <div class="m-4 p-4 bg-white shadow rounded">
    <h2 class="text-2xl text-center text-darkGray">アカウント登録</h2>
    <form>
      <div class="text-2xl text-center text-darkGray">
        <div class="flex items-center justify-center w-32 h-32 bg-gray-200 rounded-full border border-gray-400">
          <i class="material-icons text-7xl text-gray" @click="selectImage">
            person
          </i>
          <input
            ref="image"
            type="file"
            style="display: none"
            accept="image/*"
            @change="onSelectFile"
          />
        </div>
      </div>
      <label
        class="block mt-8 mb-2 ml-2 uppercase tracking-wide text-darkGray text-s"
      >
        名前
      </label>
      <div class="h-20 mb-6">
        <input
          type="text"
          class="block w-full py-3 px-4 appearance-none bg-gray-200 text-darkGray border rounded leading-tight focus:outline-none focus:bg-white"
        />
      </div>

      <div class="flex">
        <button
          class="w-full p-3 gradation rounded-full text-white
        "
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
      from: {
        imageUrl: {
          val: null
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
      const imageRef = storageRef.child(
        `images/${user.uid}/${localImageFile.name}`
      )

      //ファイルを適用してファイルアップロード開始
      const snapShot = await imageRef.put(localImageFile)
      this.form.imageUrl.val = await snapShot.ref.getDownloadURL()
    }
  }
}
</script>

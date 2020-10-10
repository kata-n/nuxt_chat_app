<template>
  <div>
    <div>
      <div
        v-for="room in rooms"
        :key="room.id"
        @click="moveToRoompage(room.id)"
        class="bg-white max-w-sm rounded-lg overflow-hidden shadow m-4 mb-5 p-4 h-32"
      >
        <div>
          <img
            :src="room.topimageUrl"
            class="float-left object-cover rounded-lg w-24 h-24 mr-4"
          />
          <p class="font-mono text-darkGray">{{ room.name }}</p>
        </div>
      </div>
    </div>
    <div class="fixes flex justify-end bottom-0 w-full max-w-sm">
      <button @click="openModal">
        <i class="material-icons text-primary text-7xl create-btn gradation">
          サークルに追加
        </i>
      </button>
    </div>
    <ModalBase v-if="isCreateMode" @closeModal="closeModal">
      <CreateRommModal @closeModal="closeModal" />
    </ModalBase>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import ModalBase from '~/components/ModalBase'
import CreateRoomModal from '~/components/CreateRoomModal'

export default {
  components: {
    ModalBase,
    CreateRoomModal
  },

  data() {
    return {
      isCreateMode: false
    }
  },

  methods: {
    openModal() {
      this.isCreateMode = true
    }、
    closeModal() {
      this.isCreateMode = false
    }
  },

  computed: {
    ...mapGetters('rooms',['rooms'])
  }
}
</script>
<style scoped>
.create-btn {
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

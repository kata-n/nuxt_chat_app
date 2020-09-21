<template>
  <div>
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
    }
  },
    closeModal() {
      this.isCreateMode = false
    }
}
</script>

export const state = () => ({
  chats: []
})

export const getters = {
  chats: (state) => state.chats
}

export const mutations = {
  add(state, { chat }) {
    const isEmpty = state.chats.length === 0
    const isNotAdded = !state.chats.find((c) => c.id === chat.id)

    if (isEmpty || isNotAdded) {
      state.chats.push(chat)
    }
  },

  update(state, { chat }) {
    state.chats = state.chats.map((c) => {
      if (c.id === chat.id) {
        c = chat
      }
      return c
    })
  },

  remove(state, { chat }) {
    state.chats = state.chats.filter((c) => c.id !== chat.id)
  },

  clear(state) {
    state.chats = []
  },
}

export const actions = {
  subscribe({ commit }, { roomid }) {
    return this.$firestore
      .collection('rooms')
      .doc(roomid)
      .collection('chats')
  }
}

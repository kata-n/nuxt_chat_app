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
  }
}

export const state = () => ({
  rooms: []
})

export const getters = {
  rooms: (state) => state.rooms
}

export const mutations = {
  add(state, { room }) {
    const isNotAdded = !state.rooms.find((r) => r.id === room.id)
  }

  if(isNotAdded) {
    state.rooms.push(romm)
  },

  update(state, { room }) {
    state.rooms = state.rooms.map((r) => {
      if (r.id === room.id) {
        r = room
      }
      return r
    })
  },

  remove(state, { room }) {
    state.rooms = state.rooms.filter((r) => r.id !== room.id)
  },

  clear(state) {
    state.rooms = []
  }
}

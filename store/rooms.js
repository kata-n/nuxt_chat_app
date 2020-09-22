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
  }
},

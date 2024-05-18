export const PLANTS = "plants"

export default {
  namespaced: true,
  state: {
    plants: [ 
      {
        name: 'Planty',
        image: 'https://media.istockphoto.com/id/1372896722/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B3%D0%BE%D1%80%D1%88%D0%B5%D1%87%D0%BD%D0%BE%D0%B5-%D0%B1%D0%B0%D0%BD%D0%B0%D0%BD%D0%BE%D0%B2%D0%BE%D0%B5-%D1%80%D0%B0%D1%81%D1%82%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D1%8B%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%BD%D0%BE%D0%B5-%D0%BD%D0%B0-%D0%B1%D0%B5%D0%BB%D0%BE%D0%BC-%D1%84%D0%BE%D0%BD%D0%B5.jpg?s=1024x1024&w=is&k=20&c=5ORk78aJ49BvmLBEePnJvQNqYY_u1fxzJS_cCK_RCPw=',
        price: 123,
        id: 1
      },
      {
        name: 'Loolly',
        image: 'https://media.istockphoto.com/id/519900724/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B7%D0%B5%D0%BB%D0%B5%D0%BD%D1%8B%D0%B9-%D0%B3%D0%BE%D1%80%D1%88%D1%91%D1%87%D0%BD%D0%BE%D0%B5-%D1%80%D0%B0%D1%81%D1%82%D0%B5%D0%BD%D0%B8%D0%B5.jpg?s=1024x1024&w=is&k=20&c=LG4oKZWlNCcgptqatH3job8bjY2Pierphc9MeGZ485M=',
        price: 1233,
        id: 2
      },
      {
        name: 'Spotty',
        image: 'https://media.istockphoto.com/id/463123467/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%80%D0%B0%D1%81%D1%82%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B8%D0%B7%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5-%D0%B2-%D0%B3%D0%BE%D1%80%D1%88%D0%BE%D0%BA.jpg?s=1024x1024&w=is&k=20&c=bsctSN_zycWRuMPXymWFxmP5qv2xYCa2SUvblEhqJd4=',
        price: 123,
        id: 3
      },
      {
        name: 'Sally',
        image: 'https://media.istockphoto.com/id/479242890/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B1%D1%80%D0%BE%D0%BC%D0%B5%D0%BB%D0%B8%D1%8F-%D0%B8%D0%B7%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5-%D0%BD%D0%B0-%D0%B1%D0%B5%D0%BB%D0%BE%D0%BC-%D1%84%D0%BE%D0%BD%D0%B5.jpg?s=1024x1024&w=is&k=20&c=vevUIw63Ev3-F2LkyDxeAJ4OgEWx5JReXIpkWq3wzxc=',
        price: 1343,
        id: 4
      },
      {
        name: 'Nora',
        image: 'https://media.istockphoto.com/id/92495527/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B7%D0%B5%D0%BB%D0%B5%D0%BD%D0%BE%D0%B5-%D1%80%D0%B0%D1%81%D1%82%D0%B5%D0%BD%D0%B8%D0%B5.jpg?s=1024x1024&w=is&k=20&c=nGIQPKesorFOPfQgkoZ1VtIVdDH8-8KF9HPJSLsncNA=',
        price: 123,
        id: 5
      },
      {
        name: 'Sqweezy',
        image: 'https://media.istockphoto.com/id/1391600166/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B7%D0%B5%D0%BB%D0%B5%D0%BD%D0%B0%D1%8F-%D0%BA%D0%B0%D0%BB%D0%BB%D0%B0-%D0%BB%D0%B8%D0%BB%D0%B8%D1%8F-%D0%B2-%D0%B3%D0%BE%D1%80%D1%88%D0%BA%D0%B5-%D0%B8%D0%B7%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B0-%D0%BD%D0%B0-%D0%B1%D0%B5%D0%BB%D0%BE%D0%BC-%D1%84%D0%BE%D0%BD%D0%B5-%D1%81-%D0%BE%D0%B1%D1%82%D1%80%D0%B0%D0%B2%D0%BE%D1%87%D0%BD%D1%8B%D0%BC-%D0%BA%D0%BE%D0%BD%D1%82%D1%83%D1%80%D0%BE%D0%BC.jpg?s=1024x1024&w=is&k=20&c=9shOZQQx5mUlQ_pJmM5i16ayJwurMh6Kbmgjz3Of5wo=',
        price: 1213,
        id: 6
      },
      {
        name: 'Morra',
        image: 'https://media.istockphoto.com/id/1278906674/ru/%D1%84%D0%BE%D1%82%D0%BE/monstera-%D0%B2-%D0%B3%D0%BE%D1%80%D1%88%D0%BE%D0%BA-%D0%B8%D0%B7%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D1%8B-%D0%BD%D0%B0-%D0%B1%D0%B5%D0%BB%D0%BE%D0%BC-%D1%84%D0%BE%D0%BD%D0%B5-%D0%BA%D1%80%D1%83%D0%BF%D0%BD%D1%8B%D0%BC-%D0%BF%D0%BB%D0%B0%D0%BD%D0%BE%D0%BC-%D1%82%D1%80%D0%BE%D0%BF%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D1%85-%D0%BB%D0%B8%D1%81%D1%82%D1%8C%D0%B5%D0%B2-%D0%B8%D0%BB%D0%B8-%D0%BA%D0%BE%D0%BC%D0%BD%D0%B0%D1%82%D0%BD%D1%8B%D1%85.jpg?s=1024x1024&w=is&k=20&c=UJbvSWx7wPYYufT2LMz76OT6xFm1Mm1O2Szujl9c9A0=',
        price: 123,
        id: 7
      },
      {
        name: 'Lolina',
        image: 'https://media.istockphoto.com/id/1372896722/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B3%D0%BE%D1%80%D1%88%D0%B5%D1%87%D0%BD%D0%BE%D0%B5-%D0%B1%D0%B0%D0%BD%D0%B0%D0%BD%D0%BE%D0%B2%D0%BE%D0%B5-%D1%80%D0%B0%D1%81%D1%82%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2%D1%8B%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%BD%D0%BE%D0%B5-%D0%BD%D0%B0-%D0%B1%D0%B5%D0%BB%D0%BE%D0%BC-%D1%84%D0%BE%D0%BD%D0%B5.jpg?s=1024x1024&w=is&k=20&c=5ORk78aJ49BvmLBEePnJvQNqYY_u1fxzJS_cCK_RCPw=',
        price: 1134,
        id: 8
      }
    ],
  },
  methods: {
    findMaxId(arr) {
      return arr.reduce((max, item) => {
        return item.id > max ? item.id : max;
      }, 0);
    }
  },
  getters: {
    getPlants: (state) => state.plants,
    getPlantById: (state) => (id) => state.plants.find((plant) => plant.id === id),
    getRandomId: (state) => Math.floor(Math.random() * state.plants.length) + 1,
    getSearchedPlants: (state) => (filterFunction) => state.plants.filter(filterFunction),
  },
  mutations: {
    createPlant: (state, payload) => {
      const lastId = state.plants.reduce((max, item) => {
          return item.id > max ? item.id : max;
        }, 0);
      const plant = {...payload, id: lastId + 1}
      state.plants.push(plant)
      localStorage.setItem(PLANTS, JSON.stringify(state.plants))
    },
    deletePlant: (state, payload) => {
      state.plants = state.plants.filter((product) => product.id != payload.id)
      localStorage.setItem(PLANTS, JSON.stringify(state.plants))
    }
  },
  actions: {
    createPlant: ({ commit }, payload) => {
      commit("createPlant", payload)
    },
    deletePlant: ({ commit }, payload) => {
      commit("deletePlant", payload)
    },
  },
}

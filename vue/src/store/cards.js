import createPersistedState from 'vuex-persistedstate'

export const CARDS = "cards"

const parseDateString = (dateString) => {
  if (!dateString) {
    return null
  }
  const [day, month, year] = dateString.split(".").map(Number)
  return new Date(year, month - 1, day)
}


export default {
  plugins: [createPersistedState()],
  namespaced: true,
  state: {
    cards: [
      {
        id: 1,
        title: 'Nike Revolution 7',
        subtitle: 'Running Shoes',
        description: 'We loaded the Revolution 7 with the sort of soft cushioning and support that might change your running world. Stylish as ever, comfortable when the rubber meets the road and performance-driven for your desired pace, its an evolution of a fan favourite that offers a soft, smooth ride.',
        brand: 'Nike',
        category: 'Shoes',
        price: 100,
        dateCreated: '23.04.2024',
        images: [
          'https://i.pinimg.com/564x/38/71/33/3871331c0fb20896b548ab30d35600aa.jpg',
          'https://img01.ztat.net/article/spp-media-p1/dc0fb6b0392842f9b6996616345da55c/5b08f667d8174cc2889f3334cb79a999.jpg?imwidth=1800&filter=packshot',
          'https://img01.ztat.net/article/spp-media-p1/d0b0c1ac4115455b999587e62435a26e/68f98a196f1c49d680ef4171acbe2f84.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/58a20ccb264b4e59b94630900954e032/4ed8dc189f3744e7a3deb01dcfe6ff42.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/4450f39ce9984972af6695b6a5bd10fa/bf9bd08e7e6b48d39241d5bd7d87f576.jpg?imwidth=1800'
        ],
        sizes: ['40', '41', '42', '43', '44', '45'],
        colors: ['Black', 'White', 'Red', 'Blue'],
        material: 'Synthetic',
        stock: 50,
        sellingPercentage: 10
      },
      {
        id: 2,
        title: 'Adidas Ultraboost 21',
        subtitle: 'Running Shoes',
        description: 'More details about Adidas Ultraboost 21',
        brand: 'Adidas',
        category: 'Shoes',
        price: 120,
        dateCreated: '24.04.2024',
        images: [
          'https://www.jordan2u.com/image/cache/catalog/products/women-air-jordan-12-22676-300x300.jpg',
          'https://img01.ztat.net/article/spp-media-p1/f577dd69b91f4de6b7fe5641d9d6909c/49c15f58b2304157abb19662e0f87079.jpg?imwidth=1800&filter=packshot',
          'https://img01.ztat.net/article/spp-media-p1/2c57517385fd456d952d12c170f19ad2/ff826e1821c948b39a057da7442d9f30.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/2e3fc7fe8fdd4cb7afa05baf1ba5cceb/6189495dcdcf4c5ebe5dfc909a249597.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/f16c57896ecd410ba9fdd51b75c6ed0c/eb3fc0267d1c49b8abef99355faa2074.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/791b981201734c7ca23ecbc215a3fa79/d51e914055334479a4afab7890a9fbe3.jpg?imwidth=1800',
        ],
        sizes: ['40', '41', '42', '43', '44', '45'],
        colors: ['Black', 'White', 'Red', 'Blue'],
        material: 'Textile',
        stock: 60,
        sellingPercentage: -25
      },
      {
        id: 3,
        title: 'Puma Future Rider',
        subtitle: 'Running Shoes',
        description: 'More details about Puma Future Rider',
        brand: 'Puma',
        category: 'Shoes',
        price: 90,
        dateCreated: '25.04.2024',
        images: [
          'https://www.jordan2u.com/image/cache/catalog/products/women-nike-free-run-2-21397-b-1080x1080.jpg',
          'https://img01.ztat.net/article/spp-media-p1/72df5e3f15af4b6988b8b3a640fc87ae/da10563fd4cf48f89788f679dc5c9669.jpg?imwidth=1800&filter=packshot',
          'https://img01.ztat.net/article/spp-media-p1/7153f39389f141c8b2c389210eae79a6/bb12dd4f1dc0456aa16c789cbe26914b.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/2889542147064724a24d63653c8b6c2b/8042d60c504041e7acd36d3c00ad8799.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/0fe4b7dabd43447bb3bc1e9aeb984726/4f89f60082154ffb812ad1e9f3a6dbe5.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/d44c0a01b85d4bb19814398bda16f527/0304df90a0e64f4e90094bb6c1afa0ee.jpg?imwidth=1800',
        ],
        sizes: ['40', '41', '42', '43', '44', '45'],
        colors: ['Black', 'White', 'Red', 'Blue'],
        material: 'Synthetic',
        stock: 70,
        sellingPercentage: 10
      },
      {
        id: 4,
        title: 'Under Armour HOVR Phantom 2',
        subtitle: 'Running Shoes',
        description: 'More details about Under Armour HOVR Phantom 2',
        brand: 'Under Armour',
        category: 'Shoes',
        price: 110,
        dateCreated: '26.04.2024',
        images: [
          'https://www.jordan2u.com/image/cache/catalog/products/women-air-jordan-13-5002-300x300.jpg',
          'https://img01.ztat.net/article/spp-media-p1/26fa9ca09fc14769aa315098e03e3344/d27de6d816eb46af96dfde51d8cef612.jpg?imwidth=1800&filter=packshot',
          'https://img01.ztat.net/article/spp-media-p1/8d01eb6dfc3d4228aea4a5c8393a08cf/d675c03a9e444b4ea5dad1a66310c89e.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/294a98d72835448785cdfbdfa3f4c462/224e8bf40c0047cc86d1da05d6577e0e.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/630bdab2e53740a386fbf42a4ec86bb5/aa7488b5c1e44d6199751650ee714c92.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/f03c466291f641a891acb36a0ab8d7b5/3f9d8c7a8d7e4cad8dbcfc7a5f196200.jpg?imwidth=1800',
        ],
        sizes: ['40', '41', '42', '43', '44', '45'],
        colors: ['Green', 'White', 'Red', 'Blue'],
        material: 'Textile',
        stock: 80,
        sellingPercentage: 10
      },
      {
        id: 5,
        title: 'Reebok Nano X1',
        subtitle: 'Training Shoes',
        description: 'More details about Reebok Nano X1',
        brand: 'Reebok',
        category: 'Shoes',
        price: 130,
        dateCreated: '27.04.2024',
        images: [
          'https://www.jordan2u.com/image/cache/catalog/products/women-air-jordan-future-11-22339-200x200.jpg',
          'https://img01.ztat.net/article/spp-media-p1/08014038fb9f446790b1759a9e5bf5fc/0576096bfcd9417db3a78da69f9fb3c6.jpg?imwidth=1800&filter=packshot',
          'https://img01.ztat.net/article/spp-media-p1/6ad8545f179946a4849476263b25eec0/a5fd47247d80496f9aac62701ef01fd7.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/cf6e47ff876042bd963a6f3327f3bf3d/8ca013b462f542fb9ae1c272793291a0.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/42f6063cdf534282b4ab2e4ebae9e632/fef6c76c07f24968bfcd000c09125e99.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/46680429e6364e139533b803ddad63ac/922d577092364cd49d0d0bb695904236.jpg?imwidth=1800',

        ],
        sizes: ['40', '41', '42', '43', '44', '45'],
        colors: ['Black', 'White', 'Red', 'Blue'],
        material: 'Synthetic',
        stock: 90,
        sellingPercentage: 10
      },
      {
        id: 6,
        title: 'New Balance Fresh Foam 1080v11',
        subtitle: 'Running Shoes',
        description: 'More details about New Balance Fresh Foam 1080v11',
        brand: 'New Balance',
        category: 'Shoes',
        price: 150,
        dateCreated: '28.04.2024',
        images: [
          'https://img01.ztat.net/article/spp-media-p1/3554aa3b55154d388e4fc3d6967a4fe7/ea7d094e3c7045738da68f7369c82a75.jpg?imwidth=1800&filter=packshot',
          'https://img01.ztat.net/article/spp-media-p1/2339a2da36b34f46bead84a1b08cec31/327cd29eb8364ff68e081a035356a9c4.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/f91c0032c247496485fd2636e6b4c31d/4bd22390e9984c52925944d8eecb262a.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/c2b12eab94444774aac41e646b038f1f/0d54dba8b22740c191c00e2dbc5a8a0b.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/cd8c8a7b4acd412393ccba83aa034b43/9383426ba62e4fe7a054951455c6db26.jpg?imwidth=1800',
        ],
        sizes: ['40', '41', '42', '43', '44', '45'],
        colors: ['red', 'White', 'black', 'Blue'],
        material: 'Textile',
        stock: 100,
        sellingPercentage: 10
      },
      {
        id: 7,
        title: 'Asics Gel-Nimbus 23',
        subtitle: 'Running Shoes',
        description: 'More details about Asics Gel-Nimbus 23',
        brand: 'Asics',
        category: 'Shoes',
        price: 160,
        dateCreated: '29.04.2024',
        images: [
          'https://img01.ztat.net/article/spp-media-p1/256b85ba45f04c58952fa1aef3f30a82/dd50d5b3f1194cdabe2b7cda01c8e373.jpg?imwidth=1800&filter=packshot',
          'https://img01.ztat.net/article/spp-media-p1/986dea18399b44b38c9fed3a4ea69775/cd412894d174457cb06699437fea2174.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/1dbae8be95a2448dabf1b96d48d6aa2b/a8fd6731fa5443e8a35a1ba7750afe1f.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/bb7f0aec83c14acaa6d3e5ea77098e43/2793a7ead765461ba429f8d8a3cf855c.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/93eabaff751d45d49d1cdde657594556/7e28f4d0e76f4256879d38ef87d12f4a.jpg?imwidth=1800',

        ],
        sizes: ['40', '41', '42', '43', '44', '45'],
        colors: ['Black', 'White', 'Red', 'Blue'],
        material: 'Synthetic',
        stock: 110,
        sellingPercentage: 10
      },
      {
        id: 8,
        title: 'Adidas MegaBoost',
        subtitle: 'Running Shoes',
        description: 'More details about Brooks Ghost 14',
        brand: 'Brooks',
        category: 'Shoes',
        price: 170,
        dateCreated: '30.04.2024',
        images: [
          'https://img01.ztat.net/article/spp-media-p1/51bc33df4db94b9da89edb593080525a/1d6d83b73113429688b63536c82a6942.jpg?imwidth=762&filter=packshot',
          'https://img01.ztat.net/article/spp-media-p1/ef813a7c6c0146a58525cef3541cc9fe/1b964d1e9fb341d986b65ca63d922aac.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/d6d60c9a1eb4420c828f84fb4e979585/cdc01a564eae4f27b08e7d4cbb152096.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/053ea4b6f30f4e87bef7990de145679d/d88e8ae6ec064a79812609902b2fa06f.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/9ce31a6677ff4f88b77dc91ab2879429/3fd725242f54474fa9b1fa9063386205.jpg?imwidth=1800',
        ],
        sizes: ['40', '41', '42', '43', '44', '45'],
        colors: ['Black', 'White', 'Red', 'Blue'],
        material: 'Textile',
        stock: 120,
        sellingPercentage: 10
      }
      ,
      {
        id: 9,
        title: 'Adidas MegaBoost',
        subtitle: 'Running Shoes',
        description: 'More details about Brooks Ghost 14',
        brand: 'Brooks',
        category: 'Shoes',
        price: 170,
        dateCreated: '30.04.2024',
        images: [
          'https://img01.ztat.net/article/spp-media-p1/51bc33df4db94b9da89edb593080525a/1d6d83b73113429688b63536c82a6942.jpg?imwidth=762&filter=packshot',
          'https://img01.ztat.net/article/spp-media-p1/ef813a7c6c0146a58525cef3541cc9fe/1b964d1e9fb341d986b65ca63d922aac.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/d6d60c9a1eb4420c828f84fb4e979585/cdc01a564eae4f27b08e7d4cbb152096.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/053ea4b6f30f4e87bef7990de145679d/d88e8ae6ec064a79812609902b2fa06f.jpg?imwidth=1800',
          'https://img01.ztat.net/article/spp-media-p1/9ce31a6677ff4f88b77dc91ab2879429/3fd725242f54474fa9b1fa9063386205.jpg?imwidth=1800',
        ],
        sizes: ['40', '41', '42', '43', '44', '45'],
        colors: ['Black', 'White', 'Red', 'Blue'],
        material: 'Textile',
        stock: 120,
        sellingPercentage: 10
      }
    ],
    categoryProperties: {
      'Shoes': ['sizes', 'colors', 'material'],
    }
  },
  getters: {
    getCards: (state) => state.cards,
    getCardByID: (state) => (id) => state.cards.find((card) => card.id === id),
    getRandomID: (state) => Math.floor(Math.random() * state.cards.length) + 1,
    getSearchedCards: (state) => (filterFunction) => state.cards.filter(filterFunction),
    getLatestCards: (state) => state.cards.sort((a, b) => parseDateString(b.dateCreated) - parseDateString(a.dateCreated))
  },
  mutations: {
    createCard: (state, payload) => {
      const card = {...payload, id: state.cards.length + 1}
      state.cards.push(card)
      localStorage.setItem(CARDS, JSON.stringify(state.cards))
    },
    editCard: (state, payload) => {
      state.cards = state.cards.map((c) => (c.id === payload.id ? { ...c, ...payload } : c))
      localStorage.setItem(CARDS, JSON.stringify(state.cards))
    },
    deleteCard: (state, payload) => {
      state.cards = state.cards.filter((card) => card.id != payload.id)
      localStorage.setItem(CARDS, JSON.stringify(state.cards))
    }
  },
  actions: {
    createCard: ({ commit }, payload) => {
      commit("createCard", payload)
    },
    editCard: ({ commit }, payload) => {
      commit("editCard", payload)
    },
    deleteCard: ({ commit }, payload) => {
      commit("deleteCard", payload)
    },
  }
}
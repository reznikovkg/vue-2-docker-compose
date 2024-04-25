export const POSTS = "posts"

const parseDateString = (dateString) => {
  if (!dateString) {
    return null
  }
  const [day, month, year] = dateString.split(".").map(Number)
  return new Date(year, month - 1, day)
}

export default {
  namespaced: true,
  state: {
    posts: [
      {
        id: 1,
        title: 'Title 1',
        subtitle: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet voluptate molestias omnis ut illo id quia dolores',
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet voluptate molestias omnis ut illo id quia dolores',
        author: 'Me',
        dateCreated: '23.04.2024',
        images: [
          'https://mir-cdn.behance.net/v1/rendition/project_modules/2800_opt_1/7f5f4a182511609.652f0055b6913.jpg'
        ]
      },
      {
        id: 2,
        title: 'Title 2',
        subtitle: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet voluptate molestias omnis ut illo id quia dolores',
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet voluptate molestias omnis ut illo id quia dolores',
        author: 'Me',
        dateCreated: '21.04.2024',
        images: [
          'https://vsegda-pomnim.com/uploads/posts/2022-04/1649202285_8-vsegda-pomnim-com-p-priroda-zima-rassvet-foto-10.jpg'
        ]
      },
      {
        id: 3,
        title: 'Title 3',
        subtitle: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet voluptate molestias omnis ut illo id quia dolores',
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet voluptate molestias omnis ut illo id quia dolores',
        author: 'Me',
        dateCreated: '19.04.2024',
        images: [
          'https://vsegda-pomnim.com/uploads/posts/2022-04/1649113640_57-vsegda-pomnim-com-p-khakasiya-dostoprimechatelnosti-prirodi-fo-59.jpg'
        ]
      },
      {
        id: 4,
        title: 'Title 4',
        subtitle: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet voluptate molestias omnis ut illo id quia dolores',
        content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet voluptate molestias omnis ut illo id quia dolores',
        author: 'Me',
        dateCreated: '23.03.2024',
        images: [
          'https://vip-1gl.ru/vipberrrt/10423beautiful_scenery_wallpaper.jpg'
        ]
      },
    ],
  },
  getters: {
    getPosts: (state) => state.posts,
    getPostByID: (state) => (id) => state.posts.find((post) => post.id === id),
    getRandomID: (state) => Math.floor(Math.random() * state.posts.length) + 1,
    getSearchedPosts: (state) => (filterFunction) => state.posts.filter(filterFunction),
    getLatestPosts: (state) => state.posts.sort((a, b) => parseDateString(b.dateCreated) - parseDateString(a.dateCreated))
  },
  mutations: {
    createPost: (state, payload) => {
      const post = {...payload, id: state.posts.length + 1}
      state.posts.push(post)
      localStorage.setItem(POSTS, JSON.stringify(state.posts))
    },
    editPost: (state, payload) => {
      state.posts = state.posts.map((p) => (p.id === payload.id ? { ...p, ...payload } : p))
      localStorage.setItem(POSTS, JSON.stringify(state.posts))
    },
    deletePost: (state, payload) => {
      state.posts = state.posts.filter((product) => product.id != payload.id)
      localStorage.setItem(POSTS, JSON.stringify(state.posts))
    }
  },
  actions: {
    createPost: ({ commit }, payload) => {
      commit("createPost", payload)
    },
    editPost: ({ commit }, payload) => {
      commit("editPost", payload)
    },
    deletePost: ({ commit }, payload) => {
      commit("deletePost", payload)
    },
  }
}

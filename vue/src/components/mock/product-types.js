export const productTypesModel = {
  getList: () =>  [
    {
      id: '1',
      title: 'suspension parts',
      caption: 'the quality is beyound excellence',
      img: '/engine.png'
    },
    {
      id: '2',
      title: 'suspension parts',
      caption: 'the quality is beyound excellence',
      img: '/engine.png'
    },
    {
      id: '3',
      title: 'brake parts',
      caption: 'the quality is beyound excellence',
      img: '/engine.png'
    },
    {
      id: '4',
      title: 'exhaust parts',
      caption: 'the quality is beyound excellence',
      img: '/engine.png'
    },
    {
      id: '5',
      title: 'steering parts',
      caption: 'the quality is beyound excellence',
      img: '/engine.png'
    },
    {
      id: '6',
      title: 'transmission parts',
      caption: 'the quality is beyound excellence',
      img: '/engine.png'
    },
    {
      id: '7',
      title: 'body kits',
      caption: 'the quality is beyound excellence',
      img: '/engine.png'
    },
    {
      id: '8',
      title: 'motor oil',
      caption: 'the quality is beyound excellence',
      img: '/engine.png'
    },
  ],
  getOne: (id) => {
    return productTypesModel.getList().find((el) => el.id === id)
  }
}

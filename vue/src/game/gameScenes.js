export default {
  room: {
    id: 'room',
    background: require('@/assets/room-bg.png'),
    spots: [
      {
        id: 'door',
        type: 'door',
        x: '35%',
        y: '17%',
        width: 180,
        height: 300,
        requires: 'key',
        targetScene: 'hallway',
        description: 'Входная дверь. Она заперта. Кажется, где-то лежал запасной ключ...',
        successMessage: 'Вы перешли в коридор',
        isOpen: false
      },
      {
        id: 'mail',
        type: 'container',
        x: '62%',
        y: '43%',
        width: 150,
        height: 70,
        description: 'Почтовый ящик',
        rewards: {
          id: 'list',
          name: 'Рекламные листовки',
          image: require('@/assets/items/key.png')
        }
      },
      {
        id: 'flowerpot',
        type: 'container',
        x: '20%',
        y: '70%',
        width: 80,
        height: 92,
        description: 'Цветочный горшок',
        rewards: {
          id: 'key',
          name: 'Ключ от дома',
          image: require('@/assets/items/key.png'),
          description: 'Запасной ключ'
        }
      },
      {
        id: 'ring',
        type: 'container',
        x: '56%',
        y: '25%',
        width: 20,
        height: 45,
        description: 'Дверной звонок'
      },
      {
        id: 'carpet',
        type: 'container',
        x: '30%',
        y: '85%',
        width: 260,
        height: 66,
        description: 'Под ковриком пусто.'
      },
    ]
  },
  hallway: {
    id: 'hallway',
    background: require('@/assets/hallway-bg.png'),
    spots: [
      {
        id: 'exit-door',
        type: 'door',
        x: '74%',
        y: '18%',
        width: 59,
        height: 370,
        requires: null,
        targetScene: 'room',
        description: 'Дверь на улицу',
        successMessage: 'Вы вышли из дома',
        isOpen: true
      },
      {
        id: 'mirror',
        type: 'container',
        x: '87%',
        y: '25%',
        width: 70,
        height: 300,
        description: 'Зеркало со стикером'
      },
      {
        id: 'wardrobe',
        type: 'container',
        x: '8%',
        y: '17%',
        width: 210,
        height: 370,
        description: 'Шкаф',
        rewards: {
          id: 'case',
          name: 'Рюкзак',
          image: require('@/assets/items/key.png'),
          description: 'Забытый рюкзак'
        }
      }
    ]
  }
};
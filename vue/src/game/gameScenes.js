export default {
  house: {
    id: 'house',
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
        targetScene: 'house',
        description: 'Дверь на улицу',
        successMessage: 'Вы вышли из дома',
        isOpen: true
      },
      {
        id: 'kitchen-door',
        type: 'door',
        x: '36%',
        y: '8%',
        width: 90,
        height: 300,
        requires: null,
        targetScene: 'kitchen',
        description: 'Проход на кухню',
        successMessage: 'Вы вошли в кухню',
        isOpen: true
      },
      {
        id: 'room-door',
        type: 'door',
        x: '50%',
        y: '8%',
        width: 145,
        height: 250,
        requires: null,
        targetScene: 'bedroom',
        description: 'Дверь в спальню',
        successMessage: 'Вы вошли в спальню',
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
        id: 'board',
        type: 'info',
        x: '95%', y: '56%',
        width: 25,
        height: 35,
        messages: [
          'Еда в шкафу',
          'Миска на кухне',
          'Кот под кроватью'
        ]
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
          id: 'food',
          name: 'корм',
          image: require('@/assets/items/key.png'),
          description: 'Кошачья еда'
        }
      }
    ]
  },
  bedroom: {
    id: 'bedroom',
    background: require('@/assets/bedroom.png'),
    spots: [
      {
        id: 'hallway-door',
        type: 'door',
        x: '74%',
        y: '18%',
        width: 59,
        height: 370,
        requires: null,
        targetScene: 'hallway',
        description: 'Дверь в коридор',
        successMessage: 'Вы вышли в коридор',
        isOpen: true
      },
      {
        id: 'bed',
        type: 'container',
        x: '4%',
        y: '48%',
        width: 359,
        height: 170,
        requires: null,
        description: 'Кровать'
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
        id: 'board-room',
        type: 'info',
        x: '93%', y: '56%',
        width: 25,
        height: 35,
        messages: [
          'Кот любит играть с бумагой'
        ]
      },
      {
        id: 'cat',
        type: 'mechanism',
        x: '30%',
        y: '60%',
        width: 100,
        height: 80,
        requires: 'list',
        description: 'Кот спит под кроватью',
        successMessage: 'Кот играет с бумагой!',
        setFlags: ['catPlayed']
      }
    ]
  },
  kitchen: {
    id: 'kitchen',
    background: require('@/assets/kitchen.png'),
    spots: [
      {
        id: 'hallway-door',
        type: 'door',
        x: '74%',
        y: '18%',
        width: 59,
        height: 370,
        requires: null,
        targetScene: 'hallway',
        description: 'Дверь в коридор',
        successMessage: 'Вы вышли в коридор',
        isOpen: true
      },
      {
        id: 'dish',
        type: 'mechanism',
        x: '3%',
        y: '80%',
        width: 50,
        height: 50,
        requires: 'food',
        description: 'Миска для корма',
        successMessage: 'Вы покормили кота!',
        setFlags: ['catFed'],
        winCondition: ['catFed', 'catPlayed']
      }
    ]
  }
};
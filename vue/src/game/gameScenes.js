export default {
  items: {
    key: {
      id: "key",
      name: "Ключ от дома",
      description: "Запасной ключ под горшком",
      image: require("@/assets/items/door-key.png"),
      canTake: true,
      singleUse: true
    },
    list: {
      id: "list",
      name: "Рекламные листовки",
      description: "Исписанные листы",
      image: require("@/assets/items/paper.png"),
      canTake: true,
      singleUse: false
    },
    food: {
      id: "food",
      name: "Корм для кота",
      description: "Пакет с кошачьим кормом",
      image: require("@/assets/items/food.png"),
      canTake: true,
      singleUse: true
    },
    toy: {
      id: "toy",
      name: "Игрушка для кота",
      description: "Самодельная игрушка из бумаги",
      image: require("@/assets/items/paper.png"),
      canTake: true,
      singleUse: false
    },
    scissors: {
      id: "scissors",
      name: "Ножницы",
      description: "Кухонные ножницы",
      image: require("@/assets/items/key.png"),
      canTake: true,
      singleUse: false
    }
  },

  craftingRecipes: [
    {
      components: ["list", "scissors"],
      result: "toy",
      successMessage: "Вы сделали игрушку для кота!",
      failMessage: "Неудачная попытка создать игрушку"
    }
  ],

  scenes: {
    house: {
      id: "house",
      background: require("@/assets/room-bg.png"),
      spots: [
        {
          id: "door",
          type: "door",
          x: "35%",
          y: "17%",
          width: 180,
          height: 300,
          requiredItem: "key",
          description: "Входная дверь. Она заперта. Кажется, где-то лежал запасной ключ...",
          action: {
            type: "changeScene",
            target: "hallway",
            message: "Вы перешли в коридор",
            flags: {
              set: ["doorUnlocked"]
            }
          },
          checkFlags: ["doorUnlocked"]
        },
        {
          id: "mail",
          type: "container",
          x: "62%",
          y: "43%",
          width: 150,
          height: 70,
          description: "Почтовый ящик",
          action: {
            type: "giveItem",
            item: "list",
            message: "Вы нашли рекламные листовки!"
          }
        },
        {
          id: "flowerpot",
          type: "container",
          x: "20%",
          y: "70%",
          width: 80,
          height: 92,
          description: "Цветочный горшок",
          action: {
            type: "giveItem",
            item: "key",
            message: "Вы нашли ключ под горшком!"
          }
        },
        {
          id: "ring",
          type: "container",
          x: "56%",
          y: "25%",
          width: 20,
          height: 45,
          description: "Дверной звонок"
        },
        {
          id: "carpet",
          type: "container",
          x: "30%",
          y: "85%",
          width: 260,
          height: 66,
          description: "Коврик.",
          action: {
            type: "giveItem",
            item: "scissors",
            message: "Вы нашли ножницы под ковриком!"
          }
        }
      ]
    },
    hallway: {
      id: "hallway",
      background: require("@/assets/hallway-bg.png"),
      spots: [
        {
          id: "exit-door",
          type: "door",
          x: "74%",
          y: "18%",
          width: 59,
          height: 370,
          description: "Дверь на улицу",
          action: {
            type: "changeScene",
            target: "house",
            message: "Вы вышли из дома"
          }
        },
        {
          id: "kitchen-door",
          type: "door",
          x: "36%",
          y: "8%",
          width: 90,
          height: 300,
          description: "Проход на кухню",
          action: {
            type: "changeScene",
            target: "kitchen",
            message: "Вы вошли в кухню"
          }
        },
        {
          id: "room-door",
          type: "door",
          x: "50%",
          y: "8%",
          width: 145,
          height: 250,
          description: "Дверь в спальню",
          action: {
            type: "changeScene",
            target: "bedroom",
            message: "Вы вошли в спальню"
          }
        },
        {
          id: "mirror",
          type: "container",
          x: "87%",
          y: "25%",
          width: 70,
          height: 300,
          description: "Зеркало со стикером"
        },
        {
          id: "board",
          type: "info",
          x: "95%",
          y: "56%",
          width: 25,
          height: 35,
          description: "Доска с заметками",
          messages: [
            "Еда в шкафу",
            "Миска на кухне",
            "Кот под кроватью"
          ]
        },
        {
          id: "wardrobe",
          type: "container",
          x: "8%",
          y: "17%",
          width: 210,
          height: 370,
          description: "Шкаф",
          action: {
            type: "giveItem",
            item: "food",
            message: "Вы нашли кошачий корм!"
          }
        }
      ]
    },
    bedroom: {
      id: "bedroom",
      background: require("@/assets/bedroom.png"),
      spots: [
        {
          id: "hallway-door",
          type: "door",
          x: "74%",
          y: "18%",
          width: 59,
          height: 370,
          description: "Дверь в коридор",
          action: {
            type: "changeScene",
            target: "hallway",
            message: "Вы вышли в коридор"
          }
        },
        {
          id: "bed",
          type: "info",
          x: "4%",
          y: "48%",
          width: 359,
          height: 170,
          description: "Кровать",
          messages: [
            "Заправленная кровать"
          ]
        },
        {
          id: "mirror",
          type: "info",
          x: "87%",
          y: "25%",
          width: 70,
          height: 300,
          description: "Зеркало со стикером",
          messages: [
            "Зеркало со стикером"
          ]
        },
        {
          id: "board-room",
          type: "info",
          x: "93%",
          y: "56%",
          width: 25,
          height: 35,
          description: "Доска в спальне",
          messages: [
            "Кот любит играть с бумагой"
          ]
        },
        {
          id: "cat",
          type: "mechanism",
          x: "30%",
          y: "60%",
          width: 100,
          height: 80,
          requiredItem: "toy",
          description: "Кот спит под кроватью",
          action: {
            type: "setFlags",
            flags: ["catPlayed"],
            removeItem: "toy",
            message: "Кот играет с бумагой!"
          }
        }
      ]
    },
    kitchen: {
      id: "kitchen",
      background: require("@/assets/kitchen.png"),
      spots: [
        {
          id: "hallway-door",
          type: "door",
          x: "74%",
          y: "18%",
          width: 59,
          height: 370,
          description: "Дверь в коридор",
          action: {
            type: "changeScene",
            target: "hallway",
            message: "Вы вышли в коридор"
          }
        },
        {
          id: "dish",
          type: "mechanism",
          x: "3%",
          y: "80%",
          width: 50,
          height: 50,
          requiredItem: "food",
          description: "Миска для корма",
          action: {
            type: "setFlags",
            flags: ["catFed"],
            removeItem: "food",
            winCondition: ["catFed", "catPlayed"],
            message: "Вы покормили кота!"
          }
        }
      ]
    }
  },

  dialogs: {
    default: {
      title: "Информация",
      buttons: [{ text: "OK", action: "close" }]
    },
    itemTaken: {
      title: "Предмет получен",
      buttons: [{ text: "Понятно", action: "close" }]
    },
    gameComplete: {
      title: "Поздравляем!",
      message: "Вы прошли игру!",
      buttons: [
        { text: "Начать заново", action: "restartGame" },
        { text: "Осмотреться", action: "close" }
      ]
    }
  }
};

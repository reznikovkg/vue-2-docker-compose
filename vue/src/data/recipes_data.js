export default [
    {
      id: 1,
      name: 'Греческий салат с маслинами',
      dish_id: 1,
      cover: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy9yZWNpcGVzLzEyOTA1NS9jb3ZlcnMvM1o3U0FxLmpwZWc.webp',
      description: 'Греческий салат, приготовленный с сыром Фета это лучик солнца в холодный зимний вечер.',
      portions: 2,
      time: 30,
      ingredients: [
        {
          ingredient_id: 1,
          amount: 0.5
        },
        {
          ingredient_id: 2,
          amount: 200
        },
      ],
      preparation_step: 'Промойте помидоры, огурцы, листья салата и перец. Маслины из консервной банки переложите в тару. Достаньте из упаковки сыр и положите в блюдце. В отдельную тару насыпьте соль и орегано сухой. В стакан налейте масло.',
      steps: [
        {
          img: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy9yZWNpcGVzLzEyOTA1NS9zdGVwcy8zTEJHWVkuanBlZw.webp',
          description: 'Перец, огурцы, помидоры, салат помойте и высушите. Помидоры и огурец нарежьте кусочками, половину перца очистите и нарежьте кубиками.'
        },
        {
          img: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy9yZWNpcGVzLzEyOTA1NS9zdGVwcy8zOWtObVQuanBlZw.webp',
          description: 'Лук очистите и нарежьте полукольцами. Листья салата порвите руками и выложите на тарелку.'
        },
        {
          img: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy9yZWNpcGVzLzEyOTA1NS9zdGVwcy8zQUhlZTcuanBlZw.webp',
          description: 'Сверху выложите помидоры, огурцы, сладкий перец и лук, посолите. Разложите между овощами маслины и сыр, посыпьте орегано. Полейте сверху соком и оливковым маслом.'
        }
      ],
      presentation_step: null,
    },
    {
      id: 2,
      name: 'Морковный суп-пюре',
      dish_id: 2,
      cover: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDI0MDkyMS9Kd3BMSncuanBlZw.webp',
      description: 'краткое описание рецепта 2',
      portions: 3,
      time: 40,
      ingredients: [
        {
          ingredient_id: 1,
          amount: 0.3
        },
        {
          ingredient_id: 3,
          amount: 2
        },
      ],
      preparation_step: 'Помойте и почистите лук, картофель и морковь. Подготовьте сковороду, кастрюлю и погружной блендер.',
      steps: [
        {
          img: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDI0MDkyMS8zZkZ3NVAuanBlZw.webp',
          description: 'Нашинкуйте лук полукольцами. Нарежьте картофель и морковь полукруглыми ломтиками. Разогрейте на среднем огне сковороду с растительным маслом. Обжарьте на ней лук, помешивая, 2-3 минуты до золотистого цвета.'
        },
        {
          img: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDI0MDkyMS80QjIybXkuanBlZw.webp',
          description: 'Переложите обжаренный лук в кастрюлю, положите к нему картофель и морковь. Налейте в кастрюлю воду и поставьте на сильный огонь. Доведите воду до кипения и уменьшите огонь до среднего. Отварите овощи до готовности в течение 20-25 минут.'
        },
        {
          img: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDI0MDkyMS8zckxya2QuanBlZw.webp',
          description: 'Снимите кастрюлю с огня, дайте овощам в бульоне немного остыть. Перебейте их блендером до однородной пюреобразной консистенции. Приправьте суп солью и перцем, хорошо перемешайте.'
        }
      ],
      presentation_step: 
      {
        img: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDI0MDkyMS96dHhiRW4uanBlZw.webp',
        description: 'Украсьте морковный суп-пюре тыквенными семечками, перцем чили и базиликом.'
      }
    },
    {
      id: 3,
      name: 'Паста с томатами в собственном соку',
      dish_id: 3,
      cover: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDI0MDgwOS80N1lGYXIuanBlZw.webp',
      description: 'Эта паста готовится буквально за 15 минут.',
      portions: 2,
      time: 15,
      ingredients: [
        {
          ingredient_id: 2,
          amount: 250
        },
        {
          ingredient_id: 3,
          amount: 4
        },
        {
          ingredient_id: 4,
          amount: 150
        },
        {
          ingredient_id: 5,
          amount: 3
        },
      ],
      preparation_step: null,
      steps: [
        {
          img: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDI0MDgwOS90VDR0VU0uanBlZw.webp',
          description: 'Вскипятите воду в кастрюле. Добавьте соль. Положите спагетти в кипяток. Аккуратно перемешайте, чтобы макароны не прилипли ко дну. Варите до состояния аль денте.'
        },
        {
          img: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDI0MDgwOS8zd1B0amYuanBlZw.webp',
          description: 'В это время нарежьте репчатый лук полукольцами.Разогрейте в сковороде растительное масло на среднем огне. Обжарьте лук в течение 2-3 минут, часто помешивая.'
        },
        {
          img: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDI0MDgyNC80QVZoVWcuanBlZw.webp',
          description: 'Положите в сковороду томаты в собственном соку. Влейте стакан воды. Перемешайте, тушите 2-3 минуты. Приправьте томаты черным молотым перцем.'
        },
        {
          img: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDI0MDgwOS9FS2pnOHUuanBlZw.webp',
          description: 'Откиньте спагетти на дуршлаг, чтобы стекла вода. Переложите спагетти в сковороду и хорошенько перемешайте ее содержимое. Подержите пасту на плите еще 2-3 минуты, чтобы спагетти пропитались соусом.'
        }
      ],
      presentation_step: 
      {
        img: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDI0MDgyNC8zRGFNVVAuanBlZw.webp',
        description: 'Подайте пасту с томатами, украсив порцию листочками базилика или сыром моцарелла.'
      }
    },
    {
      id: 4,
      name: 'Ночная овсянка с йогуртом',
      dish_id: 4,
      cover: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDIzMTIyMi8zcFdWV3QuanBlZw.webp',
      description: 'краткое описание рецепта 4',
      portions: 1,
      time: 720,
      ingredients: [
        {
          ingredient_id: 3,
          amount: 300
        },
        {
          ingredient_id: 4,
          amount: 350
        },
        {
          ingredient_id: 5,
          amount: 2
        },
      ],
      preparation_step: 'Помойте и очистите банан. Подготовьте простерилизованную банку.',
      steps: [
        {
          img: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDIzMTIyMi8zMnpRQkouanBlZw.webp',
          description: 'Нарежьте кружочками банан. Выложите половину первым слоем в банку.'
        },
        {
          img: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDIzMTIyMi9ha2lmaGguanBlZw.webp',
          description: 'Насыпьте половину овсяных хлопьев, слегка посолите. Залейте половиной йогурта.'
        },
        {
          img: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDIzMTIyMi9mQ0Q1eGMuanBlZw.webp',
          description: 'Повторите слои. Закройте банку крышкой. Уберите в холодильник на 8-12 часов или на ночь.'
        }
      ],
      presentation_step: 
      {
        img: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDIzMTIyMi8za3ZDWXQuanBlZw.webp',
        description: 'Украсьте овсянку ягодами клубники и подайте на стол.'
      }
    },
    {
      id: 5,
      name: 'Рецепт со всеми игредиентами',
      dish_id: 5,
      cover: 'https://sun9-77.userapi.com/impg/4fMiOVKsG5HiHUxtesNs5_M7VHxypnmrHagyTw/Q2T79RYScIw.jpg?size=720x785&quality=96&sign=62a447417312edf97bb8a78a314e9324&type=album',
      description: 'Экспериментальный рецепт для регулировки порция-игредиент',
      portions: 1,
      time: 0,
      ingredients: [
        {
          ingredient_id: 1,
          amount: 0.5
        },
        {
          ingredient_id: 2,
          amount: 200
        },
        {
          ingredient_id: 3,
          amount: 300
        },
        {
          ingredient_id: 4,
          amount: 350
        },
        {
          ingredient_id: 5,
          amount: 2
        },
        {
          ingredient_id: 6,
          amount: 1
        }
      ],
      preparation_step: 'Have fun',
      steps: [
        {
          img: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDIzMTIyMi8zMnpRQkouanBlZw.webp',
          description: 'Нарежьте кружочками банан. Выложите половину первым слоем в банку.'
        },
        {
          img: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDIzMTIyMi9ha2lmaGguanBlZw.webp',
          description: 'Насыпьте половину овсяных хлопьев, слегка посолите. Залейте половиной йогурта.'
        },
        {
          img: 'https://cdn.food.ru/unsigned/fit/640/480/ce/0/czM6Ly9tZWRpYS9waWN0dXJlcy8yMDIzMTIyMi9mQ0Q1eGMuanBlZw.webp',
          description: 'Повторите слои. Закройте банку крышкой. Уберите в холодильник на 8-12 часов или на ночь.'
        }
      ],
      presentation_step: null
    }
  ]
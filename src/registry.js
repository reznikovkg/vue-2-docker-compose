import {Bait, Line, Lure, Reel, Rod} from "./classes/item.js";

export const FISHES = [
    { name: "Скумбрия", maxWeight: 1.5, type: "herbivorus", biome: ["sea"], pricePerKg: 12 },
    { name: "Сом", maxWeight: 35, type: "predator", biome: ["sea", "river", "swamp"], pricePerKg: 20 },
    { name: "Карась", maxWeight: 2, type: "omnivorous", biome: ["river", "swamp"], pricePerKg: 8 },
    { name: "Щука", maxWeight: 20, type: "predator", biome: ["river", "swamp"], pricePerKg: 18 },
    { name: "Лещ", maxWeight: 5, type: "omnivorous", biome: ["river", "swamp"], pricePerKg: 10 },
    { name: "Окунь", maxWeight: 2, type: "predator", biome: ["river"], pricePerKg: 11 },
    { name: "Сельдь", maxWeight: 1.3, type: "herbivorus", biome: ["sea"], pricePerKg: 9 },
    { name: "Толстолобик", maxWeight: 35, type: "herbivorus", biome: ["river", "swamp"], pricePerKg: 14 },
    { name: "Форель", maxWeight: 7, type: "predator", biome: ["river"], pricePerKg: 25 },
    { name: "Тунец", maxWeight: 100, type: "predator", biome: ["sea"], pricePerKg: 40 },
    { name: "Сазан", maxWeight: 25, type: "omnivorous", biome: ["river"], pricePerKg: 13 },
    { name: "Краснопёрка", maxWeight: 1.8, type: "herbivorus", biome: ["river"], pricePerKg: 7 }
];

export const ITEMS = [
    new Bait({ name: "Конфета", image: "candy", price: 80, effectiveness: 0.8, type: "omnivorous" }),
    new Bait({ name: "Хлебный мякиш", description: "Простой и бесплатный вариант наживки. Эффективен для травоядной рыбы, но быстро размокает.", image: "bread", price: 0, effectiveness: 0.3, type: "herbivorus"}),
    new Bait({ name: "Тесто", image: "dough", price: 10, effectiveness: 0.5, type: "herbivorus" }),
    new Bait({ name: "Червь", description: "Классика рыбалки, эффективен для всех видов рыб.", image: "worm", price: 80, effectiveness: 0.7, type: "omnivorous" }),
    new Bait({ name: "Живец", image: "fish", price: 100, effectiveness: 0.7, type: "predator",  }),
    new Reel({ name: "Кусок доски", description: "Вместо катушки, зато бесплатно.", image: "reel-basic", price: 0, timeLimit: 10, handleWeight: 10 }),
    new Reel({ name: "Катушка", description: "Обычная металлическая катушка, классика рыбалки.", image: "reel-advanced", price: 500, timeLimit: 20, handleWeight: 30 }),
    new Reel({ name: "Продвинутая катушка", description: "Катушка с современным поворотным механизмом.", image: "reel-pro", price: 1500, timeLimit: 25, handleWeight: 100 }),
    new Rod({ name: "Деревянная удочка", description: "Какая-то палка найденная в лесу, очень хрупкая.", image: "rod-basic", baseDelay: 1500, price: 0, handleWeight: 10 }),
    new Rod({ name: "Пластиковая удочка", description: "Стандартная удочка для рыбалки.", image: "rod-advanced", price: 1000, baseDelay: 2000, handleWeight: 25 }),
    new Rod({ name: "Удочка из композитного материала",  description: "Удочка для истинных рыбаков, выдерживает серьёзные нагрузки.", image: "rod-pro", baseDelay: 2500, price: 5000, handleWeight: 100 }),
    new Line({ name: "Нитка", description: "Нитки вырванные из старой одежды. Можно использовать в качестве лески.", price: 0, handleWeight: 4, image: "string-basic" }),
    new Line({ name: "Леска", description: "Обычная серая леска, ничего особенного", price: 10, handleWeight: 10, image: "string-basic" }),
    new Line({ name: "Продвинутая леска", description: "Леска которая способна выдерживать более сильные нагрузки.", price: 100, handleWeight: 50, image: "string-advanced" }),
    new Line({ name: "Леска из углеродных нанотрубок", description: "Леска нового поколения, способна выдерживать очень высокие нагрузки.",  price: 240, handleWeight: 200, image: "string-pro" }),
    new Lure(),
];
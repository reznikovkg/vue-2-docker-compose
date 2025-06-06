export default {
    modal: {
        title: "Настройки конфиденциальности",
        description: "Мы используем cookies для улучшения работы сайта...",
        saveButton: "Сохранить настройки",
        acceptAllButton: "Принять все",
        rejectAllButton: "Отклонить все",
        showOnFirstVisit: true
    },

    sections: [
        {
            id: "essential",
            title: "Обязательные файлы cookie",
            description: "Эти файлы необходимы для работы сайта",
            required: false,
            items: [
                {
                    id: "security",
                    title: "Безопасность",
                    description: "Защита от вредоносных атак",
                    enabled: false,
                },
                {
                    id: "session",
                    title: "Сессии",
                    description: "Хранение данных сессии пользователя",
                    enabled: false
                }
            ]
        },
        {
            id: "analytics",
            title: "Аналитика",
            description: "Помогают нам понять, как используется сайт",
            required: false,
            items: [
                {
                    id: "google_analytics",
                    title: "Google Analytics",
                    description: "Сбор статистики посещений",
                    enabled: false
                },
                {
                    id: "yandex_metrika",
                    title: "Яндекс.Метрика",
                    description: "Анализ поведения пользователей",
                    enabled: false
                }
            ]
        },
        {
            id: "marketing",
            title: "Маркетинг",
            description: "Используются для персонализации рекламы",
            required: false,
            items: [
                {
                    id: "facebook_pixel",
                    title: "Facebook Pixel",
                    description: "Отслеживание конверсий",
                    enabled: false
                }
            ]
        }
    ]
};
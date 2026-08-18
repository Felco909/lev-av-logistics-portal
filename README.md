# LEV&AV Logistics Portal

Сайт-визитка транспортной компании **ООО «ЛЕВ ЭНД АВ» (LEV&AV LLC)** — международные грузоперевозки собственным и привлечённым автопарком по России, СНГ, Европе и Китаю. Одностраничный лендинг на React с историей компании, автопарком, географией направлений, официальными реквизитами и формой заявки на расчёт ставки.

## Стек

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 6](https://vitejs.dev/) — сборка и dev-сервер
- [Tailwind CSS 4](https://tailwindcss.com/)
- [motion](https://motion.dev/) — анимации
- [d3-geo / d3-selection / d3-zoom](https://d3js.org/) — интерактивная карта направлений
- [lucide-react](https://lucide.dev/) — иконки

Бэкенда нет — сайт полностью статический.

## Структура

```
src/
  components/     секции сайта (Hero, FleetSection, GeographySection, RequisitesSection, ...)
  components/map/ интерактивная логистическая карта на d3
  context/        LanguageContext — переключение RU/EN
  data/           статические данные (направления, парк, геослои)
  utils/          геовычисления (дуги маршрутов)
```

## Запуск локально

**Требования:** Node.js.

```bash
npm install
npm run dev       # dev-сервер на http://localhost:3000
```

## Прочие команды

```bash
npm run build      # production-сборка в dist/
npm run preview    # локальный просмотр production-сборки
npm run lint        # проверка типов (tsc --noEmit)
npm run clean       # удалить dist/
```

## Заявки с сайта

Форма обратной связи (кнопка «Связаться») не использует бэкенд: при отправке открываются диплинки в Telegram и WhatsApp с предзаполненным текстом заявки; если браузер блокирует всплывающие окна — используется резервный переход на `mailto:`.

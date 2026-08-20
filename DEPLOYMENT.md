# Деплой

Сайт одновременно опубликован на двух независимых бесплатных хостингах, из одного и того же репозитория и одной и той же ветки `master`.

## Production-адреса

| | URL | Статус |
|---|---|---|
| **Cloudflare Workers** (основной) | https://www.levavlogistics.workers.dev | ✅ актуальный |
| **GitHub Pages** (резервный) | https://felco909.github.io/lev-av-logistics-portal/ | ✅ актуальный, не менялся |

## Как это устроено

Один и тот же исходный код собирается по-разному под каждый хостинг — см. `vite.config.ts`:

- **GitHub Pages** обслуживает репозиторий как «сайт проекта» в подпапке `/lev-av-logistics-portal/`, поэтому пути ассетов должны содержать этот префикс.
- **Cloudflare Workers** обслуживает сайт с корня домена, поэтому пути ассетов должны начинаться с `/`.

Переключение между ними — через переменную окружения `DEPLOY_TARGET`:

```
DEPLOY_TARGET не задана (по умолчанию) → base: '/lev-av-logistics-portal/'  (GitHub Pages)
DEPLOY_TARGET=cloudflare               → base: '/'                          (Cloudflare)
```

## Ручной деплой

### На Cloudflare Workers

```bash
npm run deploy:cloudflare
```

Это выполнит `npm run build:cloudflare` (сборка с правильным `base`) и сразу `wrangler deploy`. Требует, чтобы `wrangler` был авторизован локально (`npx wrangler login`, один раз).

Отдельно, без деплоя — только собрать:
```bash
npm run build:cloudflare
```

### На GitHub Pages

Ничего вручную делать не нужно — см. автодеплой ниже.

## Автодеплой (GitHub Actions)

При каждом `git push` в `master` запускаются **два независимых** workflow, оба стабильно работают:

1. **`.github/workflows/deploy.yml`** → GitHub Pages.
2. **`.github/workflows/deploy-cloudflare.yml`** → Cloudflare Workers, напрямую через `npx wrangler@4.124.0 deploy` (без обёртки `cloudflare/wrangler-action` — от неё отказались, т.к. её вывод в логах GitHub сворачивался в группы, из-за которых было невозможно прочитать реальную ошибку через веб-интерфейс). Требует секрет репозитория `CLOUDFLARE_API_TOKEN`.

   **Важно про секрет**: он должен быть добавлен именно в
   `Settings → Secrets and variables → Actions → Repository secrets`.
   В этом репозитории уже существует отдельное GitHub Environment `github-pages` (создалось автоматически при первой настройке GitHub Pages) — если добавить секрет туда (страница `Settings → Environments`), workflow для Cloudflare его не увидит, т.к. не объявляет `environment: github-pages`. Именно это было причиной 6 подряд неудачных прогонов при первой настройке — секрет лежал не в том месте.

   Ручной деплой (`npm run deploy:cloudflare`) остаётся рабочим способом на случай, если автодеплой понадобится продублировать вручную.

## Конфигурация Cloudflare Workers

Файл `wrangler.jsonc`:
```jsonc
{
  "name": "www",                 // имя воркера — определяет URL: <name>.levavlogistics.workers.dev
  "compatibility_date": "2026-08-20",
  "assets": { "directory": "./dist" }
}
```

Аккаунт Cloudflare: `felcoyanfelco@gmail.com`, Account ID `ffbe1b5a9458be8f77afcd5a769b7275`, workers.dev-поддомен аккаунта — `levavlogistics` (настраивается один раз в Dashboard → Workers & Pages → Overview).

## Если понадобится сменить имя воркера

```bash
# 1. Поменять "name" в wrangler.jsonc
# 2. Задеплоить новое имя
npm run deploy:cloudflare
# 3. Удалить старое, чтобы не оставалось дублей
npx wrangler delete --name СТАРОЕ_ИМЯ
```

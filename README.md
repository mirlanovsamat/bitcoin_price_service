# Bitcoin Price Service
Этот проект представляет собой микросервис, который получает текущую цену Bitcoin с Binance API, применяет к ней комиссию и хранит данные в Redis. Цены обновляются каждые 10 секунд.

## Функциональность
- Получение текущей цены Bitcoin (как bid, ask и mid) из Binance API.
- Применение 0.01% комиссии к полученной цене.
- Хранение цен в Redis для быстрого доступа.
- Обновление цены каждые 10 секунд.
- HTTP-API для получения текущей цены Bitcoin.

## Стек технологий
- Node.js
- NestJS
- Redis
- Docker

## Установка и запуск
1. **Клонируйте репозиторий:**
  git clone https://github.com/mirlanovsamat/bitcoin_price_service.git

2. **Запустите сервис с помощью Docker Compose:**
  docker-compose up --build

Можете отправить GET запрос на http://localhost:3000/bitcoin-price и вы получите актуальную цену биткоина 

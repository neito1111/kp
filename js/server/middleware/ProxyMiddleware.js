const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(express.json());

const apiProxy = createProxyMiddleware({
  target: 'http://localhost:8080', // Целевой адрес, куда будут перенаправляться запросы
  changeOrigin: true
});

// Маршрут, на который будут перенаправляться запросы
app.post('/grades', apiProxy);

app.listen(5000, () => {
  console.log('Прокси-сервер запущен на порту 5000');
});
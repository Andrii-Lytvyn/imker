import express from 'express';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();

  // Создаем сервер разработки Vite
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' }, // Режим middleware для SSR (если требуется)
  });

  // Используем Vite в качестве middleware
  app.use(vite.middlewares);

  // Обрабатываем все запросы через Vite
  app.all('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      // Рендерим приложение Vite на сервере (если требуется)
      let template;
      if (vite.ssr) {
        template = await vite.ssr.loadModule('/src/index.html');
      }

      // Возвращаем ответ с рендерингом
      const { render } = (await vite.ssrLoadModule('/src/entry-server.js')).default;
      const { appHtml, state } = await render(url, template);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(appHtml);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      console.error(e);
      res.status(500).end(e.message);
    }
  });

  // Запускаем сервер
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}

startServer();

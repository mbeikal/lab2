export function notFound(req, res, next) {
  res.status(404).json({ success: false, error: 'Не найдено' });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: err.message || 'Внутренняя ошибка сервера'
  });
}

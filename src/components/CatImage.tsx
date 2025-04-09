import React, { useState, useEffect, Suspense, lazy } from 'react';
import './CatImage.scss';

// Ленивая загрузка компонента CatImageDisplay
const CatImageDisplay = lazy(() => import('./CatImageDisplay'));

// Тип для ответа от The Cat API
interface CatImageResponse {
  id: string;
  url: string;
  width: number;
  height: number;
}

const CatImage: React.FC = () => {
  const [catImageUrl, setCatImageUrl] = useState<string | null>(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Функция для получения изображения кота через API
  const fetchCatImage = async (): Promise<void> => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data: CatImageResponse[] = await response.json();
      setCatImageUrl(data[0].url);
      setError(null);
    } catch (err) {
      console.error('Error fetching cat image:', err);
      setError('Failed to load cat image');
      setCatImageUrl(null);
    }
  };

  // Эффект для автообновления
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    if (isEnabled && autoRefresh) {
      fetchCatImage(); // Загружаем сразу при включении
      intervalId = setInterval(fetchCatImage, 5000); // Обновляем каждые 5 секунд
    }
    return () => {
      if (intervalId) clearInterval(intervalId); // Очищаем интервал при выключении
    };
  }, [isEnabled, autoRefresh]);

  // Обработчик для чекбокса "Enabled"
  const handleEnabledChange = (): void => {
    setIsEnabled((prev) => !prev);
    if (!isEnabled) {
      setAutoRefresh(false); // Отключаем автообновление, если "Enabled" выключен
      setCatImageUrl(null); // Очищаем изображение
    }
  };

  // Обработчик для чекбокса "Auto-refresh"
  const handleAutoRefreshChange = (): void => {
    setAutoRefresh((prev) => !prev);
  };

  return (
    <div className="cat-image-container">
      <div className="controls">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={handleEnabledChange}
          />
          Enabled
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={handleAutoRefreshChange}
            disabled={!isEnabled} // Отключаем, если "Enabled" выключен
          />
          Auto-refresh every 5 second
        </label>
        <button onClick={fetchCatImage} disabled={!isEnabled}>
          GET cat
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {catImageUrl && isEnabled && (
        <Suspense fallback={<p>Loading...</p>}>
          <CatImageDisplay imageUrl={catImageUrl} />
        </Suspense>
      )}
    </div>
  );
};

export default CatImage;
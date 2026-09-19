import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';
import data from './data';

// URL оставляем на случай, если API снова заработает
const url = 'https://course-api.com/react-tours-project';

function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  // Функция удаления тура (state tours находится здесь — п.10 методички)
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  // Загрузка данных из локального файла data.js
  const fetchTours = async () => {
    setLoading(true);
    try {
      // Раскомментируйте эти 2 строки, если API снова заработает:
      // const response = await fetch(url);
      // const tours = await response.json();
      // setTours(tours);

      // А это — временное решение с локальными данными:
      setTours(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // Пока идёт загрузка — показываем Loading
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  // Если туров нет (все удалены) — кнопка Refresh
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={fetchTours}>
            refresh
          </button>
        </div>
      </main>
    );
  }

  // Основной рендер — список туров
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
import React, { useEffect, useState } from "react";
import DataTable from "./DataTable";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Запит до API...");
    fetch("http://localhost:3000/api/air-quality")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Помилка API");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Отримані дані:", data);
        if (data.success && data.data) {
          setData(data.data);
        } else {
          setError("Невірний формат даних");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Помилка запиту:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Завантаження даних...</div>;
  }

  return (
    <div className="app">
      <h1>Моніторинг якості повітря</h1>
      {error && <div className="error">Помилка: {error}</div>}
      {data.length > 0 ? (
        <DataTable data={data} />
      ) : (
        <div className="no-data">Немає даних для відображення</div>
      )}
    </div>
  );
}

export default App;

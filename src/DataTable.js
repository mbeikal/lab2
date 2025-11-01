import React from "react";

function DataTable({ data }) {
  console.log("Рендер таблиці з даними:", data);

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Місто</th>
          <th>PM2.5 (µg/m³)</th>
          <th>ID станції</th>
          <th>Час вимірювання</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((item, index) => (
            <tr key={item._id || index}>
              <td>{item.city || "N/A"}</td>
              <td>{item.pm25 || item.pollutants?.pm25 || "N/A"}</td>
              <td>{item.stationId || "N/A"}</td>
              <td>
                {item.measuredAt
                  ? new Date(item.measuredAt).toLocaleString("uk-UA")
                  : item.timestamp
                  ? new Date(item.timestamp).toLocaleString("uk-UA")
                  : "Invalid Date"}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{ textAlign: "center" }}>
              Дані відсутні
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default DataTable;

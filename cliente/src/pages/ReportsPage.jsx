import React, { useEffect, useState } from "react";
import { useReports } from "../context/ReportsContext";

function ReportsPage() {
  const {
    dailyReport,
    weeklyReport,
    monthlyReport,
    getDailyReport,
    getWeeklyReport,
    getMonthlyReport,
  } = useReports();

  const [currentReport, setCurrentReport] = useState("daily");

  useEffect(() => {
    if (currentReport === "daily") getDailyReport();
    else if (currentReport === "weekly") getWeeklyReport();
    else if (currentReport === "monthly") getMonthlyReport();
  }, [currentReport]);

  const renderReport = (report) => (
    <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
      <h3 className="text-white font-manrope font-bold text-2xl leading-9 text-center">
        Total de ventas: $
        {report.reduce(
          (total, order) =>
            total + order.cart.reduce((sum, item) => sum + item.total, 0),
          0
        )}
      </h3>
      <ul className=" bg-zinc-500 max-w-md w-full p-5 rounded-md grid grid-cols-1 gap-2 mx-auto">
        {report.map((order) => (
          <li
            className="bg-zinc-800 max-w-md w-full p-5 rounded-md grid mx-auto md:px-5 lg-6"
            key={order._id}
          >
            <a>Cliente: {order.nombre}</a>
            <p>Email: {order.email}</p>
            <p>Teléfono: {order.telefono}</p>
            <ul>
              {order.cart.map((item) => (
                <li key={item._id}>
                  Producto: {item.nombre} - Cantidad: {item.cantidad} - Total: $
                  {item.total}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="wrapper w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
      <h1 className="text-white font-manrope font-bold text-2xl leading-9 text-center ">
        Reportes de Ventas
      </h1>
      <button
        className="rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700"
        onClick={() => setCurrentReport("daily")}
      >
        Reporte Diario
      </button>
      <button
        className="rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700"
        onClick={() => setCurrentReport("weekly")}
      >
        Reporte Semanal
      </button>
      <button
        className="rounded-full py-4 px-6 bg-indigo-600 text-white font-semibold text-lg w-full text-center transition-all duration-500 hover:bg-indigo-700"
        onClick={() => setCurrentReport("monthly")}
      >
        Reporte Mensual
      </button>
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto ">
        {currentReport === "daily" && renderReport(dailyReport)}
        {currentReport === "weekly" && renderReport(weeklyReport)}
        {currentReport === "monthly" && renderReport(monthlyReport)}
      </div>
    </div>
  );
}

export default ReportsPage;

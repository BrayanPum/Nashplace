import { createContext, useContext, useState } from "react";
import {
  getDailyReportRequest,
  getWeeklyReportRequest,
  getMonthlyReportRequest,
} from "../api/reports";

const ReportContext = createContext();

export const useReports = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReports must be used within a ReportProvider");
  }
  return context;
};

export function ReportProvider({ children }) {
  const [dailyReport, setDailyReport] = useState([]);
  const [weeklyReport, setWeeklyReport] = useState([]);
  const [monthlyReport, setMonthlyReport] = useState([]);

  const getDailyReport = async () => {
    try {
      const res = await getDailyReportRequest();
      setDailyReport(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getWeeklyReport = async () => {
    try {
      const res = await getWeeklyReportRequest();
      setWeeklyReport(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMonthlyReport = async () => {
    try {
      const res = await getMonthlyReportRequest();
      setMonthlyReport(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ReportContext.Provider
      value={{
        dailyReport,
        weeklyReport,
        monthlyReport,
        getDailyReport,
        getWeeklyReport,
        getMonthlyReport,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
}

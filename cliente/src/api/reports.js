import axios from "./axios";

export const getDailyReportRequest = () => axios.get("/reports/daily");
export const getWeeklyReportRequest = () => axios.get("/reports/weekly");
export const getMonthlyReportRequest = () => axios.get("/reports/monthly");

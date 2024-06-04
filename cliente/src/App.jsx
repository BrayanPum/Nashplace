import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import { TaskProvider } from "./context/TasksContext";
import { OrderProvider } from "./context/OrdersContext"; // Import OrderProvider
import Navbar from "./components/Navbar";
import Carrito from "./components/Carrito";
import OrderPage from "./pages/OrderPage";
import ReportsPage from "./pages/ReportsPage";
import { ReportProvider } from "./context/ReportsContext";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <ReportProvider>
          <OrderProvider>
            {" "}
            {/* Wrap with OrderProvider */}
            <BrowserRouter>
              {/* <Carrito/> */}
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/tasks" element={<TasksPage />} />
                  <Route path="/add-task" element={<TaskFormPage />} />
                  <Route path="/tasks/:id" element={<TaskFormPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/order" element={<OrderPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </OrderProvider>
        </ReportProvider>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;

import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute";
import ErrorPage from "./ui/ErrorPage";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Bookings = lazy(() => import("./pages/Bookings"));
const Cabins = lazy(() => import("./pages/Cabins"));
const Users = lazy(() => import("./pages/Users"));
const Settings = lazy(() => import("./pages/Settings"));
const Booking = lazy(() => import("./pages/Booking"));
const CheckIn = lazy(() => import("./features/check-in-out/CheckIn"));
const Login = lazy(() => import("./pages/Login"));
const Account = lazy(() => import("./pages/Account"));
const AppLayout = lazy(() => import("./ui/AppLayout"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 62 * 1000, // Cache data for 1 minute
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/bookings/:id" element={<Booking />} />
              <Route path="/checkin/:id" element={<CheckIn />} />
              <Route path="/cabins" element={<Cabins />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/account" element={<Account />} />
            </Route>
            <Route path="*" element={<ErrorPage />} />

            <Route path="login" element={<Login />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: "#ffffff",
              color: "#10b981",
            },
          },
          error: {
            duration: 5000,
            style: {
              background: "#ffffff",
              color: "#ef4444",
            },
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            background: "#ffffff",
            color: "#374151",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;

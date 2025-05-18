import { Suspense, lazy, useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import DashboardLayout from "./components/ui/dashboard-layout"
import { AuthProvider, useAuth } from "./lib/auth"
import { ErrorBoundary } from "./components/error-boundary"

// Lazy load all route components
const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Trends = lazy(() => import("./pages/Trends"))
const ActionTasks = lazy(() => import("./pages/ActionTasks"))
const HistoricalReports = lazy(() => import("./pages/HistoricalReports"))
const FinancialAnalytics = lazy(() => import("./pages/FinancialAnalytics"))
const ClientProfiles = lazy(() => import("./pages/ClientProfiles"))
const TimeExplorer = lazy(() => import("./pages/TimeExplorer"))
const SOPsPolicies = lazy(() => import("./pages/SOPsPolicies"))
const DataManagement = lazy(() => import("./pages/DataManagement"))
const Communications = lazy(() => import("./pages/Comms"))
const Documentation = lazy(() => import("./pages/Documentation"))
const Settings = lazy(() => import("./pages/Settings"))
const Calendar = lazy(() => import("./pages/Calendar"))
const DevMode = lazy(() => import("./pages/DevMode"))
const NotFound = lazy(() => import("./pages/404"))

// Loading component for Suspense fallback
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  )
}

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if localStorage has user data
    const checkLocalStorage = () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
          setIsLoading(false);
        } else {
          // Wait a bit to ensure auth state is fully initialized
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      } catch (error) {
        console.error('Error checking localStorage:', error);
        setIsLoading(false);
      }
    };

    checkLocalStorage();
  }, []);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes */}
      <Route element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route path="/" element={<Home />} />
        <Route path="action-tasks" element={<ActionTasks />} />
        <Route path="historical-reports" element={<HistoricalReports />} />
        <Route path="financial-analytics" element={<FinancialAnalytics />} />
        <Route path="client-profiles" element={<ClientProfiles />} />
        <Route path="time-explorer" element={<TimeExplorer />} />
        <Route path="sops-policies" element={<SOPsPolicies />} />
        <Route path="data-management" element={<DataManagement />} />
        <Route path="communications" element={<Communications />} />
        <Route path="trends" element={<Trends />} />
        <Route path="documentation" element={<Documentation />} />
        <Route path="settings" element={<Settings />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="dev-mode" element={<DevMode />} />
      </Route>

      {/* 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark" storageKey="ftf-finance-theme">
        <BrowserRouter>
          <AuthProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <ErrorBoundary>
                <AppRoutes />
              </ErrorBoundary>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

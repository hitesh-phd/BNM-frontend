import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";

import ProtectedRoute from "./components/ProtectedRoute";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { ROUTES } from "./utils/RouterConfig";
import TopBar from "./components/TopBar";
import HomePage from "./pages/HomePage";
import { selectIsAuthenticated } from "./store/AuthSlice";

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? ROUTES.HOME : ROUTES.SIGN_IN} />
          }
        />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<div>About</div>} />
          <Route path="/contact" element={<div>Contact</div>} />
        </Route>
        <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

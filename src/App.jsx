import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./App.css";

import ProtectedRoute from "./components/ProtectedRoute";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { ROUTES } from "./utils/RouterConfig";

function App() {
  const isAuthenticated = false;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<div>Home</div>} />
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

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Router.jsx";
import AuthPRovider from "./Provider/AuthPRovider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthPRovider>
      <div className="max-w-screen-xl mx-auto">
      <RouterProvider router={router} />

      </div>
    </AuthPRovider>
  </StrictMode>
);

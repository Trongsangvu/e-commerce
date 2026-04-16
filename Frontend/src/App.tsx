import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./assets/styles/App.css";
import router from "./routes";

const App = () => (
  <>
    {/* Toast Notifications */}
    <ToastContainer
      position="bottom-left"
      autoClose={2000}
      hideProgressBar={false}
      closeOnClick
      pauseOnFocusLoss
      pauseOnHover
    />

    {/* Application Router */}
    <RouterProvider router={router} />
  </>
);

export default App;

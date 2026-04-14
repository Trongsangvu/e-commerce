import { useEffect } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./assets/styles/App.css";
import { checkAuth } from "./redux/slices/auth-slice";
import { publicRoutes } from "./routes/routes";

function App() {
  const dispatch = useDispatch();

  // Check auth when app start
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <Routes>
            {publicRoutes.map((route) => {
              const Page = route.component;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    route.layout ? (
                      <route.layout>
                        <Page />
                      </route.layout>
                    ) : (
                      <Page />
                    )
                  }
                />
              );
            })}
          </Routes>
        </SkeletonTheme>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/routes';
import { DefaultLayout } from './components/layout/DefaultLayout';
import { SkeletonTheme } from 'react-loading-skeleton';
import './assets/styles/App.css';

function App() {
  return (
      <Router>
          <div className='app'>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    return (
                      <Route 
                        key={index}
                        path={route.path}
                        element={
                          <DefaultLayout>
                            <Page />
                          </DefaultLayout>
                        }
                      />
                    )
                })}
              </Routes>
            </SkeletonTheme>
          </div>
      </Router>
  )
}

export default App;

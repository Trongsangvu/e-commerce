import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { publicRoutes } from './routes/routes';
import DefaultLayout from './components/layout/DefaultLayout';
import './App.css'

function App() {
  return (
    <Router>
        <div className='app'>
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
        </div>
    </Router>
  )
}

export default App

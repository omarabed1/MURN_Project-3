import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup';
import Login from './pages/Login';
import {useUserContext} from './hooks/useUserContext'
import Navbar from './components/Navbar';
import Graph from './pages/Graph';
function App() {
  const { user } = useUserContext()
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className="pages">
        <Routes>
          <Route
            path='/'
            element={user? <Home/> : <Navigate to ="/login"/>}
          />
          <Route
            path='/login'
            element={!user? <Login />: <Navigate to ="/"/>}
          />
          <Route
            path='/signup'
            element={!user? <Signup />: <Navigate to ="/"/>}
          />
          <Route
           path='/graph'
           element={user? <Graph/> : <Navigate to ="/login"/> }
          />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;

// src/App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './screens/Login';
import Admin from './screens/Admin';
import {UserProvider} from './Provider/UserContext'; 
import { Formulario } from './components/Formulario';
import { PanelControl } from './screens/PanelControl';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="panel" element={<PanelControl />} />
            <Route path="formulario" element={<Formulario />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;

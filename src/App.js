import logo from './logo.svg';
import './App.css';
import HomePage from './Pages/HomePage';
import UserPage from './Pages/UserPage';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={ <HomePage /> } />
      </Routes>
      <Routes>
        <Route path="/:userName"  element={ <UserPage /> } />
      </Routes>
    </Router>
  );
}

export default App;

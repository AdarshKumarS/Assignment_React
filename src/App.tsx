import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import NewOrder from './pages/NewOrder';

const App = () => (
  <Router>
    <NavBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<NewOrder />} />
    </Routes>
  </Router>
);

export default App;

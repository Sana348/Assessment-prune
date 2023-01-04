

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Search from './components/Search';


function App() {
  return (
    <div className="App">
    <Router>
        
        <Routes>
        <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
         
          <Route exact path="/search" element={<Search />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;

import './App.css';
import {Route,Routes,} from "react-router-dom"
import Signup from './components/Signup';
import Login from './components/Login';
import Search from './components/Search';





function App() {

  return (
    <Routes>
      <Route index element={<Signup/>}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/search" element={<Search />}></Route>
      <Route path="*" element={<Signup />}></Route>
    </Routes>
  );
}

export default App;

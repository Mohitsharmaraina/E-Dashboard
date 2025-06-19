import Navbar from './Components/Navbar';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './Components/Products';
import UpdateProduct from './Components/UpdateProduct';
import AddProduct from './Components/AddProduct';
import Footer from './Components/Footer';
import SignUp from './Components/SignUp';
import PrivateComp from './Components/PrivateComp';
import Login from './Components/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route element = {<PrivateComp/>}>
          <Route path='/' element={<Products />}></Route>
          <Route path='/add' element={<AddProduct />}></Route>
          <Route path='/update/:id' element={<UpdateProduct />}></Route>
          </Route>
        
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/login' element={<Login />}></Route>
         
        </Routes>
      </Router>
      <Footer />

    </div>
  );
}

export default App;

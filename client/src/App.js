import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";


//import components
import TopNavBar from './components/TopNavBar';
import Footer from './components/Footer';

//import pages
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Help from './pages/Help';
import CreateRecipe from './pages/CreateRecipe';
import SavedRecipes from './pages/SavedRecipes';
import UpdateRecipe from './pages/UpdateRecipe';


function App() {
  return (
    <div className="App">

    <Router>
           
        <TopNavBar />

            <Routes>
                <Route path="/"               element={<Home />}           />
                <Route path="/login"          element={<Login />}           />
                <Route path="/register"       element={<Register />}           />
                <Route path="/createRecipe"   element={<CreateRecipe />}  />
                <Route path="/savedRecipes"   element={<SavedRecipes />}   />
                <Route path="/updateRecipe"   element={<UpdateRecipe />}   />
                <Route path="/help"           element={<Help />}           />

            </Routes>
      
      <Footer />

    </Router>



    </div>
  );
}
 
export default App;

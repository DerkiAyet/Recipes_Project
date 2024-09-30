import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import HomePage from './Home/Components/HomePage';
import NavBar from './partials/Components/NavBar';
import { createContext, useEffect, useState } from 'react';
import SignUp from './Authentication/Components/SignUp';
import Login from './Authentication/Components/Login';
import AddRecipe from './Recipes/Components/AddRecipe';
import Profile from './Profile/Components/Profile';
import About from './About/Components/About';
import Recipe from './Recipes/Components/Recipe';
import Recipes from './Recipes/Components/Recipes';
import Favorites from './Profile/Components/Favorites';
import Contact from './About/Components/Contact';
import cookies from 'js-cookie'
import i18n from './partials/Components/i18n';

export const AppContext = createContext();

function App() {

  const [userAuth, setUserAuth] = useState({
    state: false
  })

  const [lang, setLang] = useState(cookies.get('i18next') || 'en');

  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lang])

  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    setIsRtl(document.documentElement.dir === "rtl");
  }, []);

  return (
    <AppContext.Provider value={{ userAuth, setUserAuth, setLang, isRtl, setIsRtl }}>
      <div className="App">
        <Router>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/contact' element={<Contact />} />

            <Route path='/' element={<NavBarOutlet />} >
              <Route index Component={HomePage} />
              <Route path='add-recipe' Component={AddRecipe} />
              <Route path='profile' Component={Profile} />
              <Route path='recipes' Component={Recipes} />
              <Route path='recipes/:id' Component={Recipe} />
              <Route path='favorites' Component={Favorites} />
              <Route path='about' Component={About} />
            </Route>
          </Routes>
        </Router>
      </div>
    </AppContext.Provider>
  );
}

const NavBarOutlet = () => {
  return (
    <div className='main-container'>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default App;

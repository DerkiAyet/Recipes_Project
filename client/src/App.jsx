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
import axios from 'axios';
import MyRecipes from './Profile/Components/MyRecipes';

export const AppContext = createContext();

function App() {

  const [lang, setLang] = useState(cookies.get('i18next') || 'en');

  useEffect(() => {
    window.document.dir = i18n.dir();
  }, [lang])

  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    setIsRtl(document.documentElement.dir === "rtl");
  }, []);

  const [userAuth, setUserAuth] = useState({
    userName: '',
    fullName: '',
    userImg: null,
    state: false
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    axios.defaults.withCredentials = true;
    axios.get('http://localhost:3001/auth/verify')
      .then((res) => {
        setUserAuth({
          userName: res.data.userName,
          fullName: res.data.fullName,
          userImg: res.data.userImg,
          state: true
        })
      })
      .catch((err) => {
        console.error(err.response.data)
        setUserAuth(prevState => ({
          ...prevState,
          state: false
        }));
      })
      .finally(() => setLoading(false))

  }, [])

  const [recipes, setRecipes] = useState([])

  useEffect(() => {

    axios.get('http://localhost:3001/recipes')
    .then((res) => setRecipes(res.data))
    .catch((err) => console.error(err.response.data))

  }, [])

  const [ ratings, setRatings ] = useState([])

  useEffect(() => {

    axios.defaults.withCredentials = true;

    axios.get('http://localhost:3001/ratings/userRatings')
    .then((res) => setRatings(res.data))
    .catch((err) => console.error(err.response.data))

  }, [userAuth.state])

  const [ savings, setSavings ] = useState([]);

  useEffect(() => {

    axios.defaults.withCredentials = true;

    axios.get('http://localhost:3001/savings/savedRecipes')
    .then((res) => setSavings(res.data))
    .catch((err) => console.error(err.response.data))

  }, [userAuth.state])

  return (
    <AppContext.Provider value={{ userAuth, setUserAuth, setLang, isRtl, setIsRtl, loading, recipes, setRecipes, ratings, setRatings, savings, setSavings }}>
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
              <Route path='profile/my-recipes' Component={MyRecipes} />
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

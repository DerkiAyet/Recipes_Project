import React, { useContext, useState, useEffect } from 'react'
import '../Styles/NavBar.css'
import { ReactComponent as LogoName } from '../../Assets/logo.svg';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../../App';
import EnglishIcon from '../../Assets/english.png';
import FrenshIcon from '../../Assets/frensh.png';
import ArabicIcon from '../../Assets/arabic.png';
import './i18n';
import { useTranslation } from 'react-i18next';

function NavBar() {

    const { userAuth } = useContext(AppContext);

    const navigate = useNavigate();

    const [navBackground, setNavBackground] = useState('transparent');
    const location = useLocation(); // Get the current route

    useEffect(() => {
        if (location.pathname === '/') { // Apply scroll effect only on Home page
            const handleScroll = () => {
                if (window.scrollY > window.innerHeight) {
                    setNavBackground('#fff'); // New color after scrolling past 100vh
                } else {
                    setNavBackground('transparent'); // Default color before scrolling past 100vh
                }
            };

            window.addEventListener('scroll', handleScroll);
            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        } else {
            setNavBackground('#fff'); // Set default background color for other pages
        }
    }, [location]);

    //----------------changing language------------------

    const { setLang, setIsRtl } = useContext(AppContext);

    const { t, i18n } = useTranslation();

    const changeLanguage = (lang, dir) =>{
        i18n.changeLanguage(lang);
        setLang(lang);
        setIsRtl(dir)
    }

    return (
        <div className='navbar-container'>
            <div className="navbar-wrapper" style={{ backgroundColor: navBackground }}>
                <LogoName />
                <nav>
                    <ul>
                        <li>
                            <Link to={'/'} className='link'>
                                {t('navHome')}
                            </Link>
                        </li>
                        <li>
                            <Link to={'/recipes'} className='link'>
                                {t('navRecipes')}
                            </Link>
                        </li>
                        <li>
                            <Link to={'/add-recipe'} className='link'>
                                {t('navAdd')}
                            </Link>
                        </li>
                        <li>
                            <Link to={'/contact'} className='link'>
                                {t('contactNav')}
                            </Link>
                        </li>
                        <li className='languages-link'>
                            <div className='link' style={{ cursor: 'pointer' }}>
                                {t('languageNav')}
                            </div>
                            <div className="languages-container">
                                <ul>
                                    <li onClick={() => changeLanguage('en', false)}>
                                        English
                                        <img
                                            src={EnglishIcon}
                                            alt="england"
                                        />
                                    </li>
                                    <li onClick={() => changeLanguage('fr', false)}>
                                        Frensh
                                        <img
                                            src={FrenshIcon}
                                            alt="france"
                                        />
                                    </li>
                                    <li onClick={() => changeLanguage('ar', true)}>
                                        Arabic
                                        <img
                                            src={ArabicIcon}
                                            alt="saudi arabia"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <Link to={'/about'} className='link'>
                                {t('aboutNav')}
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="account-box">
                    {
                        userAuth.state ?
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-6" style={{ cursor: 'pointer' }} onClick={() => navigate('/recipes')}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>

                                <div className="account-img">
                                    <img
                                        src={ userAuth.userImg ?  `http://localhost:3001/uploads/${userAuth.userImg}` : '/default_picture.jpeg' }
                                        alt=""
                                        id="account-img"
                                        onClick={() => navigate('/profile')}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </div>
                            </>
                            :
                            <>
                                <button className="nav-btn login-btn" onClick={() => navigate('/login')}>
                                    {t('login')}
                                </button>
                                <button className="nav-btn signup-btn" onClick={() => navigate('/register')}>
                                    {t('signUp')}
                                </button>
                            </>
                    }

                </div>
            </div>
        </div>
    )
}

export default NavBar

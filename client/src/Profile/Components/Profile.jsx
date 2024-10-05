import React, { useContext } from 'react';
import '../Styles/Profile.css'
import { Footer } from '../../partials/Components/Footer';
import FacebookIcon from '../../Assets/facebook-writed.png';
import GoogleIcon from '../../Assets/google-writed.png';
import { useNavigate } from 'react-router-dom';
import '../../partials/Components/i18n';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { AppContext } from '../../App';
import Cookies from 'js-cookie'

function Profile() {

    const { t } = useTranslation();

    const navigate = useNavigate();

    const { setUserAuth } = useContext(AppContext);

    const logout = (e) => {
        e.preventDefault();

        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/auth/logout', {})
            .then(() => {
                setUserAuth({
                    userName: '',
                    fullName: '',
                    userImg: null,
                    state: false
                })

                Cookies.remove('accessToken');

                navigate('/')
            })
            .catch((err) => console.error(err))
    }

    return (
        <div className='profile-container'>
            <div className="profile-wrapper">
                <form>
                    <div className="title-line">
                        <h1>
                            {t('profileTitle')}
                        </h1>
                        <div className="profile-btns" style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                style={{ backgroundColor: 'transparent', color: '#000', border: '2px solid #B55D51', boxShadow: 'none', textTransform: 'capitalize' }}
                                onClick={() => navigate('/profile/my-recipes')}
                            >
                                {t('myRecipes')}
                            </button>
                            <button
                                style={{ backgroundColor: 'transparent', color: '#000', border: '2px solid #B55D51', boxShadow: 'none', textTransform: 'capitalize' }}
                                onClick={() => navigate('/favorites')}
                            >
                                {t('favoritesTitle')}
                            </button>
                            <button type="submit" style={{ textTransform: 'capitalize' }}>
                                {t('saveChanges')}
                            </button>
                        </div>

                    </div>
                    <div className="form-body">
                        <div className="user-img">
                            <div className="img-circle">
                                <img src="/default_picture.jpeg" alt="" />
                            </div>
                            <div className="img-btn">
                                <label htmlFor="" style={{ textTransform: 'capitalize' }}>
                                    {t('recipeChangeBtn')}
                                </label>
                                <input type="file" name="" id="" />
                            </div>
                            <div className="img-btn delete-btn" style={{ cursor: 'pointer' }}>
                                <label htmlFor="" style={{ textTransform: 'capitalize' }}>
                                    {t('deleteBtn')}
                                </label>
                            </div>
                        </div>

                        <div className="inputs-container">
                            <div className="input-flex">
                                <div className="input-profile-line">
                                    <label htmlFor="fullName">
                                        {t('fullName')}
                                    </label>
                                    <div className="profile-input">
                                        <i className="ri-user-line input-icon"></i>
                                        <input
                                            type="text"
                                            name="fullName"
                                            id="fullName"
                                            autoComplete="off"
                                            placeholder={t('fullName')}
                                        />
                                    </div>
                                </div>
                                <div className="input-profile-line">
                                    <label htmlFor="email">
                                        {t('email')}
                                    </label>
                                    <div className="profile-input">
                                        <i className="ri-mail-line input-icon"></i>
                                        <input
                                            type="text"
                                            name="email"
                                            id="email"
                                            autoComplete='off'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="input-flex">
                                <div className="input-profile-line">
                                    <label htmlFor="userName">
                                        {t('userName')}
                                    </label>
                                    <div className="profile-input">
                                        <i class="ri-at-line"></i>
                                        <input
                                            type="text"
                                            name="userName"
                                            id="userName"
                                            autoComplete='off'
                                        />
                                    </div>
                                </div>
                                <div className="input-profile-line">
                                    <label htmlFor="password">
                                        {t('password')}
                                    </label>
                                    <div className="profile-input">
                                        <i className="ri-lock-2-line input-icon"></i>
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            autoComplete='off'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="active-accounts">
                            <h2>
                                {t('connected')}
                            </h2>
                            <div className="account-line" style={{ textTransform: 'capitalize' }}>
                                <img src={FacebookIcon} alt="" />
                                {t('connect')}
                            </div>
                            <div className="account-line" style={{ textTransform: 'capitalize' }}>
                                <img src={GoogleIcon} alt="" />
                                {t('connect')}
                            </div>
                        </div>

                        <div className="newsletter-line">
                            <h2>
                                {t('footerNewsTitle')}
                            </h2>
                            <div className="account-line">
                                <p>
                                    {t('footerNewsletter')}
                                </p>
                                <button>
                                    {t('subBtn')}
                                </button>
                            </div>
                        </div>

                        <div className="signout-line">
                            <div className="btn-line">
                                <i class="ri-logout-box-line"></i>
                                <button style={{ textTransform: 'capitalize' }} onClick={(e) => logout(e)}>
                                    {t('signOut')}
                                </button>
                            </div>
                            <span style={{ textTransform: 'capitalize' }}>{t('deleteAccount')}</span>
                        </div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default Profile

import React from "react";
import { ReactComponent as LogoSvg } from '../../Assets/logo.svg';
import { Link } from 'react-router-dom';
import '../Styles/Footer.css';
import './i18n';
import { useTranslation } from "react-i18next";


export const Footer = () => {

    const { t } = useTranslation();

    return (
        <footer>
            <div className="footer-flex-column">
                <div className="flex-container about-website">
                    <LogoSvg />
                    <p className="about">
                        Perfect Recipes {t('footerDes')}
                    </p>
                </div>
                <div className="flex-container links-list">
                    <ul>
                        <h5>
                            {t('quickLinks')}
                        </h5>
                        <li>
                            <Link to={'/'} className='link'>
                                {t('navHome')}
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className='link'>
                                {t('navRecipes')}
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className='link'>
                                {t('navAdd')}
                            </Link>
                        </li>
                    </ul>
                    <ul>
                        <h5>
                            {t('quickLinks')}
                        </h5>
                        <li>
                            <Link to={'/'} className='link'>
                                {t('aboutNav')}
                            </Link>
                        </li>
                        <li>
                            <Link to={'/'} className='link'>
                                {t('shareRecipes')}
                            </Link>
                        </li>
                        <li className='link'>
                            {t('contactNav')}
                        </li>
                    </ul>
                    <ul>
                        <h5>
                            {t('legal')}
                        </h5>
                        <li className='link'>
                            {t('termsUse')}
                        </li>
                        <li className='link'>
                            {t('privacy')}
                        </li>

                    </ul>
                </div>
                <div className="flex-container news-letter">
                    <h2>
                        {t('footerNewsTitle')}
                    </h2>
                    <p>
                        {t('footerNewsletter')}
                    </p>
                    <form className='newsletter-form'>
                        <div className="input-line-box">
                            <i className="ri-mail-line input-icon"></i>
                            <input
                                className="input-line"
                                type='email'
                                autoComplete="off"
                                placeholder={t('emailPlaceholder')}
                            />
                        </div>
                        <button type="submit">
                            {t('subBtn')}
                        </button>
                    </form>
                </div>
            </div>
            <div className="social-media-footer">
                <p className="coraption">
                    {t('footerRights')}
                </p>
                <div className="icons-container">
                    <i class="ri-tiktok-fill footer-icon"></i>
                    <i class="ri-twitter-x-line footer-icon"></i>
                    <i class="ri-facebook-fill footer-icon"></i>
                    <i class="ri-instagram-line footer-icon"></i>
                    <i class="ri-pinterest-line footer-icon"></i>
                </div>
            </div>
        </footer>
    )
}
import React from 'react';
import DishImg from '../../Assets/intro-dish.png';
import Account from '../../Assets/account.jpeg';
import { ReactComponent as Star } from '../../Assets/star.svg';
import { ReactComponent as StarFill } from '../../Assets/star-fill.svg'
import { Link } from 'react-router-dom';
import '../Styles/IntroBox.css';
import '../../partials/Components/i18n';
import { Trans, useTranslation } from 'react-i18next';

export const IntroBox = () => {

    const { t } = useTranslation();

    return (
        <div className="intro-container">
            <div className="intro-leftSide">
                <h1>
                    <Trans i18nKey="welcome">
                        your daily dish a <span style={{ color: "#B55D51" }}> food </span> journey
                    </Trans>
                </h1>
                <p className='definition'>
                    {t('welcomeParagraph')}
                </p>
                <button className="signup-btn">
                    {t('signUp')}
                </button>
                <p className="login-link">
                    <Trans i18nKey={'loginLine'} >
                        Do you have an account? <Link style={{ color: "#B55D51" }} className='link' to={'/'}>Log in</Link>
                    </Trans>
                </p>
            </div>
            <div className="intro-rightSide">
                <img
                    src={DishImg}
                    alt="intro dish"
                />
                <div className="comment-decoration">
                    <div className="comment-user">
                        <div className="user-img">
                            <img
                                src={Account}
                                alt="example account"
                            />
                        </div>
                        <div className="user-infos">
                            <span className='userName'>
                                Sara Johnson
                            </span>
                            <div className="stars-rating">
                                <StarFill />
                                <StarFill />
                                <StarFill />
                                <StarFill />
                                <Star />
                            </div>
                        </div>
                    </div>
                    <div className="comment-txt">
                        { t('commentIntro') }
                    </div>
                </div>
            </div>
        </div>
    )
}
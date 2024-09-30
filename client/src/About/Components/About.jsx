import React from 'react'
import '../Styles/About.css';
import AboutImg from '../../Assets/donut-about.png';
import MissionImg from '../../Assets/mission.jpeg';
import TeamImg from '../../Assets/team.jpeg';
import AmazoneIcon from '../../Assets/amazon.png';
import AppleIcon from '../../Assets/apple.png';
import GoogleIcon from '../../Assets/google.png';
import NestleIcon from '../../Assets/nestle.png';
import WalmartIcon from '../../Assets/walmart.png';
import { MySwiper } from '../../Home/Components/MySwiper';
import { Footer } from '../../partials/Components/Footer';
import '../../partials/Components/i18n'
import { useTranslation, Trans } from "react-i18next";

function About() {

    const { t } = useTranslation();

    return (
        <div className='about-container'>
            <div className="about-wrapper">
                <div className="title-line">
                    <h1>
                        {t('aboutNav')}
                    </h1>
                </div>
                <div className="about-box">
                    <>
                        <h1>
                            {t('aboutTitle')}
                        </h1>
                        <div className="about-img">
                            <img
                                src={AboutImg}
                                alt="3 donuts" />
                        </div>
                        <p>
                            <Trans i18nKey={'aboutDesc'}>
                                Welcome to <b>Perfect Recipes —</b> your ultimate destination for delicious, easy-to-follow, and diverse recipes from around the world!
                                <br />
                                At Perfect Recipes, we believe that cooking is an art that anyone can master with the right ingredients, instructions, and a sprinkle of passion. Whether you're a seasoned chef or just beginning your culinary journey, our website offers a wide range of mouth-watering recipes tailored to suit every taste, skill level, and dietary preference.
                            </Trans>
                        </p>
                    </>

                    <div className='mission'>
                        <div className="mission-text">
                            <h1 style={{ marginTop: '2rem', textTransform: 'capitalize' }}>
                                {t('mission')}
                            </h1>
                            <p>
                                {t('missionDesc')}
                            </p>
                        </div>

                        <div className="mission-img">
                            <img
                                src={MissionImg}
                                alt="strawberies" />
                        </div>
                    </div>

                    <h1 style={{ marginTop: '2rem', textTransform: 'capitalize' }}>
                        {t('offers')}
                    </h1>
                    <MySwiper />

                    <div className='mission'>
                        <div className="mission-img">
                            <img
                                src={TeamImg}
                                alt="team" />
                        </div>
                        <div className="mission-text">
                            <h1 style={{ marginTop: '2rem', textTransform: 'capitalize' }}>
                                {t('choose')}
                            </h1>
                            <p>
                                <Trans i18nKey={'chooseDesc'}>
                                    Unlike other recipe websites, we put emphasis on both taste and health, making sure that every recipe is not only delicious but also wholesome. We also focus on the ease of cooking, with tips and tricks to simplify complex dishes and minimize kitchen time, so you can spend more time enjoying your food.
                                    <br />
                                    We’re committed to helping you discover new tastes, broaden your culinary horizons, and perfect your favorite recipes. Whether you're cooking for a special occasion or just preparing a meal for your loved ones, Perfect Recipes is here to guide you every step of the way.
                                </Trans>
                            </p>
                        </div>
                    </div>

                    <div className="brands-line">
                        <img src={AppleIcon} alt="apple icon" style={{ width: '60px' }} />
                        <img src={AmazoneIcon} alt="amazon icon" />
                        <img src={GoogleIcon} alt="amazon icon" />
                        <img src={NestleIcon} alt="nestle icon" style={{ width: '60px' }} />
                        <img src={WalmartIcon} alt="walmart icon" style={{ width: '60px' }} />
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About

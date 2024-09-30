import React from 'react';
import '../Styles/Contact.css';
import ContactImg from '../../Assets/contact.jpeg';
import { ReactComponent as LogoSvg } from '../../Assets/logo.svg';
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";

function Contact() {

    const { t } = useTranslation();

    return (
        <div className='contact-container'>
            <div className="contact-wrapper">
                <div className="contact-box">
                    <div className="contact-line-flex">
                        <div className="contact-img">
                            <img
                                src={ContactImg}
                                alt="chef"
                            />
                        </div>
                        <div className="contact-form">
                            <h1>
                                {t('contactTitle')}
                            </h1>
                            <div className="contact-form-container">
                                <form action="">
                                    <div className="contact-form-box">
                                        <div className="contact-input-line">
                                            <i className="ri-user-line input-icon"></i>
                                            <input
                                                type="text"
                                                placeholder={t('contactFullname')}
                                                autoComplete='off'
                                            />
                                        </div>
                                        <div className="contact-input-line">
                                            <i className="ri-mail-line input-icon"></i>
                                            <input
                                                type="email"
                                                placeholder={t('contactEmail')}
                                                autoComplete='off'
                                            />
                                        </div>
                                        <div className="contact-input-line">
                                            <i class="ri-edit-line input-icon"></i>
                                            <textarea placeholder={t('contactMessage')} />
                                        </div>
                                    </div>
                                    <button type="submit">
                                        {t('contactSend')}
                                    </button>
                                </form>
                                <div className="contact-refernces">
                                    <div className="refernce">
                                        <i class="ri-phone-line"></i>
                                        <div className="reference-content">
                                            <h4>
                                                {t('contactPhone')}
                                            </h4>
                                            <span>
                                                +213555555555
                                            </span>
                                        </div>
                                    </div>
                                    <div className="refernce">
                                        <i class="ri-mail-line"></i>
                                        <div className="reference-content">
                                            <h4>
                                                {t('contactMail')}
                                            </h4>
                                            <span>
                                                info@gmail.com
                                            </span>
                                        </div>
                                    </div>
                                    <div className="refernce">
                                        <i class="ri-map-pin-2-line"></i>
                                        <div className="reference-content">
                                            <h4>
                                                {t('contactOrigin')}
                                            </h4>
                                            <span>
                                                Oran, Algeria
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="logo-box">
                                <LogoSvg />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact

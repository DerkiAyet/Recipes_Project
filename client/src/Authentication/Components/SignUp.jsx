import React, { useContext } from 'react';
import '../Styles/SignUp.css';
import AuthenticationImg from '../../Assets/authentication_img.png';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { ReactComponent as GoogleSvg } from '../../Assets/google.svg'
import { ReactComponent as FacebookSvg } from '../../Assets/facebook.svg';
import { ReactComponent as LogoSvg } from '../../Assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { Footer } from '../../partials/Components/Footer';
import '../../partials/Components/i18n'
import { useTranslation, Trans } from "react-i18next";
import axios from 'axios'
import { AppContext } from '../../App';

function SignUp() {

    const { t } = useTranslation();

    const initialValues = {
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        userName: Yup.string().required('User name is a required field'),
        email: Yup.string().email('Invalid email format').required('Email is a required field'),
        password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is a required field'),
        confirmPassword: Yup.string().min(6, 'Password must be at least 6 characters long').required('Please confirm your password')
    });

    const { setUserAuth } = useContext(AppContext);

    const navigate = useNavigate();
    
    axios.defaults.withCredentials = true;
    const onSubmit = (data) => {
        if (data.password === data.confirmPassword) {
            axios.post('http://localhost:3001/auth/register', {
                userName: data.userName,
                email: data.email,
                password: data.password
            })
                .then((res) => {
                    setUserAuth({
                        userName: res.data.userName,
                        fullName: res.data.fullName,
                        userImg: res.data.userImg,
                        state: true
                    })
                    navigate('/')
                })
                .catch((err) => console.err(err.response.data))
        } else {
            alert('passwords non identical')
        }
    };

    const getFirstError = (errors, touched) => {
        if (errors.userName && touched.userName) return errors.userName;
        if (errors.email && touched.email) return errors.email;
        if (errors.password && touched.password) return errors.password;
        if (errors.confirmPassword && touched.confirmPassword) return errors.confirmPassword;
        return null;
    };

    return (
        <div className='signup-container'>
            <div className="signup-wrapper">
                <div className="signup-box">
                    <div className="signup-line-flex">
                        <div className="img-box">
                            <img
                                src={AuthenticationImg}
                                alt="recipe"
                            />
                        </div>
                        <div className="form-box">
                            <h1>
                                {t('signTitle')}
                            </h1>
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                                {({ errors, touched }) => (
                                    <Form className='form-container'>
                                        <div className="form">
                                            <div className="input-container">
                                                <div className="input-line-box">
                                                    <i className="ri-user-line input-icon"></i>
                                                    <Field
                                                        className="input-line"
                                                        type='text'
                                                        autoComplete="off"
                                                        name="userName"
                                                        placeholder={t('userNamePlaceholder')}
                                                    />
                                                </div>
                                            </div>
                                            <div className="input-container">
                                                <div className="input-line-box">
                                                    <i className="ri-mail-line input-icon"></i>
                                                    <Field
                                                        className="input-line"
                                                        type='text'
                                                        autoComplete="off"
                                                        name="email"
                                                        placeholder={t('emailPlaceholder')}
                                                    />
                                                </div>
                                            </div>
                                            <div className="input-container">
                                                <div className="input-line-box">
                                                    <i className="ri-lock-2-line input-icon"></i>
                                                    <Field
                                                        className="input-line"
                                                        type='password'
                                                        autoComplete="off"
                                                        name="password"
                                                        placeholder={t('passPlaceholder')}
                                                    />
                                                </div>
                                            </div>
                                            <div className="input-container">
                                                <div className="input-line-box">
                                                    <i className="ri-lock-2-line input-icon"></i>
                                                    <Field
                                                        className="input-line"
                                                        type='password'
                                                        autoComplete="off"
                                                        name="confirmPassword"
                                                        placeholder={t('repeatPass')}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="error-message">
                                            {getFirstError(errors, touched) && (
                                                <div className="error">{getFirstError(errors, touched)}</div>
                                            )}
                                        </div>
                                        <div className="policy-terms-warning">
                                            <input
                                                type="checkbox"
                                                id="checkbox-input"
                                            />
                                            <p>I agree to the <span>terms & policy</span></p>
                                        </div>

                                        <button type="submit">
                                            {t('signUp')}
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                            <div className="other-options">
                                <p>
                                    {t('signupOption')}
                                </p>
                                <div className="other-options-line">
                                    <div className="option">
                                        <GoogleSvg />
                                        <p>
                                            {t('googleLogin')}
                                        </p>
                                    </div>
                                    <div className="option">
                                        <FacebookSvg />
                                        <p>
                                            {t('facebookLogin')}
                                        </p>
                                    </div>
                                </div>
                                <p className="login-link">
                                    <Trans i18nKey={'loginLine'}>
                                        Do you have an account? <Link style={{ color: "#B55D51" }} className='link' to={'/login'}>Log in</Link>
                                    </Trans>
                                </p>
                                <div className="logo-box">
                                    <LogoSvg />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}



export default SignUp;

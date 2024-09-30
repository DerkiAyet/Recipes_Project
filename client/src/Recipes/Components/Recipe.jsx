import React from 'react';
import '../Styles/Recipe.css';
import { Footer } from '../../partials/Components/Footer';
import AuthenticationImg from '../../Assets/authentication_img.png';
import { RecipesBox } from '../../Home/Components/RecipesBox';
import ReactStars from "react-rating-stars-component";
import { IngredientsBox } from './IngredientsBox';
import { InstructionsBox } from './InstructionsBox';
import { NutritionBox } from './NutritionBox';
import { OtherRecepies } from './OtherRecipes';
import { CommentsSection } from './CommentsSection';
import { CommentForm } from './CommentForm';
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";

function Recipe() {

    const { t } = useTranslation();

    return (
        <div className='recipe-container'>
            <div className="recipe-wrapper">
                <div className="url-line">
                    <span>
                        Home &gt; Recipes  &gt;
                        <span className='recipe-name' style={{ fontWeight: "500" }}> name of the recipe :</span>
                    </span>
                </div>

                <h1 className='recipe-title' style={{ textTransform: 'capitalize' }}>
                    Mixed greens with sun-dried tomato Dressing
                </h1>

                <div className="recipe-infos-box1">
                    <div className="infos-box">
                        <div className="info-element">
                            <i class="ri-user-fill"></i>
                            <span>
                                Author name
                            </span>
                        </div>
                        <div className="info-element">
                            <i class="ri-calendar-2-line"></i>
                            <span>
                                Date
                            </span>
                        </div>
                        <div className="info-element">
                            <i class="ri-chat-3-line"></i>
                            <span>
                                comments
                            </span>
                        </div>
                        <div className="info-element">
                            <i class="ri-bookmark-fill"></i>
                            <span>
                                saves
                            </span>
                        </div>
                        <div className="stars-rating">
                            <ReactStars
                                count={5}
                                value={4}
                                size={20}
                                isHalf={true}
                                emptyIcon={<i className="far fa-star"></i>}
                                halfIcon={<i className="fa fa-star-half-alt"></i>}
                                fullIcon={<i className="fa fa-star"></i>}
                                activeColor="#ffd700"
                                color="#A5A5A5"
                                edit={false}
                            />
                            <span>
                                4.0 / 10 {t('recipeBoxRating')}
                            </span>
                        </div>
                    </div>

                    <div className="parameteres-box">
                        <div className="element-box">
                            <i class="ri-bookmark-line"></i>
                        </div>
                        <div className="element-box">
                            <i class="ri-share-line"></i>
                        </div>
                    </div>
                </div>

                <div className="recipe-box">
                    <div className="recipe-img-box">
                        <p className="description">
                            The sky was painted in hues of orange and pink as the sun dipped below the horizon, casting long shadows over the quiet town. A cool breeze rustled through the trees, carrying with it the scent of pine and freshly cut grass. The day had been long and busy, but now, in the fading light, everything seemed to slow down, offering a moment of peace and reflection.
                        </p>
                        <div className="recipe-img">
                            <img
                                src={AuthenticationImg}
                                alt="recipe"
                            />
                        </div>
                    </div>
                    <div className="recipe-infos-box">
                        <div className="recipe-flex recipe-infos-flex1">
                            <div className="recipe-time">
                                <div className="time-box">
                                    <span style={{ fontSize: "1.1rem", color: "#A5A5A5", fontWeight: "500" }}>
                                        {t('prepTime')}
                                    </span>
                                    <span style={{ fontWeight: '600' }}>
                                        1h & 5mins
                                    </span>
                                </div>
                                <div className="time-box">
                                    <span style={{ fontSize: "1.1rem", color: "#A5A5A5", fontWeight: "500" }}>
                                        {t('cookingTime')}
                                    </span>
                                    <span style={{ fontWeight: '600' }}>
                                        1h & 5mins
                                    </span>
                                </div>
                                <div className="time-box">
                                    <span style={{ fontSize: "1.1rem", color: "#A5A5A5", fontWeight: "500" }}>
                                        {t('servings')}
                                    </span>
                                    <span style={{ fontWeight: '600' }}>
                                        1h & 5mins
                                    </span>
                                </div>
                                <button style={{ textTransform: 'capitalize' }}>
                                    <i class="ri-printer-line" style={{ marginRight: '8px', fontSize: "1.2rem" }}></i>
                                    {t('printBtn')}
                                </button>
                            </div>

                            <IngredientsBox />

                            <InstructionsBox />

                            <CommentsSection />

                            <CommentForm />

                            <RecipesBox title={t('otherRecipes')} />
                        </div>
                        <div className="recipe-flex recipe-infos-flex2">
                            <NutritionBox />

                            <OtherRecepies />

                            <NewsletterRecipes />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}


export const NewsletterRecipes = () => {

    const { t } = useTranslation();

    return (
        <div className="newsletter-recipes-box">
            <h2 style={{ fontSize: "30px" }}>
                {t('stayConected')}
            </h2>
            <p style={{ textAlign: 'center', fontSize: "1.1rem", marginBottom: "1rem" }}>
                {t('newsLetterDesc')}
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
                <button type="submit" style={{ width: "100%", marginTop: "2rem" }}>
                    {t('subBtn')}
                </button>
            </form>
        </div>
    )
}

export default Recipe

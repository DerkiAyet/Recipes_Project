import React from "react";
import RecipeImg from '../../Assets/cake.jpeg';
import { ReactComponent as Star } from '../../Assets/star.svg';
import { ReactComponent as StarFill } from '../../Assets/star-fill.svg';
import '../Styles/RecipesBox.css';
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";

export const RecipesBox = ({ title }) => {

    const { t } = useTranslation();

    return (
        <div className="recipes-box-container">
            <div className="recipes-box-wrapper">
                <div className="title">
                    <h1>
                        {title}
                    </h1>
                    <div className="link">
                        {t('viewMore')}
                    </div>
                </div>
                <div className="recipes-cards-box">
                    {
                        Array(6).fill().map(() => (
                            <RecipeCard />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export const RecipeCard = () => {

    const { t } = useTranslation();

    return (
        <div className="recipe-card">
            <div className="recipe-img">
                <img
                    src={RecipeImg}
                    alt="trending recipe"
                />
                <div className="save-box">
                    <i class="ri-bookmark-line recipe-icon"></i>
                </div>
            </div>
            <div className="recipe-infos">
                <div className="stars-rating">
                    <StarFill />
                    <StarFill />
                    <StarFill />
                    <StarFill />
                    <Star />
                    <span style={{ textTransform: 'capitalize', fontSize: "0.8rem" }}>
                        1,123 {t('recipeBoxRating')}
                    </span>
                </div>
                <h3>
                    Strawberry Cake
                </h3>
                <div className="recipe-owner">
                    <div className="owner-line-flex">
                        <img
                            src={RecipeImg}
                            alt=""
                        />
                        <span className="owner-name">
                            user name
                        </span>
                    </div>
                    <div className="comment-box">
                        <i class="ri-chat-3-line" style={{ fontSize: '1.2rem', color: '#B55D51' }}></i>
                        <span style={{ textTransform: 'capitalize' }}>
                            {t('recipeBoxComment')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
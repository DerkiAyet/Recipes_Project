import React from "react";
import ReactStars from "react-rating-stars-component";
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";

export const OtherRecepies = ({ listOfRecipes = [] }) => {

    const { t } = useTranslation();

    return (
        <div className="other-recipes">
            <h2>
                {t('freshRecipes')}
            </h2>
            <div className="recipes-list">
                {
                    listOfRecipes.slice(0, 5).map((recipe) => (
                        <div className="other-recipe-line">
                            <div className="other-recipe-img">
                                <img 
                                src={`http://localhost:3001/uploads/${recipe.recipeImg}`}
                                alt="" 
                                />
                            </div>
                            <div className="other-recipe-infos">
                                <div className="stars-rating">
                                    <ReactStars
                                        count={5}
                                        value={recipe.ratingAvg}
                                        size={20}
                                        isHalf={true}
                                        emptyIcon={<i className="far fa-star"></i>}
                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                        fullIcon={<i className="fa fa-star"></i>}
                                        activeColor="#ffd700"
                                        color="#A5A5A5"
                                        edit={false}
                                    />
                                </div>
                                <span className="other-recipe-title" style={{ fontSize: '1.2rem', fontWeight: '500' }}>
                                    {recipe.title}
                                </span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

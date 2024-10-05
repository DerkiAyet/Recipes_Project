import React from "react";
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";

export const IngredientsBox = ({ ingredients = [] }) => {

    const { t } = useTranslation();

    return (
        <div className="recipe-ingredients">
            <h2>
                {t('recipeIngredients')}:
            </h2>
            {
                ingredients.map((element) => (
                    <div className="ingredient-box">
                        {
                            element.header &&
                            <h4 style={{ fontSize: "20px", marginBottom: '12px' }} className='header'>
                                {element.header}:
                            </h4>
                        }
                        <div className="ingredient">
                            <input type="checkbox" name="" id="" />
                            <span style={{ marginLeft: "12px", fontSize: "1.1rem" }}>
                                {element.ingredient}
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
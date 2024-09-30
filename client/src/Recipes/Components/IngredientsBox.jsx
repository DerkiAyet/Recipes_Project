import React from "react";
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";

export const IngredientsBox = () => {

    const { t } = useTranslation();

    return (
        <div className="recipe-ingredients">
            <h2>
                {t('recipeIngredients')}:
            </h2>
            <div className="ingredient-box">
                <h4 style={{ fontSize: "17px", marginBottom: '12px' }} className='header'>
                    For the crust
                </h4>
                <div className="ingredient">
                    <input type="checkbox" name="" id="" />
                    <span style={{ marginLeft: "12px", fontSize: "1.05rem" }}>
                        400g graham crackers
                    </span>
                </div>
            </div>
            <div className="ingredient-box">

                <div className="ingredient">
                    <input type="checkbox" name="" id="" />
                    <span style={{ marginLeft: "12px", fontSize: "1.05rem" }}>
                        400g graham crackers
                    </span>
                </div>
            </div>
        </div>
    )
}
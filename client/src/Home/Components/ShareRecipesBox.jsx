import React from "react";
import ShareImg from '../../Assets/share-recipe.jpeg';
import '../Styles/ShareRecipesBox.css'
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";

export const ShareRecipesBox = () => {

  const { t } = useTranslation();

  return (

    <div className="share-receipes-container">
      <div className="share-recipes-wrapper">
        <div className="img-box">
          <img
            src={ShareImg}
            alt="share recipe" />
        </div>
        <div className="content-box">
          <h1>
            {t('shareRecipes')}
          </h1>
          <p>
            {t('shareContent')}
          </p>
          <button>
            {t('shareBtn')}
          </button>
        </div>
      </div>
    </div>
  )
}
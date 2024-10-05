import React from "react";
import ShareImg from '../../Assets/share-recipe.jpeg';
import '../Styles/ShareRecipesBox.css'
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

export const ShareRecipesBox = () => {

  const { t } = useTranslation();

  const navigate = useNavigate();

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
          <button onClick={() => navigate('/add-recipe')}>
            {t('shareBtn')}
          </button>
        </div>
      </div>
    </div>
  )
}
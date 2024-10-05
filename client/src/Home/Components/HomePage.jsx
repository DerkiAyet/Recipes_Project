import React, { useContext } from 'react'
import '../Styles/HomePage.css';
import VectorImg from '../../Assets/vector_color.png';
import { IntroBox } from './IntroBox';
import { Footer } from '../../partials/Components/Footer';
import { ShareRecipesBox } from './ShareRecipesBox';
import { RecipesBox } from './RecipesBox';
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";
import { AppContext } from '../../App';

function HomePage() {

  const { t } = useTranslation();

  const { userAuth, recipes = [] } = useContext(AppContext);

  return (
    <div className='homepage-container'>
      <div className="homepage-wrapper">
        <div className="img-decoration">
          <img src={VectorImg} alt="logo" />
        </div>
        <div className="decoration" style={{ marginTop: '90px' }} />
        {
          !userAuth.state && <IntroBox />
        }
        <ShareRecipesBox />
      </div>
      <RecipesBox
        title={t('trendingRecipes')}
        listOfRecipes={recipes}
      />
      <NewsLetterBox />
      <RecipesBox
        title={t('exploreRecipe')}
        listOfRecipes={recipes}
      />
      <Footer />
    </div>
  )
}

export const NewsLetterBox = () => {

  const { t } = useTranslation();

  return (
    <div className="newsletter-container">
      <h1>
        {t('newsLetterTitle')}
      </h1>
      <p>
        {t('newsLetterDesc')}
      </p>
      <form action="">
        <div className="input-line-box">
          <i className="ri-mail-line input-icon"></i>
          <input
            className="input-line"
            type='email'
            autoComplete="off"
            placeholder={t('emailPlaceholder')}
          />
        </div>
        <button type="submit">
          {t('subBtn')}
        </button>
      </form>
    </div>
  )
}

export default HomePage

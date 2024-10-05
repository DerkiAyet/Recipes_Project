import React, { useContext, useState } from 'react';
import '../Styles/Recipes.css';
import { Footer } from '../../partials/Components/Footer';
import ReactStars from "react-rating-stars-component";
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';

function Recipes() {

  const { t } = useTranslation();

  const [searchInput, setSearchInput] = useState('')

  const deleteSearchContent = () => setSearchInput('')



  const { recipes = [] } = useContext(AppContext);

  const filteredRecipes = recipes.filter((recipe) => {
    return (
      recipe.title.toLowerCase().startsWith(searchInput) ||
      recipe.collection.toLowerCase().startsWith(searchInput) ||
      recipe.cuisine.toLowerCase().startsWith(searchInput) ||
      recipe.mainIngredient.toLowerCase().startsWith(searchInput)
    )
  })

  const [numberOfRecipes, setNumberOfRecipes] = useState(12);

  const loadMore = () => setNumberOfRecipes((prevNumber) => prevNumber + 12);


  return (
    <div className='recipes-main-container'>
      <div className="recipes-main-wrapper">
        <h1>
          {t('recipePageTitle')}
        </h1>
        <div className="search-form">
          <input
            type="text"
            name="search-input"
            id="search-input"
            placeholder={t('searchInput')}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <div className="search-results-box">
            {
              searchInput === '' ?
                <i class="ri-search-2-line search-icon"></i>
                :
                <>
                  <span style={{ fontSize: "0.9rem" }}>{t('searchResults', { count: filteredRecipes.length })}</span>
                  <i class="ri-close-line" onClick={deleteSearchContent} style={{ fontSize: '1.6rem', cursor: 'pointer' }}></i>
                </>
            }
          </div>
        </div>

        <div className="recipe-cards-container">
          {
            filteredRecipes.slice(0, numberOfRecipes).map((recipe) => (
              <RecipeCard
                recipeId={recipe._id}
                title={recipe.title}
                recipeImg={recipe.recipeImg}
                mainIngredient={recipe.mainIngredient}
                ratingAvg={recipe.ratingAvg}
                ratingsCount={recipe.ratingsCount}
              />
            ))
          }
        </div>
        {
          (numberOfRecipes <= filteredRecipes.length || filteredRecipes.length > 12) &&
          <button className="load-btn" onClick={loadMore} style={{ textTransform: 'capitalize' }}>
            {t('loadMore')}
          </button>
        }
      </div>
      <Footer />
    </div>
  )
}

export const RecipeCard = ({ recipeId, title, recipeImg, mainIngredient, ratingAvg, ratingsCount }) => {

  const { t } = useTranslation();

  const navigate = useNavigate();

  return (
    <div className="recipe-page-card">
      <div className="recipe-card-img">
        <img
          src={`http://localhost:3001/uploads/${recipeImg}`}
          alt="recipe suggestion"
          onClick={() => navigate(`/recipes/${recipeId}`)}
        />
      </div>
      <div className="recipee-card-infos">
        <h5 style={{ color: "#878787", marginBottom: "3px", fontSize: "15px" }}>
          {mainIngredient}
        </h5>
        <h3 onClick={() => navigate(`/recipes/${recipeId}`)}>
          {title}
        </h3>
        <div className="stars-rating">
          <ReactStars
            count={5}
            value={ratingAvg}
            size={20}
            isHalf={true}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
            color="#A5A5A5"
            edit={false}
          />
          <span style={{ textTransform: "capitalize", fontSize: '0.8rem' }}>
            {ratingAvg} / {ratingsCount} {t('recipeBoxRating')}
          </span>
        </div>
      </div>

    </div>
  )
}

export default Recipes

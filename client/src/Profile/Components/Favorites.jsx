import React, { useState } from 'react';
import '../Styles/Favorites.css';
import { Footer } from '../../partials/Components/Footer';
import AuthenticationImg from '../../Assets/authentication_img.png';
import ReactStars from "react-rating-stars-component";
import '../../partials/Components/i18n';
import { useTranslation } from 'react-i18next';

function Favorites() {

  const { t } = useTranslation();

  const recipes = [
    {
      title: "Spaghetti alla Carbonara",
      collection: "Dinner",
      cuisineType: "Italian",
      mainIngredient: "Poultry-Based"
    },
    {
      title: "Sweet and Sour Chicken",
      collection: "Lunch",
      cuisineType: "Chinese",
      mainIngredient: "Meat-Based"
    },
    {
      title: "Coq au Vin",
      collection: "Brunch",
      cuisineType: "French",
      mainIngredient: "Poultry-Based"
    },
    {
      title: "Sushi Rolls",
      collection: "Appetizers",
      cuisineType: "Japanese",
      mainIngredient: "Seafood"
    },
    {
      title: "Tacos al Pastor",
      collection: "Snacks",
      cuisineType: "Mexican",
      mainIngredient: "Meat-Based"
    },
    {
      title: "Paneer Butter Masala",
      collection: "Dinner",
      cuisineType: "Indian",
      mainIngredient: "Dairy-Based"
    },
    {
      title: "Pad Thai",
      collection: "Lunch",
      cuisineType: "Thai",
      mainIngredient: "Grain-Based"
    },
    {
      title: "Paella",
      collection: "Supper",
      cuisineType: "Spanish",
      mainIngredient: "Seafood"
    },
    {
      title: "Greek Salad",
      collection: "Breakfast",
      cuisineType: "Greek",
      mainIngredient: "Vegetarian"
    },
    {
      title: "Kimchi Stew",
      collection: "Less than 30 minutes",
      cuisineType: "Korean",
      mainIngredient: "Fermented (Kimchi, miso...)"
    },
    {
      title: "Margherita Pizza",
      collection: "Dinner",
      cuisineType: "Italian",
      mainIngredient: "Vegetarian"
    },
    {
      title: "General Tso's Chicken",
      collection: "Lunch",
      cuisineType: "Chinese",
      mainIngredient: "Poultry-Based"
    },
    {
      title: "Quiche Lorraine",
      collection: "Breakfast",
      cuisineType: "French",
      mainIngredient: "Egg-Based"
    },
    {
      title: "Ramen Noodles",
      collection: "Supper",
      cuisineType: "Japanese",
      mainIngredient: "Grain-Based"
    },
    {
      title: "Churros with Chocolate",
      collection: "Desserts",
      cuisineType: "Mexican",
      mainIngredient: "Vegetarian"
    },
    {
      title: "Chicken Tikka Masala",
      collection: "Dinner",
      cuisineType: "Indian",
      mainIngredient: "Poultry-Based"
    },
    {
      title: "Green Curry",
      collection: "Lunch",
      cuisineType: "Thai",
      mainIngredient: "Vegetarian"
    },
    {
      title: "Tortilla Española",
      collection: "Snacks",
      cuisineType: "Spanish",
      mainIngredient: "Egg-Based"
    },
    {
      title: "Spanakopita",
      collection: "Appetizers",
      cuisineType: "Greek",
      mainIngredient: "Vegetarian"
    },
    {
      title: "Hummus with Pita",
      collection: "Appetizers",
      cuisineType: "Middle Eastern Cuisine",
      mainIngredient: "Vegetarian"
    },
    {
      title: "Baklava",
      collection: "Desserts",
      cuisineType: "Turkish",
      mainIngredient: "Grain-Based"
    },
    {
      title: "Bibimbap",
      collection: "Dinner",
      cuisineType: "Korean",
      mainIngredient: "Vegetarian"
    },
    {
      title: "Cheeseburger",
      collection: "Lunch",
      cuisineType: "American",
      mainIngredient: "Meat-Based"
    },
    {
      title: "Feijoada",
      collection: "Supper",
      cuisineType: "Brazilian",
      mainIngredient: "Meat-Based"
    }
  ];

  const [numberOfRecipes, setNumberOfRecipes] = useState(12);

  const loadMore = () => setNumberOfRecipes((prevNumber) => prevNumber + 12);

  return (
    <div className='favorites-main-container'>
      <div className="favorites-main-wrapper">
        <h1 style={{ textTransform: 'capitalize' }}>
          {t('favoritesTitle')}
        </h1>
        <div className="recipe-cards-container">
          {
            recipes.slice(0, numberOfRecipes).map((recipe) => (
              <RecipeCard title={recipe.title} mainIngredient={recipe.mainIngredient} />
            ))
          }
        </div>
        {
          (numberOfRecipes < recipes.length || recipes.length <= 12) &&
          <button className="load-btn" onClick={loadMore} style={{ textTransform: 'capitalize' }}>
            {t('loadMore')}
          </button>
        }
      </div>
      <Footer />
    </div>
  )
}

export const RecipeCard = ({ title, mainIngredient }) => {

  const { t } = useTranslation()

  return (
    <div className="recipe-page-card">
      <div className="recipe-card-img">
        <img
          src={AuthenticationImg}
          alt="recipe suggestion"
        />
        <div className="share-box">
          <i class="ri-bookmark-fill"></i>
        </div>
      </div>
      <div className="recipee-card-infos">
        <h5 style={{ color: "#878787", marginBottom: "3px", fontSize: "15px" }}>
          {mainIngredient}
        </h5>
        <h3>
          {title}
        </h3>
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
          <span style={{ textTransform: 'capitalize', fontSize: "0.8rem" }}>
            4.0 / 10 {t('recipeBoxRating')}
          </span>
        </div>
      </div>

    </div>
  )
}

export default Favorites

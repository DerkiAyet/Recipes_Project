import React, { useContext, useEffect, useState } from 'react';
import '../Styles/MyRecipes.css';
import { Footer } from '../../partials/Components/Footer';
import ReactStars from "react-rating-stars-component";
import '../../partials/Components/i18n';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyRecipes() {

    const { t } = useTranslation();

    const [numberOfRecipes, setNumberOfRecipes] = useState(12);

    const [ userRecipes, setUserRecipes ] = useState([]);

    useEffect(() => {
       
        axios.defaults.withCredentials = true;

        axios.get('http://localhost:3001/recipes/getUserRecipes')
        .then((res) => setUserRecipes(res.data))
        .catch((err) => console.error(err.response.data))

    }, [])

    const loadMore = () => setNumberOfRecipes((prevNumber) => prevNumber + 12);

    return (
        <div className='myrecipes-container'>
            <div className="myrecipes-wrapper">
                <h1 style={{ textTransform: 'capitalize' }}>
                    {t('myRecipes')}
                </h1>
                <div className="recipe-cards-container">
                    {
                        userRecipes.slice(0, numberOfRecipes).map((recipe) => (
                            <RecipeCard
                                recipeId={recipe._id}
                                title={recipe.title}
                                mainIngredient={recipe.mainIngredient}
                                ratingAvg={recipe.ratingAvg}
                                ratingsCount={recipe.ratingsCount}
                                recipeImg={recipe.recipeImg}
                            />
                        ))
                    }
                </div>
                {
                    (numberOfRecipes < userRecipes.length || userRecipes.length > 12) &&
                    <button className="load-btn" onClick={loadMore} style={{ textTransform: 'capitalize' }}>
                        {t('loadMore')}
                    </button>
                }
            </div>
            <Footer />
        </div>
    )
}

export const RecipeCard = ({ recipeId, title, mainIngredient, ratingAvg, ratingsCount, recipeImg }) => {

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
                    <span style={{ textTransform: 'capitalize', fontSize: "0.8rem" }}>
                        {ratingAvg} / {ratingsCount} {t('recipeBoxRating')}
                    </span>
                </div>
            </div>

        </div>
    )
}

export default MyRecipes

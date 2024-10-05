import React, { useContext } from "react";
import '../Styles/RecipesBox.css';
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../App";
import axios from "axios";

export const RecipesBox = ({ title, listOfRecipes = [] }) => {

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
                        listOfRecipes.slice(0, 6).map((recipe) => (
                            <RecipeCard
                                recipeId={recipe._id}
                                recipeTitle={recipe.title}
                                recipeImg={recipe.recipeImg}
                                ratingsCount={recipe.ratingsCount}
                                ratingAvg={recipe.ratingAvg}
                                commentsCount={recipe.commentsCount}
                                recipeUser={recipe.userFullName}
                                recipeUserImg={recipe.userImg}
                            />
                        ))

                    }
                </div>
            </div>
        </div>
    )
}

export const RecipeCard = ({ recipeId, recipeTitle, recipeImg, ratingsCount, ratingAvg, commentsCount, recipeUser, recipeUserImg }) => {

    const { t } = useTranslation();

    const navigate = useNavigate();

    const { savings, setSavings } = useContext(AppContext);

    const save = () => {

        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/savings/saveRecipe', { recipeId: recipeId })
            .then((res) => {
                if (res.data.messageCreate) {
                    setSavings((prevSavings) => [...prevSavings, res.data.newSaving])
                } else {
                    setSavings((prevSavings => prevSavings.filter((save) => save.recipeId !== recipeId)))
                }
            })
            .catch((err) => console.error(err.response.data))

    }

    return (
        <div className="recipe-card">
            <div className="recipe-img">
                <img
                    src={`http://localhost:3001/uploads/${recipeImg}`}
                    alt="trending recipe"
                    onClick={() => navigate(`/recipes/${recipeId}`)}
                />
                <div className="save-box">
                    <i
                        class={`recipe-icon ${savings?.find((save) => save.recipeId === recipeId) ? "ri-bookmark-fill" : "ri-bookmark-line"}`}
                        onClick={() => save()}
                    ></i>
                </div>
            </div>
            <div className="recipe-infos">
                <div className="stars-rating">
                    <ReactStars
                        count={5}
                        value={ratingAvg}
                        size={18}
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                        color="#A5A5A5"
                        edit={false}
                    />
                    <span style={{ textTransform: 'capitalize', fontSize: "0.8rem" }}>
                        {ratingsCount} {t('recipeBoxRating')}
                    </span>
                </div>
                <h3 style={{ cursor: 'pointer' }} onClick={() => navigate(`/recipes/${recipeId}`)}>
                    {recipeTitle}
                </h3>
                <div className="recipe-owner">
                    <div className="owner-line-flex">
                        <img
                            src={recipeUserImg ? `http://localhost:3001/uploads/${recipeUserImg}` : '/default_picture.jpeg'}
                            alt=""
                        />
                        <span className="owner-name">
                            {recipeUser}
                        </span>
                    </div>
                    <div className="comment-box">
                        <i class="ri-chat-3-line" style={{ fontSize: '1.2rem', color: '#B55D51' }}></i>
                        <span style={{ textTransform: 'capitalize' }}>
                            {commentsCount} {t('recipeBoxComment')}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
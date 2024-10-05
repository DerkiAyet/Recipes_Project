import React, { createContext, useContext, useEffect, useState } from 'react';
import '../Styles/Recipe.css';
import { Footer } from '../../partials/Components/Footer';
import { RecipesBox } from '../../Home/Components/RecipesBox';
import ReactStars from "react-rating-stars-component";
import { IngredientsBox } from './IngredientsBox';
import { InstructionsBox } from './InstructionsBox';
import { NutritionBox } from './NutritionBox';
import { OtherRecepies } from './OtherRecipes';
import { CommentsSection } from './CommentsSection';
import { CommentForm } from './CommentForm';
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../App';

export const RecipeContext = createContext();

function Recipe() {

    const { t } = useTranslation();

    const { id } = useParams();

    const [recipe, setRecipe] = useState({})

    const [comments, setComments] = useState([])

    const { ratings, setSavings, savings, recipes } = useContext(AppContext)

    useEffect(() => {

        axios.get(`http://localhost:3001/recipes/getRecipe/${id}`)
            .then((res) => {
                setRecipe(res.data)
            })
            .catch((err) => console.error(err.response.data))

        axios.get(`http://localhost:3001/comments/getRecipeComments/${id}`)
            .then((res) => setComments(res.data))
            .catch((err) => console.error(err.response.data))

    }, [id])

    const creationTimestamp = recipe.createdAt;

    const createdAt = new Date(creationTimestamp);

    const year = createdAt.getFullYear();
    const month = String(createdAt.getMonth() + 1).padStart(2, '0');
    const day = String(createdAt.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`; // YYYY-MM-DD

    const textWithLineBreaks = (text) => {
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    const userRated = ratings.find((rating) => rating.recipeId === id)

    console.log(ratings);

    const save = () => {

        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/savings/saveRecipe', { recipeId: recipe._id })
            .then((res) => {
                if (res.data.messageCreate) {
                    setSavings((prevSavings) => [...prevSavings, res.data.newSaving])
                    setRecipe({ ...recipe, savingsCount: recipe.savingsCount + 1 })
                } else {
                    setSavings((prevSavings => prevSavings.filter((save) => save.recipeId !== recipe._id)))
                    setRecipe({ ...recipe, savingsCount: recipe.savingsCount - 1 })
                }
            })
            .catch((err) => console.error(err.response.data))

    }

    return (
        <RecipeContext.Provider value={{ comments, setComments, setRecipe }}>
            <div className='recipe-container'>
                <div className="recipe-wrapper">
                    <div className="url-line">
                        <span>
                            Home &gt; Recipes  &gt;
                            <span className='recipe-name' style={{ fontWeight: "500" }}> {recipe.title} :</span>
                        </span>
                    </div>

                    <h1 className='recipe-title' style={{ textTransform: 'capitalize' }}>
                        {recipe.title}
                    </h1>

                    <div className="recipe-infos-box1">
                        <div className="infos-box">
                            <div className="info-element">
                                <i class="ri-user-fill"></i>
                                <span>
                                    {recipe.userOwner?.fullName || "Unknown User"}
                                </span>
                            </div>
                            <div className="info-element">
                                <i class="ri-calendar-2-line"></i>
                                <span>
                                    {formattedDate}
                                </span>
                            </div>
                            <div className="info-element">
                                <i class="ri-chat-3-line"></i>
                                <span>
                                    {recipe.commentsCount} {t('recipeBoxComment')}
                                </span>
                            </div>
                            <div className="info-element">
                                <i class="ri-bookmark-fill"></i>
                                <span>
                                    {recipe.savingsCount} {t('saveBtn')}
                                </span>
                            </div>
                            <div className="stars-rating">
                                <ReactStars
                                    count={5}
                                    value={Number(recipe.averageRating)}
                                    size={20}
                                    isHalf={true}
                                    emptyIcon={<i className="far fa-star"></i>}
                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                    fullIcon={<i className="fa fa-star"></i>}
                                    activeColor="#ffd700"
                                    color="#A5A5A5"
                                    edit={false}
                                />
                                <span>
                                    {recipe.averageRating} / {recipe.ratingCount} {t('recipeBoxRating')}
                                </span>
                            </div>
                        </div>

                        <div className="parameteres-box">
                            <div className="element-box">
                                <i class={savings.find((save) => save.recipeId === recipe._id) ? "ri-bookmark-fill" : "ri-bookmark-line"} onClick={() => save()}></i>
                            </div>
                            <div className="element-box">
                                <i class="ri-share-line"></i>
                            </div>
                        </div>
                    </div>

                    <div className="recipe-box">
                        <div className="recipe-img-box">
                            <p className="description">
                                {textWithLineBreaks(recipe.description || "")}
                            </p>
                            <div className="recipe-img">
                                <img
                                    src={`http://localhost:3001/uploads/${recipe.recipeImg}`}
                                    alt="recipe"
                                />
                            </div>
                        </div>
                        <div className="recipe-infos-box">
                            <div className="recipe-flex recipe-infos-flex1">
                                <div className="recipe-time">
                                    <div className="time-box">
                                        <span style={{ fontSize: "1.1rem", color: "#A5A5A5", fontWeight: "500" }}>
                                            {t('prepTime')}
                                        </span>
                                        <span style={{ fontWeight: '600' }}>
                                            {(recipe.prepTime && recipe.prepTime.hours ? recipe.prepTime.hours : 0)}h & {(recipe.prepTime && recipe.prepTime.minutes ? recipe.prepTime.minutes : 0)}mins
                                        </span>
                                    </div>
                                    <div className="time-box">
                                        <span style={{ fontSize: "1.1rem", color: "#A5A5A5", fontWeight: "500" }}>
                                            {t('cookingTime')}
                                        </span>
                                        <span style={{ fontWeight: '600' }}>
                                            {(recipe.cookTime && recipe.cookTime.hours ? recipe.cookTime.hours : 0)}h & {(recipe.cookTime && recipe.cookTime.minutes ? recipe.cookTime.minutes : 0)}mins
                                        </span>
                                    </div>
                                    <div className="time-box">
                                        <span style={{ fontSize: "1.1rem", color: "#A5A5A5", fontWeight: "500" }}>
                                            {t('servings')}
                                        </span>
                                        <span style={{ fontWeight: '600' }}>
                                            {(recipe.servings && recipe.servings)}
                                        </span>
                                    </div>
                                    <button style={{ textTransform: 'capitalize' }}>
                                        <i class="ri-printer-line" style={{ marginRight: '8px', fontSize: "1.2rem" }}></i>
                                        {t('printBtn')}
                                    </button>
                                </div>

                                <IngredientsBox
                                    ingredients={recipe.ingredients}
                                />

                                <InstructionsBox
                                    instructions={recipe.instructions}
                                />

                                <CommentsSection
                                    comments={comments}
                                />

                                <CommentForm
                                    recipeId={recipe._id}
                                    ratingValue={userRated ? userRated.rating : 0}
                                />

                                <RecipesBox
                                    title={t('otherRecipes')}
                                    listOfRecipes={recipes.filter((recip) => recip.mainIngredient === recipe.mainIngredient)}
                                />
                            </div>
                            <div className="recipe-flex recipe-infos-flex2">
                                <NutritionBox />

                                <OtherRecepies
                                    listOfRecipes={recipes}
                                />

                                <NewsletterRecipes />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </RecipeContext.Provider>
    )
}


export const NewsletterRecipes = () => {

    const { t } = useTranslation();

    return (
        <div className="newsletter-recipes-box">
            <h2 style={{ fontSize: "30px" }}>
                {t('stayConected')}
            </h2>
            <p style={{ textAlign: 'center', fontSize: "1.1rem", marginBottom: "1rem" }}>
                {t('newsLetterDesc')}
            </p>
            <form className='newsletter-form'>
                <div className="input-line-box">
                    <i className="ri-mail-line input-icon"></i>
                    <input
                        className="input-line"
                        type='email'
                        autoComplete="off"
                        placeholder={t('emailPlaceholder')}
                    />
                </div>
                <button type="submit" style={{ width: "100%", marginTop: "2rem" }}>
                    {t('subBtn')}
                </button>
            </form>
        </div>
    )
}

export default Recipe

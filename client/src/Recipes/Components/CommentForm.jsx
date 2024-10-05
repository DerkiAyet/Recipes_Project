import React, { useContext, useState } from "react";
import ReactStars from "react-rating-stars-component";
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";
import axios from "axios";
import { AppContext } from '../../App';
import { RecipeContext } from "./Recipe";

export const CommentForm = ({ recipeId, ratingValue }) => {

    const { t } = useTranslation();

    const { setRecipes, userAuth } = useContext(AppContext);

    const { setComments, setRecipe } = useContext(RecipeContext);

    const ratingChanged = (newRating) => {

        axios.defaults.withCredentials = true;

        axios.post(`http://localhost:3001/ratings/addRating/${recipeId}`, { rating: newRating })
            .then((res) => {
                if (res.data.modify) {
                    console.log(res.data.newAvg)
                } else {
                    setRecipes((prevRecipes) => {
                        return prevRecipes.map((recipe) => {
                            if (recipe._id === recipeId) {
                                return {
                                    ...recipe,
                                    ratingAvg: ((recipe.ratingAvg || 0) * recipe.ratingsCount + newRating) / (recipe.ratingsCount + 1),
                                    ratingsCount: recipe.ratingsCount + 1,
                                };
                            }
                            return recipe;
                        });
                    })
                }
            })
            .catch((err) => console.error(err.response.data))
    };

    const [newComment, setNewComment] = useState('')

    const addComment = (e) => {
        e.preventDefault();

        axios.defaults.withCredentials = true;

        axios.post(`http://localhost:3001/comments/addComment/${recipeId}`, { commentText: newComment })
            .then((res) => {
                setComments((prevComments) => [...prevComments, {
                    ...res.data,
                    userOwner: {
                        fullName: userAuth.fullName,
                        userImg: userAuth.userImg
                    }
                }])

                setRecipe((prevRecipe) => ({ ...prevRecipe, commentsCount: prevRecipe.commentsCount + 1 }))
            })
            .catch((err) => console.error(err.response.data))
    }

    return (
        <div className="comment-review-form">
            <h2 style={{ marginBottom: "2rem" }}>
                {t('rateShare')}
            </h2>
            <div className="rating-stars">
                <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    value={ratingValue}
                    size={30}
                    isHalf={true}
                    emptyIcon={<i className="far fa-star"></i>}
                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                    fullIcon={<i className="fa fa-star"></i>}
                    activeColor="#ffd700"
                    color="#A5A5A5"
                />
            </div>
            <form onSubmit={addComment}>
                <textarea
                    name='comment'
                    placeholder='Type here..'
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit" style={{ textTransform: "capitalize" }}>
                    {t('post')}
                </button>
            </form>
        </div>
    )
}
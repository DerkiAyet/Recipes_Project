import React from "react";
import ReactStars from "react-rating-stars-component";
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";

export const CommentForm = () => {

    const { t } = useTranslation();

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };
    return (
        <div className="comment-review-form">
            <h2>
                {t('rateShare')}
            </h2>
            <ReactStars
                count={5}
                onChange={ratingChanged}
                size={30}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
                color="#A5A5A5"
            />
            <form action="">
                <textarea
                    name='comment'
                    placeholder='Type here..'
                />
                <button type="submit" style={{ textTransform: "capitalize" }}>
                    {t('post')}
                </button>
            </form>
        </div>
    )
}
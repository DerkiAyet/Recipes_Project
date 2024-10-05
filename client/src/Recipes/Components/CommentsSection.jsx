import React, { useState } from "react";
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";

export const CommentsSection = ({ comments = [] }) => {

    const { t } = useTranslation();

    return (
        <div className="comments-section">
            <h2>
                {t('recipeBoxComment')}
            </h2>
            <div className="comments-container">
                {
                    comments.length === 0 ?
                        <div className="no-comments-box">
                            <h1 style={{ fontSize: "50px", fontWeight: '500' }}>
                                No Comments yet.
                            </h1>
                            <span style={{ marginTop: "1.5rem", fontSize: "1.3rem", textDecoration: "underline" }}>
                                Send a comment.
                            </span>
                        </div>
                        :
                        comments.map((comment) => (
                            <CommentLine
                                text={comment.commentText}
                                userFullName={comment.userOwner.fullName}
                                userImg={comment.userOwner.userImg}
                            />
                        ))
                }

            </div>
        </div>
    )
}

const CommentLine = ({ text, userFullName, userImg }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 150;

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const formatTextWithLineBreaks = (text) => {
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <div className="comment-line">
            <div className="user-account">
                <img
                    src={userImg ? `http://localhost:3001/uploads/${userImg}` : '/default_picture.jpeg'}
                    alt=""
                />
            </div>
            <div className="comment-body">
                <div className="userName-line">
                    <span style={{ fontWeight: "500" }}>{userFullName}</span>
                    <i class="ri-more-fill"></i>
                </div>
                <p className="comment" style={{ lineHeight: '1.6' }}>
                    {text.length > maxLength && !isExpanded
                        ? `${text.substring(0, maxLength)}...`
                        : formatTextWithLineBreaks(text)}
                    {text.length > maxLength && (
                        <span className="read-more" style={{ fontWeight: "500", cursor: "pointer", color: "#974E44" }} onClick={toggleReadMore}>
                            {isExpanded ? ' less' : ' more'}
                        </span>
                    )}
                </p>
            </div>
        </div>
    )
}
import React, { useState } from "react";
import AuthenticationImg from '../../Assets/authentication_img.png';
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";

export const CommentsSection = () => {

    const { t } = useTranslation();

    const noComments = false;

    const text = `The rain tapped softly against the window, creating a soothing rhythm that filled the quiet room.
                Outside, the streets glistened under the streetlights, their surfaces shimmering with the fresh rain.
                It was one of those peaceful nights when time seemed to slow, and the world felt distant,
                allowing a moment of stillness to settle in. Inside, a cup of tea steamed gently,
                adding warmth to the calm atmosphere.`

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
        <div className="comments-section">
            <h2>
            {t('recipeBoxComment')}
            </h2>
            <div className="comments-container">
                {
                    noComments &&
                    <div className="no-comments-box">
                        <h1 style={{ fontSize: "50px", fontWeight: '500' }}>
                            No Comments yet.
                        </h1>
                        <span style={{ marginTop: "1.5rem", fontSize: "1.3rem", textDecoration: "underline" }}>
                            Send a comment.
                        </span>
                    </div>
                }
                <div className="comment-line">
                    <div className="user-account">
                        <img src={AuthenticationImg} alt="" />
                    </div>
                    <div className="comment-body">
                        <div className="userName-line">
                            <span style={{ fontWeight: "500" }}>username</span>
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
                <div className="comment-line">
                    <div className="user-account">
                        <img src={AuthenticationImg} alt="" />
                    </div>
                    <div className="comment-body">
                        <div className="userName-line">
                            <span style={{ fontWeight: "500" }}>username</span>
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
                <div className="comment-line">
                    <div className="user-account">
                        <img src={AuthenticationImg} alt="" />
                    </div>
                    <div className="comment-body">
                        <div className="userName-line">
                            <span style={{ fontWeight: "500" }}>username</span>
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
                <div className="comment-line">
                    <div className="user-account">
                        <img src={AuthenticationImg} alt="" />
                    </div>
                    <div className="comment-body">
                        <div className="userName-line">
                            <span style={{ fontWeight: "500" }}>username</span>
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

            </div>
        </div>
    )
}
import React from "react";
import AuthenticationImg from '../../Assets/authentication_img.png';
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";

export const InstructionsBox = () => {

    const { t } = useTranslation();

    return (
        <div className="recipe-instructions">
            <h2>
                {t('instructions')}:
            </h2>

            <Instruction />
            <Instruction />
        </div>
    )
}

const Instruction = () => {

    const { t } = useTranslation();

    return (
        <div className="step">
            <h4 style={{ fontSize: "24px", marginBottom: '12px', textTransform: 'capitalize' }} className='header'>
                {t('step')} 1
            </h4>
            <div className="step-img">
                <img src={AuthenticationImg} alt="" />
            </div>
            <p className="instruction" style={{ color: "#000" }}>
                The rain tapped softly against the window,
                creating a soothing rhythm that filled the quiet room.
                Outside, the streets glistened under the streetlights,
                their surfaces shimmering with the fresh rain.
                It was one of those peaceful nights when time seemed to slow,
                and the world felt distant, allowing a moment of stillness to settle in.
                Inside, a cup of tea steamed gently, adding warmth to the calm atmosphere.
            </p>
        </div>
    )
}
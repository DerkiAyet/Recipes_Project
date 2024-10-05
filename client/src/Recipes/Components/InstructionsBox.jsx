import React from "react";
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";

export const InstructionsBox = ({ instructions = [] }) => {

    const { t } = useTranslation();

    return (
        <div className="recipe-instructions">
            <h2>
                {t('instructions')}:
            </h2>

            {
                instructions.map((instruction, index) => (
                    <Instruction
                        number={index + 1}
                        stepContent={instruction}
                    />
                ))
            }
        </div>
    )
}

const Instruction = ({ number, stepContent }) => {

    const { t } = useTranslation();

    const textWithLineBreaks = (text) => {
        return text.split('\n').map((line, index) => (
            <React.Fragment key={index}>
                {line}
                <br />
            </React.Fragment>
        ));
    };

    return (
        <div className="step">
            <h4 style={{ fontSize: "24px", marginBottom: '12px', textTransform: 'capitalize' }} className='header'>
                {t('step')} { number }
            </h4>
            <p className="instruction" style={{ color: "#000", fontSize: "18px", marginLeft: "10px" }}>
                { textWithLineBreaks(stepContent || "") }
            </p>
        </div>
    )
}
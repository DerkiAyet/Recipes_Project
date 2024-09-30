import React from "react";
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";

export const NutritionBox = () => {

    const { t } = useTranslation();

    return (
        <div className="neutrition-facts-box">
            <h2>
            {t('neutritionFacts')}
            </h2>
            <ul>
                <li>
                    <span style={{ color: "#878787", textTransform: 'capitalize' }}>{t('calories')}</span>
                    <span>219.9</span>
                </li>
                <li>
                    <span style={{ color: "#878787", textTransform: 'capitalize' }}>{t('totalFat')}</span>
                    <span>10.7g</span>
                </li>
                <li>
                    <span style={{ color: "#878787", textTransform: 'capitalize' }}>{t('saturatedFat')}</span>
                    <span>2.2g</span>
                </li>
                <li>
                    <span style={{ color: "#878787", textTransform: 'capitalize' }}>{t('cholesterol')}</span>
                    <span>37.4mg</span>
                </li>
                <li>
                    <span style={{ color: "#878787", textTransform: 'capitalize' }}>{t('sodium')}</span>
                    <span>120.3mg</span>
                </li>
                <li>
                    <span style={{ color: "#878787", textTransform: 'capitalize' }}>{t('Potassium')}</span>
                    <span>32.8mg</span>
                </li>
                <li>
                    <span style={{ color: "#878787", textTransform: 'capitalize' }}>{t('totalCarbohydrate')}</span>
                    <span>22.3g</span>
                </li>
                <li>
                    <span style={{ color: "#878787", textTransform: 'capitalize' }}>{t('sugars')}</span>
                    <span>8.5g</span>
                </li>
                <li>
                    <span style={{ color: "#878787", textTransform: 'capitalize' }}>{t('protein')}</span>
                    <span>7.9g</span>
                </li>
            </ul>
        </div>
    )
}

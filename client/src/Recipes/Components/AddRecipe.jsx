import React, { useState, useRef } from 'react';
import '../Styles/AddRecipe.css';
import { Footer } from '../../partials/Components/Footer';
import AddPhoto from '../../Assets/authentication_img.png';
import CameraIcon from '../../Assets/camera-icon.jpeg';
import '../../partials/Components/i18n'
import { useTranslation } from "react-i18next";

function AddRecipe() {

    const { t } = useTranslation();

    //--------------recipe Img---------------

    const [imageSelected, setImageSelected] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setRecipe({ ...recipe, recipeImg: file })
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSelected(reader.result)
            };
            reader.readAsDataURL(file); // used to convert the image into a an url so we can display it in our website
        }
    };

    const [recipe, setRecipe] = useState({
        title: "",
        recipeImg: "",
        description: "",
        ingredients: [],
        steps: [],
        servings: 0,
        cookingTime: {
            hours: 0,
            minutes: 0
        },
        prepTime: {
            hours: 0,
            minutes: 0
        },
        cuisine: "",
        collection: "",
        mainIngredient: ""
    })

    //----------------------Recipe Ingredients------------

    const addIngredient = (e) => {
        e.preventDefault()
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, { header: null, ingredient: "" }] })
    }

    const addHeaderIngredient = (e) => {
        e.preventDefault()
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, { header: "", ingredient: "" }] })
    }

    const deleteIngredient = (index) => {
        const updatedIngredients = recipe.ingredients.filter((_, i) => i !== index);
        setRecipe({ ...recipe, ingredients: updatedIngredients });
    };

    const deleteHeader = (index) => {
        const updatedIngredients = [...recipe.ingredients];
        updatedIngredients[index].header = null;
        setRecipe({ ...recipe, ingredients: updatedIngredients });
    };

    const handleChangeIngredient = (e, index) => {
        const { value } = e.target;
        const newIngredients = recipe.ingredients;
        newIngredients[index].ingredient = value;
        setRecipe({ ...recipe, ingredients: newIngredients })
    }

    const handleChangeHeader = (e, index) => {
        const { value } = e.target;
        const newIngredients = recipe.ingredients;
        newIngredients[index].header = value;
        setRecipe({ ...recipe, ingredients: newIngredients })
    }

    //----------------Recipe Steps-----------------------------

    const textareaRefs = useRef([]);

    //---------changing the height if text  area based on it content---

    const handleChange = (e, index) => {
        const { value } = e.target;
        const newSteps = recipe.steps;
        newSteps[index].step = value;
        setRecipe({ ...recipe, steps: newSteps })

        if (textareaRefs.current[index]) {
            textareaRefs.current[index].style.height = 'auto';
            textareaRefs.current[index].style.height = `${textareaRefs.current[index].scrollHeight}px`; // Set height based on content
        }
    };

    const addStep = (e) => {
        e.preventDefault();
        setRecipe({ ...recipe, steps: [...recipe.steps, { stepImg: null, step: "" }] })
        setStepImages([...stepImages, { urlImg: null }]);
        textareaRefs.current = [...textareaRefs.current, React.createRef()];
    }

    const deleteStep = (index) => {
        const updatedSteps = recipe.steps.filter((_, i) => i !== index);
        setRecipe({ ...recipe, steps: updatedSteps })
    }

    //----------------the step image handler---------------

    const [stepImages, setStepImages] = useState([])

    const handleStepImageChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const updatedSteps = recipe.steps;
            updatedSteps[index].stepImg = file;
            setRecipe({ ...recipe, steps: updatedSteps })
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedSteps = [...stepImages];
                updatedSteps[index].urlImg = reader.result;
                setStepImages(updatedSteps);
            };
            reader.readAsDataURL(file);
        }
    };

    //--------------------Cuisine types--------------

    const cuisineTypes = ["Italian", "Chinese", "French", "Japanese", "Mexican", "Indian", "Thai",
        "Spanich", "Greek", "Middle Eastern Cuisine", "Turkish", "Korean", "American", "Brazilian"
    ]

    const collectionTypes = ["Breakfast", "Lunch", "Brunch", "Dinner", "Supper", "Snacks", "Appetizers",
        "Desserts", "Slow-Cooked Meals", "Less than 30 minutes"
    ]

    const ingredientTypes = [" Vegetarian", "Vegan", "Meat-Based", "Seafood", "Poultry-Based", "Grain-Based",
        "Dairy-Based", "Egg-Based", "Desserts", "Fermented (Kimchi, miso...)", "Sauce-Based"
    ]

    return (
        <div className='addrecipe-container'>
            <div className="addrecipe-wrapper">
                <div className="addrecipe-form">
                    <form>
                        <div className="title-line">
                            <h1>
                                {t('shareBtn')}
                            </h1>
                            <button type="submit">
                                {t('saveBtn')}
                            </button>
                        </div>

                        <div className="form-body">
                            <div className="recipe-title">
                                <label htmlFor="title">
                                    {t('recipeTitle')}
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder={t('titlePlacholder')}
                                    autoComplete='off'
                                    value={recipe.title}
                                    onChange={(e) => setRecipe({ ...recipe, title: e.target.value })}
                                />
                            </div>



                            <div className="recipe-img">
                                <label htmlFor="recipeImg">
                                    {t('recipeImage')}
                                </label>
                                <div className="img-box">
                                    <img
                                        src={imageSelected || AddPhoto}
                                        alt="recipe"
                                    />
                                    <div className="add-photo">
                                        <label htmlFor="recipeImg">
                                            {
                                                !imageSelected ?
                                                    t('recipeImageBtn')
                                                    :
                                                    t('recipeChangeBtn')
                                            }

                                        </label>
                                        <input
                                            type="file"
                                            name="recipeImg"
                                            id="recipeImg"
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                    <div className="delete-photo">
                                        <i class="ri-delete-bin-line recipe-icon" onClick={() => setImageSelected(null)}></i>
                                    </div>
                                </div>
                            </div>



                            <div className="recipe-description">
                                <label htmlFor="description">
                                    {t('recipeDesc')}
                                </label>
                                <textarea
                                    name="description"
                                    id="description"
                                    placeholder={t('decsPlaceholder')}
                                    autoComplete='off'
                                    value={recipe.description}
                                    onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
                                />
                            </div>



                            <div className="recipe-ingredients">
                                <label htmlFor="ingredients">
                                    {t('recipeIngredients')}:
                                </label>
                                <p>
                                    {t('ingredientsDesc')}
                                </p>
                                <div className="ingredients-container">
                                    {
                                        recipe.ingredients.map((element, index) => (
                                            <>
                                                {
                                                    element.header !== null &&
                                                    <div className="input-line">
                                                        <input
                                                            type="text"
                                                            placeholder={t('headerPlaceholder')}
                                                            className='header'
                                                            key={index}
                                                            value={element.header}
                                                            onChange={(e) => handleChangeHeader(e, index)}
                                                        />
                                                        <i class="ri-close-circle-line delete-ingredient" onClick={() => deleteHeader(index)}></i>
                                                    </div>
                                                }
                                                <div className="input-line">
                                                    <input
                                                        type="text"
                                                        placeholder={t('ingredientPlaceholder')}
                                                        key={index}
                                                        value={element.ingredient}
                                                        onChange={(e) => handleChangeIngredient(e, index)}
                                                    />
                                                    <i class="ri-close-circle-line delete-ingredient" onClick={() => deleteIngredient(index)}></i>
                                                </div>
                                            </>
                                        ))
                                    }
                                </div>
                                <div className="add-ingredients">
                                    <button onClick={addIngredient} style={{ textTransform: 'capitalize' }}>
                                        <i class="ri-add-line add-icon"></i>
                                        {t('addIngredient')}
                                    </button>
                                    <button onClick={addHeaderIngredient} style={{ textTransform: 'capitalize' }}>
                                        <i class="ri-add-line add-icon"></i>
                                        {t('addHeader')}
                                    </button>
                                </div>
                            </div>



                            <div className="recipe-instructions">
                                <label htmlFor="ingredients">
                                    {t('instructions')}
                                </label>
                                <p>
                                    Tap to edit
                                </p>
                                <div className="instructions-container">
                                    {
                                        recipe.steps.map((element, index) => (
                                            <div className="input-line-box">
                                                <label htmlFor="step" style={{ fontSize: '1.3rem', fontWeight: '550' }}>
                                                    {t('step')} {index + 1}
                                                </label>
                                                <div className="input-line">
                                                    <div className="step-img">
                                                        <img src={stepImages[index].urlImg || CameraIcon} alt="" />
                                                        <input
                                                            type="file"
                                                            onChange={(e) => handleStepImageChange(e, index)}
                                                            accept="image/*"
                                                        />
                                                    </div>
                                                    <textarea
                                                        ref={(el) => textareaRefs.current[index] = el} // Assign ref dynamically
                                                        type="text"
                                                        placeholder={t('stepPlacholder')}
                                                        value={element.step}
                                                        onChange={(e) => handleChange(e, index)}
                                                    />
                                                    <i
                                                        class="ri-close-circle-line delete-ingredient"
                                                        onClick={() => deleteStep(index)}
                                                        style={{ cursor: 'pointer' }}
                                                    ></i>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="add-instructions">
                                    <button onClick={addStep} style={{ textTransform: 'capitalize' }}>
                                        <i class="ri-add-line add-icon"></i>
                                        {t('stepPlacholder')}
                                    </button>
                                </div>
                            </div>


                            <div className="recipe-servings">
                                <label htmlFor="servings">
                                    {t('servings')}
                                </label>
                                <input
                                    name="servings"
                                    id="servings"
                                    type='number'
                                    min={2}
                                    placeholder='e.g. 8'
                                    autoComplete='off'
                                    value={recipe.servings}
                                    onChange={(e) => setRecipe({ ...recipe, servings: e.target.value })}
                                />
                                <p>
                                    {t('servingsDesc')}
                                </p>
                            </div>


                            <div className="recipe-cookingtime">
                                <label htmlFor="cookingTime">
                                    {t('cookingTime')}
                                </label>
                                <div className="input-cooking-line">
                                    <input
                                        name="hours"
                                        id="hours"
                                        type='number'
                                        min={0}
                                        placeholder='Hours 0'
                                        autoComplete='off'
                                        value={recipe.cookingTime}
                                        onChange={(e) => setRecipe({ ...recipe, cookingTime: { ...recipe.cookingTime, hours: e.target.value } })}
                                        required
                                    />
                                    <input
                                        name="minutes"
                                        id="minutes"
                                        type='number'
                                        min={0}
                                        max={59}
                                        placeholder='Minutes 0'
                                        autoComplete='off'
                                        value={recipe.cookingTime}
                                        required
                                        onChange={(e) => setRecipe({ ...recipe, cookingTime: { ...recipe.cookingTime, minutes: e.target.value } })}
                                    />
                                </div>
                                <p>
                                    {t('cookingTimeDesc')}
                                </p>
                            </div>


                            <div className="recipe-preptime">
                                <label htmlFor="prepTime">
                                    {t('prepTime')}
                                </label>
                                <div className="input-cooking-line">
                                    <input
                                        name="hours"
                                        id="hours"
                                        type='number'
                                        min={0}
                                        placeholder='Hours 0'
                                        autoComplete='off'
                                        value={recipe.prepTime}
                                        onChange={(e) => setRecipe({ ...recipe, prepTime: { ...recipe.prepTime, hours: e.target.value } })}
                                        required
                                    />
                                    <input
                                        name="minutes"
                                        id="minutes"
                                        type='number'
                                        min={0}
                                        max={59}
                                        placeholder='Minutes 0'
                                        autoComplete='off'
                                        value={recipe.prepTime}
                                        required
                                        onChange={(e) => setRecipe({ ...recipe, prepTime: { ...recipe.prepTime, minutes: e.target.value } })}
                                    />
                                </div>
                                <p>
                                    {t('prepTimeDesc')}
                                </p>
                            </div>


                            <div className="recipe-cuisine">
                                <label htmlFor="cuisine">
                                    {t('cuisine')}
                                </label>
                                <div className="input-cooking-line">
                                    <select
                                        name="cuisine"
                                        id="cuisine"
                                        placeholder={t('swiper1Title')}
                                        value={recipe.cuisine}
                                        onChange={(e) => setRecipe({ ...recipe, cuisine: e.target.value })}
                                    >
                                        <option style={{ color: "#A5A5A5" }} value="none">{t('cuisinePlaceholder')}</option>
                                        {
                                            cuisineTypes.map((cuisine) => (
                                                <option value={cuisine}> {cuisine} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>


                            <div className="recipe-cuisine">
                                <label htmlFor="collection">
                                    {t('collection')}
                                </label>
                                <div className="input-cooking-line">
                                    <select
                                        name="collection"
                                        id="collection"
                                        placeholder={t('swiper1Title')}
                                        value={recipe.collection}
                                        onChange={(e) => setRecipe({ ...recipe, collection: e.target.value })}
                                    >
                                        <option style={{ color: "#A5A5A5" }} value="none">{t('collectionPlaceholder')}</option>
                                        {
                                            collectionTypes.map((collection) => (
                                                <option value={collection}> {collection} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>



                            <div className="recipe-cuisine">
                                <label htmlFor="mainIngredient">
                                    {t('mainIngredient')}
                                </label>
                                <div className="input-cooking-line">
                                    <select
                                        name="mainIngredient"
                                        id="mainIngredient"
                                        placeholder="Select a mainIngredient type"
                                        value={recipe.mainIngredient}
                                        onChange={(e) => setRecipe({ ...recipe, mainIngredient: e.target.value })}
                                    >
                                        <option style={{ color: "#A5A5A5" }} value="none">{t('mainIngredientPlacholder')}</option>
                                        {
                                            ingredientTypes.map((ingredient) => (
                                                <option value={ingredient}> {ingredient} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default AddRecipe
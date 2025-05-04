import DragAndDropBoard from "../../components/DragAndDrop";
import { useState, useEffect } from "react";
import { addRecipe, fetchIngredientsById, fetchRecipesById } from "../../firebase/HooksFirestorage";
import { useAuth } from "../../firebase/AuthContext";

import './Recipes_module.css';
import { useNavigate } from "react-router-dom";
import { getRecipeDataDTO } from "../../DTO/recipesDTO";

const Recipes = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [search, setSearch] = useState('');
    const [changeViewFor, setChangeViewFor] = useState('MAIN');
    const [droppedItems, setDroppedItems] = useState([]);
    const [recipeData, setRecipeData] = useState(getRecipeDataDTO());

    useEffect(() => {
        if (user) {
          fetchIngredients();
          fetchRecipes();
        }
  
    }, [user]);

    const fetchRecipes = async () => {
        try {
            const data = await fetchRecipesById(user.uid);
            setRecipes(data);

        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    const fetchIngredients = async () => {
        try {
            const data = await fetchIngredientsById(user.uid);
            setIngredients(data);
        } catch (error) {
            console.error("Error fetching ingredients:", error);
        }
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };
    const handleDroppedItemsChange = (items) => {
        setDroppedItems(items);
    };

    const filterRecipes = recipes?.filter((recipe) => {
        if (!search) return true;
        return recipe.nome.toLowerCase().includes(search.toLowerCase());
    });

    const handleAddRecipe = () => {
        setChangeViewFor('ADDRECIPE');
        setDroppedItems([]);
        setRecipeData(getRecipeDataDTO());
    };

    const addNewRecipe = async (e) => {
        e.preventDefault();
        const newRecipeData = {
            name: recipeData.name,
            ingredients: droppedItems.map((item) => ({
                name: item.name,
                unit: item.unit,
                quantity: item.quantity || "",
            })),
            efficiency: recipeData.efficiency,
            efficiencyUnit: recipeData.efficiencyUnit,
            descriptionEfficiency: recipeData.descriptionEfficiency,
        };
        await addRecipe(user.uid, newRecipeData);
        setRecipes((prev) => [...prev, newRecipeData]);
        setChangeViewFor('MAIN');
    };

    return (
        <div className="container">
            <h1>RECEITAS</h1>
            <div className="contentScreen">
                {changeViewFor === 'MAIN' &&
                    <>
                        <div className="top-bar">
                            <input
                                type="text"
                                placeholder="Buscar receita"
                                value={search}
                                onChange={handleSearch}
                            />
                            <button onClick={handleAddRecipe}>ADICIONAR</button>
                            <button onClick={() => navigate('/')} className="voltar">VOLTAR</button>
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterRecipes?.map((recipe, index) => (
                                    <tr key={index}>
                                        <td>{recipe.nome}</td>
                                        <td>
                                            <button>Editar</button>
                                            <button>Excluir</button>
                                            <button>Ver</button>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </>
                }
                {changeViewFor === 'ADDRECIPE' && (
                    <form className="top-bar" onSubmit={addNewRecipe}>
                        <input
                            type="text"
                            placeholder="Nome da receita"
                            value={recipeData.name}
                            required
                            onChange={(e) => setRecipeData({ ...recipeData, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Rendimento"
                            value={recipeData.efficiency}
                            required
                            onChange={(e) => setRecipeData({ ...recipeData, efficiency: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Tipo de rendimento"
                            value={recipeData.efficiencyUnit}
                            required
                            onChange={(e) => setRecipeData({...recipeData, efficiencyUnit: e.target.value})}
                        />
                        <input
                            type="text"
                            placeholder="Descrição do rendimento"
                            value={recipeData.descriptionEfficiency}
                            onChange={(e) => setRecipeData({...recipeData, descriptionEfficiency: e.target.value})}
                        />
                        <DragAndDropBoard ingredients={ingredients} onDroppedItemsChange={handleDroppedItemsChange} />
                        <button type="submit">SALVAR</button>
                        <button type="button" onClick={() => setChangeViewFor('MAIN')}>VOLTAR</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Recipes;
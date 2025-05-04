import { useEffect, useState } from "react";
import { useAuth } from "../../firebase/AuthContext";
import { addIngredient, fetchIngredientsById } from "../../firebase/HooksFirestorage";
import { useNavigate } from "react-router-dom";

const Ingredients = () => {
    const [formData, setFormData] = useState({name: "", unit: "", quantity: "", price: "" });
    const [value, setValue] = useState("");
    const { user } = useAuth();
    const [ingredients, setIngredients] = useState([]);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const data = await fetchIngredientsById(user.uid);
                setIngredients(data);
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        };
        fetchIngredients();
    },[formData, ingredients]);

    const handleChangeValue = (e) => {
      let rawValue = e.target.value.replace(/\D/g, "");
      let floatValue = (parseInt(rawValue, 10) || 0) / 100;
      setValue(`R$ ${floatValue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`);
      setFormData({ ...formData, [e.target.name]: floatValue });
    };
  
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {   
        e.preventDefault();
        await addIngredient(user.uid, formData);
        setFormData({ name: "", unit: "", quantity: "", price: "" });
        setValue("");
    }

  return (
    <div>
      <h1>Ingredientes</h1>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form className="bg-white p-6 rounded-2xl shadow-lg w-96" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4 text-center">Adicionar</h2>
        
          <label className="block mb-2 text-sm font-medium text-gray-700">Nome</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
            required 
          />
          
          <label className="block mb-2 text-sm font-medium text-gray-700">Unidade</label>
          
          <select 
            className="w-40 p-2 border rounded" 
            value={formData.unit} 
            onChange={(e) => setFormData({...formData, unit: e.target.value})}>
            <option value="" disabled >Selecione a unidade</option>
            <option value="mg">Miligrama - mg</option>
            <option value="ml">Mililitro - ml</option>
            <option value="unidade">Unidade</option>
          </select>

          <label className="block mb-2 text-sm font-medium text-gray-700">Quantidade</label>
          <input 
            type="text" 
            name="quantity" 
            value={formData.quantity} 
            onChange={handleChange} 
            className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
            required 
          />

          <label className="block mb-2 text-sm font-medium text-gray-700">Preço</label>
          <input 
            type="text"
            name="price"
            className="w-40 p-2 border rounded mt-2" 
            placeholder="R$ 0,00" 
            value={value} 
            onChange={handleChangeValue}
          />
          
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
              Adicionar
          </button>
          <button 
            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition" 
            onClick={() => navigate("/")}>
              Voltar
          </button>
        </form>
        <div>
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Nome</th>
                <th className="py-2 px-4 border-b">Unidade</th>
                <th className="py-2 px-4 border-b">Quantidade</th>
                <th className="py-2 px-4 border-b">Preço</th>
              </tr>
            </thead>
            <tbody>
              {ingredients?.map((ingredient) => (
                <tr key={ingredient.id}>
                  <td className="py-2 px-4 border-b">{ingredient.name}</td>
                  <td className="py-2 px-4 border-b">{ingredient.unit}</td>
                  <td className="py-2 px-4 border-b">{ingredient.quantity}</td>
                  <td className="py-2 px-4 border-b">R$ ${(ingredient.price).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
  </div>
  );
}

export default Ingredients;
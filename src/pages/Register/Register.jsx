import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerFirebase } from "../../firebase/HooksFirestorage.jsx";


const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    await registerFirebase({email:formData.email, password: formData.password, name: formData.name});
    setFormData({ name: "", email: "", password: ""});
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded-2xl shadow-lg w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Cadastro</h2>
        
        <label className="block mb-2 text-sm font-medium text-gray-700">Nome</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
          required 
        />
        
        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
          required 
        />
        
        <label className="block mb-2 text-sm font-medium text-gray-700">Senha</label>
        <input 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
          required 
        />
        
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Register;

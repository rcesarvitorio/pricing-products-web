import { useNavigate } from "react-router-dom";
import { useAuth } from "../../firebase/AuthContext.jsx";

const Home = () => {   
    
    const { user, loading, logout } = useAuth();
    const navigate = useNavigate(); 
    const handleRedirect = (path) => {
      navigate(path); 
    };
    const handleLogout = async () => {
        await logout();    
        handleRedirect("/login");
    };

    return (
        <div>
            <h1>Home</h1>
            {user && <p>Olá, {user.displayName}</p>}
            {!user && 
                <>
                    <button onClick={() => handleRedirect("/register")}>Cadastro</button>
                    <button onClick={() => handleRedirect("/login")}>Login</button>
                </>
            
            }
            {user &&
                <> 
                    <button onClick={() => handleRedirect("/add-ingredients")}>Ingredientes</button>
                    <button onClick={() => handleRedirect("/add-recipes")}>Receitas</button>
                    <button onClick={handleLogout}>Sair</button>
                </>
            }
            

        </div>
        
    );
}

export default Home;
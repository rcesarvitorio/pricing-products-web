import { auth } from "./config";
import { signInWithEmailAndPassword } from "firebase/auth";


class AuthService {    
  async getToken(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      return token;
    } catch (error) {
      console.error("Erro no login:", error.message);
    }
  } 
}

export default new AuthService();

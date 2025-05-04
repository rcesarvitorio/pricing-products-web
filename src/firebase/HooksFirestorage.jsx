import { db } from "../firebase/config"; 
import { collection, addDoc, getDocs, setDoc, doc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
const auth = getAuth();

export const addIngredient = async (accountId, ingredient) => {
    try {
        console.log('Chamando addIngredient para:', ingredient);
        const ingredientsRef = collection(db, "accounts", accountId, "ingredients");
        
        await addDoc(ingredientsRef, ingredient);
    
        console.log('Ingrediente adicionado com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar ingrediente:', error);
    }
};

export const addRecipe = async (accountId, recipe) => {
    try {
        const recipesRef = collection(db, "accounts", accountId, "recipes");
        console.log('Chamando addRecipe para:', recipe);
        console.log('accountId', accountId);
        await addDoc(recipesRef, recipe);
    
        console.log('Receita adicionada com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar receita:', error);
    }
};

export const addAccount = async (account) => {
    try {
        const accountsRef = collection(db, "accounts");
        
        await addDoc(accountsRef, account);
    
        console.log('Conta adicionada com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar conta:', error);
    }
};

export const fetchIngredientsById = async (accountId) => {
    try {
      const subcollectionRef = collection(db, "accounts", accountId, "ingredients");
      const querySnapshot = await getDocs(subcollectionRef);
        
      const ingredients = [];
      querySnapshot.forEach((doc) => {
        ingredients.push({ id: doc.id, ...doc.data() });
      });
      return ingredients;

    } catch (error) {
      console.error('Error fetching subcollection:', error);
    }
};

export const fetchRecipesById = async (accountId) => {
    try {
      const subcollectionRef = collection(db, "accounts", accountId, "recipes");
      const querySnapshot = await getDocs(subcollectionRef);
        
      const recipes = [];
      querySnapshot.forEach((doc) => {
        recipes.push({ id: doc.id, ...doc.data() });
      });
      return recipes;

    } catch (error) {
      console.error('Error fetching subcollection:', error);
    }
};

export const completeRegister = async ({email, password, name}, uid) => {
    try {
        const accountObj = {
            name: name,
            email: email,
            uid: uid,
        };
        console.log("accountObj", accountObj);
        
        await setDoc(doc(db, "accounts", uid), accountObj);
    
        console.log('Conta adicionada com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar conta:', error);
    }
};

export const registerFirebase = async ({email, password, name}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, {
        displayName: name,
    });
    await completeRegister({email, password, name}, user.uid);
  } catch (error) {
    console.error("Erro ao cadastrar:", error.message);
  }
};

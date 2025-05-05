class RegisterDTO {
    constructor({name, email, password}) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    

    validateEmail() {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(this.email).toLowerCase());
    }

    validatePassword() {
        return this.password.length >= 6;
    }

    isValid() {
        return this.validateEmail() && this.validatePassword();
    }

    register() {
        if (this.isValid()) {
            return true;
        } else {
            console.log("Registration failed. Please check your details.");
            return false;
        }
    }
    
    clearForm() {
        this.name = "";
        this.email = "";
        this.password = "";
    }
}

export default RegisterDTO;


const prod = {
        FIREBASE_CONFIG: JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG),     
}

let config;
process.env.NODE_ENV === 'production' ? config = prod : config = prod;

export default config;
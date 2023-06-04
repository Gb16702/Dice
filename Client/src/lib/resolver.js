import { emailPattern as pattern } from "./emailPattern";

const requiredErrorMessage = "Ce champs est requis";

const usernamePattern = /^[a-zA-Z0-9]*$/;
const emailPattern = pattern;
const forbiddenWords = ["password", "123456", "PASSWORD", "azerty"];

const minLength = {
    username: 2,
    password : 6
};
const maxLength = 48

const isForbidden = password => {
    return forbiddenWords.some(word => password.toLowerCase().includes(word));
}

const isPasswordSecure = password => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSymbols = /[^A-Za-z0-9]/.test(password);

    const isSecure = hasUppercase && hasLowercase && hasNumbers && hasSymbols;
    return isSecure;
}

export const resolver = (values) => {
    const errors = {};

     const errorMessages = {
         username : {
             required : "Le nom d'utilisateur est requis",
             minLength : `Ce champs doit faire au moins ${minLength.username} caractères`,
             maxLength : `Ce champs doit faire au plus ${maxLength} caractères`,
             invalid : "Ce champs ne doit contenir que des caractères alphanumériques"
         },
         email : {
             required : "L'adresse mail est requise",
             invalid : "L'adresse mail est invalide"
         },
         password : {
             required : "Le mot de passe est requis",
             minLength : `Ce champs doit faire au moins ${minLength.password} caractères`,
             maxLength : `Ce champs doit faire au plus ${maxLength} caractères`,
             invalid : {
                 forbidden : "Ce mot de passe est trop simple",
                 notSameAs : "Les mots de passe ne correspondent pas"
             }
         },
         confirmPassword : {
             required : "La confirmation est requise",
             invalid : {
                 notSameAs : "Les mots de passe ne correspondent pas"
             }
         }
     }

     Object.keys(errorMessages).map(field => {
         if(!values[field])
             errors[field] = errorMessages[field].required;
         else {
             if(values[field].length < minLength[field])
                 errors[field] = errorMessages[field].minLength;

             else if(values[field].length > maxLength)
                 errors[field] = errorMessages[field].maxLength;
         }
     })
     if(values.username && !usernamePattern.test(values.username))
         errors.username = errorMessages.username.invalid;

     if(values.email && !emailPattern.test(values.email))
         errors.email = errorMessages.email.invalid;

     if(values.password) {
         if(!isPasswordSecure(values.password))
             errors.password = errorMessages.password.invalid.forbidden;

         else if(isForbidden(values.password))
             errors.password = errorMessages.password.invalid.forbidden;

         else if(values.confirmPassword && values.password !== values.confirmPassword) {
             errors.password = errorMessages.password.invalid.notSameAs;
             errors.confirmPassword = errorMessages.password.invalid.notSameAs;
         }

     }

    const isValid = Object.keys(errors).length === 0;
    return {errors, isValid}
}

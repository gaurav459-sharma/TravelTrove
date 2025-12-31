let validator ={};

validator.checkEmailValidation = (email)=>{
    let regex =  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if(!regex.test(email)){
        let error  = new Error("Please fill a valid email address");
        error.status = 400;
        throw error;

    }
}

validator.checkPasswordValidation = (password)=>{

    if(password.length<6){
        let error  = new Error("Password should be atleast 6 characters");
        error.status = 400;
        throw error;

    }
}

module.exports = validator;
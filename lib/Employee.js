class Employee{

    constructor(name, id, email){

        this.name = name;
        this.id = id;
        this.email = email;

    }
    getName(){
        return this.name;
    } 
    getId(){
        return this.id;
    } 
    getEmail(){
        return this.email;
    }
    getRole(){
        return "Employee";
    }
    static definitionQuestions = [
        { name: "name", message: "Enter Name:", validate: Employee.noBlanks},
        { name: "id", message: "Enter ID:" },
        { name: "email", message: "Enter Email:", validate: Employee.isEmail }
    ];
    static async noBlanks(input){
        if(input.length === 0)
            return "Field cannot be blank!"

        return true;
    }
    static async isEmail(input){

        if(input.length === 0)
            return "Field cannot be blank!";

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(!input.toLowerCase().match(re))
            return "Not a valid email";

        return true;
    }
    static async isInt(input){

        if(input.length === 0)
            return "Field cannot be blank!";

        const floatInput = parseFloat(input);

        if(!Number.isInteger(floatInput))
            return "Field must be an integer";      
        
        if(parseInt(floatInput) <= 0)
            return "Field must be greater than 0";

        return true;
    }
}

module.exports = Employee;
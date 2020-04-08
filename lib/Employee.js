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
        {
            name: "name",
            message: "Enter Name:"
        },
        {
            name: "id",
            message: "Enter ID:"
        },
        {
            name: "email",
            message: "Enter Email:"
        }
    ];
}

module.exports = Employee;
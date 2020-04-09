const Employee = require("../lib/Employee");

class Intern extends Employee{

    constructor(name,id,email,school){
        super(name,id,email)
        
        this.school = school;
    }
    getSchool(){
        return this.school;
    }
    getRole(){
        return "Intern";
    }
    static definitionQuestions = [
        { name: "name",message: "Enter Name" , validate: Employee.noBlanks},
        { name: "id", message: "Enter ID" },
        { name: "email", message: "Enter Email", validate: Employee.isEmail },
        { name: "school", message: "Enter School", validate: Employee.noBlanks }
    ];
}

module.exports = Intern;
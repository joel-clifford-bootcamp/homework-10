const Employee = require("../lib/Employee");

class Engineer extends Employee{

    constructor(name,id,email,github){
        super(name,id,email)

        this.github = github;
    }
    getGithub(){
        return this.github;
    }
    getRole(){
        return "Engineer";
    }
    static definitionQuestions = [
        { name: "name",message: "Enter Name", validate: Employee.noBlanks },
        { name: "id", message: "Enter ID" },
        { name: "email", message: "Enter Email", validate: Employee.isEmail },
        { name: "github", message: "Enter Github username", validate: Employee.noBlanks }
    ];
}

module.exports = Engineer;
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
        { name: "name",message: "Enter Name" },
        { name: "id", message: "Enter ID" },
        { name: "email", message: "Enter Email" },
        { name: "github", message: "Enter Github username" }
    ];
}

module.exports = Engineer;
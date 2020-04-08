const Employee = require("../lib/Employee");

class Manager extends Employee{

    constructor(name,id,email,officeNumber){
        super(name,id,email)

        this.officeNumber = officeNumber;
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
    getRole(){
        return "Manager";
    }
    static definitionQuestions = [
        { name: "name",message: "Enter Name" },
        { name: "id", message: "Enter ID" },
        { name: "email", message: "Enter Email" },
        { name: "officeNumber", message: "Enter Office Number" }
    ];
}

module.exports = Manager;
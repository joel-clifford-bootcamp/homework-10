const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path"); 
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];
let continueAdding = true;

const internQuestions = Intern.definitionQuestions;
const engineerQuestions = Engineer.definitionQuestions;
const managerQuestions = Manager.definitionQuestions;
const yesNoToBool = new Map([["No",false],["Yes",true]]);

const validateId = async (input) => {

    console.log(employees.map(employee => employee.getId()));

    if(employees.map(employee => employee.getId()).includes(input)){
        return "Id already in use"
    }

    return true;
}

// internQuestions[1].validate = validateId;
// engineerQuestions[1].validate = validateId;
// managerQuestions[1].validate = validateId;

const getEmployeeType = {
    type: "list",
    name: "employeeType",
    message: "What is this employee's role?",
    choices: ["Intern", "Engineer"]
};

const addAnotherEmployee = [{
    type: "list",
    name: "addAnother",
    message: "Add another Employee?",
    choices: ["Yes", "No"]
}];

async function getEmployees()
    {
    console.log("\nAdd Manger");

    let { name: managerName, 
        id: managerId, 
        email: managerEmail, 
        officeNumber} = await inquirer.prompt(managerQuestions)
        
    employees.push(new Manager(managerName, managerId, managerEmail, officeNumber));

    do{
        console.log(`\nAdd Employee #${employees.length}`);

        const { employeeType } = await inquirer.prompt(getEmployeeType);

        switch(employeeType){

            case "Intern":
                let {name: internName, 
                    id: internId, 
                    email:internEmail, 
                    school } = await inquirer.prompt(internQuestions);

                employees.push(new Intern(internName, internId, internEmail, school));
                break;

            case "Engineer":
                let {name: engineerName, 
                    id: engineerId, 
                    email: engineerEmail, 
                    github } = await inquirer.prompt(engineerQuestions);

                employees.push(new Intern(engineerName, engineerId, engineerEmail, github));
                break;
        }

        console.log("");

        const { addAnother } = await inquirer.prompt(addAnotherEmployee);
        
        console.log(employees);

        continueAdding = yesNoToBool.get(addAnother);

    } while (continueAdding)
}

getEmployees();
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
const yesNoToBool = new Map([["No",false],["Yes",true]]);

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

    let { managerName, managerId, managerEmail, officeNumber} = await inquirer.prompt(Manager.definitionQuestions)
        
    employees.push(new Manager(managerName, managerId, managerEmail, officeNumber));

    do{
        console.log(`\nAdd Employee #${employees.length}`);

        const { employeeType } = await inquirer.prompt(getEmployeeType);

        switch(employeeType){

            case "Intern":
                let {internName, internId, internEmail, school } = await inquirer.prompt(Intern.definitionQuestions)
                employees.push(new Intern(internName, internId, internEmail, school));
                break;
            case "Engineer":
                let {engineerName, engineerId, engineerEmail, github } = await inquirer.prompt(Engineer.definitionQuestions)
                employees.push(new Intern(engineerName, engineerId, engineerEmail, github));
                break;
        }

        console.log("");

        const { addAnother } = await inquirer.prompt(addAnotherEmployee);

        continueAdding = yesNoToBool.get(addAnother);

    } while (continueAdding)
}

getEmployees();
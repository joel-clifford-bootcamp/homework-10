const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// stores employees
const employees = [];

// definition questions instantiated in advance so 
// id validation can be added with employees array 
// scoped in - allowing for duplicate id check
const internQuestions = Intern.definitionQuestions;
const engineerQuestions = Engineer.definitionQuestions;
const managerQuestions = Manager.definitionQuestions;
const yesNoToBool = new Map([["No",false],["Yes",true]]);

// validate id format and disallow duplicates
const validateId = async (input) => {

    if(input.length === 0)
        return "Field cannot be blank!";

    const floatInput = parseFloat(input);

    if(!Number.isInteger(floatInput))
        return "Field must be an integer";      

    if(parseInt(floatInput) <= 0)
        return "Field must be greater than 0";

    if(employees.map(employee => employee.id).includes(input))
        return "Id already in use"
    
    return true;
}

// add id validation to inquirer prompt arguments
internQuestions[1].validate = validateId;
engineerQuestions[1].validate = validateId;
managerQuestions[1].validate = validateId;

// employee type to be added inquirer prompt argument
const getEmployeeType = {
    type: "list",
    name: "employeeType",
    message: "What is this employee's role?",
    choices: ["Intern", "Engineer"]
};

// add another employee inquirer prompt argument
const addAnotherEmployee = [{
    type: "list",
    name: "addAnother",
    message: "Add another Employee?",
    choices: ["Yes", "No"]
}];

// populate employee with test values
function getTestEmployees()
{
    employees.push(new Manager("Jared",1,"jared@fakeemail.com",100));
    employees.push(new Engineer("Alec",2,"alec@fakeemail.com","ibealec"));
    employees.push(new Engineer("Tammer",3,"tammer@fakeemail.com","tammerg"));
    employees.push(new Engineer("Christian",4,"christian@fakeemail.com","ceckenrode"));
    employees.push(new Intern("John",5,"john@fakeemail.com","2University"));
}

// prompt users to enter team members
async function getEmployees(){

    let continueAdding = true;

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

                employees.push(new Engineer(engineerName, engineerId, engineerEmail, github));
                break;
        }

        console.log("");

        const { addAnother } = await inquirer.prompt(addAnotherEmployee);

        continueAdding = yesNoToBool.get(addAnother);

    } while (continueAdding)
}

function renderEmployees(){
    
    const employeesHtml = render(employees);

    fs.writeFile(outputPath,employeesHtml, err => {

        if(err) throw err;

        console.log("Team profile generated successfully!")

    });
}

async function init(){

    await getEmployees();

    renderEmployees();
}

init()
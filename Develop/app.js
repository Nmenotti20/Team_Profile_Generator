const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// const TEAM_ROSTER_DIR = path.resolve(__dirname, "TEAM_ROSTER");
// const outputPath = path.join(TEAM_ROSTER_DIR, "./TEAM_ROSTER/output.html");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require('./lib/htmlRenderer');

let employees = [];

const newManagerQuestions = [{
        type: "input",
        name: "name",
        message: "What is your manager's name?",
        validate: name => {
			let pass = name.match(/^[a-zA-Z]+ [a-zA-Z]+$/g);
			if (pass) {
				return true;
			}
			return 'Are you messing with me? Please enter a valid full name.';
		},
    },
    {
        type: "input",
        name: "id",
        message: "What is your manager's id?",
        validate: id => {
			let pass = id.match(/^[0-9a-zA-Z]+$/g);
			if (pass) {
				return true;
			}
			return 'C-Mon man! Give me a valid ID.';
		},
    },
    {
        type: "input",
        name: "email",
        message: "What is your manager's email?",
        validate: email => {
            let pass = email.match(/\S+@\S+\.\S+/g);
            if (pass) {
                return true;
            }
            return 'NICE TRY SLICK! Please enter a valid email address.';
        },
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is your manager's office number?",
		validate: officeNumber => {
			let pass = officeNumber.match(/^[0-9]+$/g);
			if (pass) {
				return true;
			}
			return 'Does this manager really even work here? Please enter a valid office number.';
		},
    },
];

const newEngineerQuestions = [{
    type: "input",
    name: "name",
    message: "What is your Engineer's name?",
    validate: name => {
        let pass = name.match(/^[a-zA-Z]+ [a-zA-Z]+$/g);
        if (pass) {
            return true;
        }
        return 'Are you messing with me? Please enter a valid full name.';
    },
},
{
    type: "input",
    name: "id",
    message: "What is your Engineer's id?",
    validate: id => {
        let pass = id.match(/^[0-9a-zA-Z]+$/g);
        if (pass) {
            return true;
        }
        return 'C-Mon man! Give me a valid ID.';
    },
},
{
    type: "input",
    name: "email",
    message: "What is your Engineer's email?",
    validate: email => {
        let pass = email.match(/\S+@\S+\.\S+/g);
        if (pass) {
            return true;
        }
        return 'NICE TRY SLICK! Please enter a valid email address.';
    },
},
{
    type: "input",
    name: "github",
    message: "What is your Engineer's github?"
},
];

const newInternQuestions = [{
    type: "input",
    name: "name",
    message: "What is your Intern's name?",
    validate: name => {
        let pass = name.match(/^[a-zA-Z]+ [a-zA-Z]+$/g);
        if (pass) {
            return true;
        }
        return 'Are you messing with me? Please enter a valid full name.';
    },
},
{
    type: "input",
    name: "id",
    message: "What is your Intern's id?",
    validate: id => {
        let pass = id.match(/^[0-9a-zA-Z]+$/g);
        if (pass) {
            return true;
        }
        return 'C-Mon man! Give me a valid ID.';
    },
},
{
    type: "input",
    name: "email",
    message: "What is your Intern's email?",
    validate: email => {
        let pass = email.match(/\S+@\S+\.\S+/g);
        if (pass) {
            return true;
        }
        return 'NICE TRY SLICK! Please enter a valid email address.';
    },
},
{
    type: "input",
    name: "school",
    message: "What is your Intern's school?",
    choices: [
        "UCSD",
        "Massachusetts Institute of Technology",
        "San Diego State University",
        "School of Hard Kocks"
    ]
},
];

const addMoreEmployees = () => {
    inquirer.prompt([{
        type: "list",
        name: "myChoice",
        message: "Which employeee would you like to add?",
        choices: [
            "Engineer",
            "Intern",
            "Manager",
            "No More"
        ]
    }]).then((answer) => {
        switch (answer.myChoice) {
            case "Engineer":
                createEngineer();
                break;
            case "Intern":
                createIntern();
                break;
            case "Manger":
                createManager();
                break;
            default:
                fs.writeFileSync(outputPath, render(employees), "utf-8");
                break;
        }
    });
}

const createManager = () => {
    inquirer.prompt(newManagerQuestions).then((answers) => {
        console.log("manager answers: ", answers);
        //create new employee class instance
        const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        //push to employees array
        employees.push(newManager)
        //ask more employees?
        addMoreEmployees()
    });
};

const createEngineer = () => {
    inquirer.prompt(newEngineerQuestions).then((answers) => {
        console.log("Engineer answers: ", answers);
        //create new employee class instance
        const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        //push to employees array
        employees.push(newEngineer)
        //ask more employees?
        addMoreEmployees()
    });
};

const createIntern = () => {
    inquirer.prompt(newInternQuestions).then((answers) => {
        console.log("Intern answers: ", answers);
        //create new employee class instance
        const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
        //push to employees array
        employees.push(newIntern)
        //ask more employees?
        addMoreEmployees()
    });
};

createManager();

//******************************************************************************************************************************************************************************************************************************************************************************************************************************* */
//Async ... await
async function init() {
    // Try
    try {
        const answers = await inquirer.prompt(questions);

        const {
            name,
            id,
            email,
            role
        } = answers;

        // Depending on "roll" selected create, a class instance
        switch (role) {
            case 'Manager':
                let manager = new Manager(name, id, email, answers.officeNumber);
                employees.push(officeNumber);
                break;
            case 'Engineer':
                let engineer = new Engineer(name, id, email, answers.github);
                employees.push(github);
                break;
            case 'Intern':
                let intern = new Intern(name, id, email, answers.school);
                employees.push(school);
        }

        //Prompt the questions again when adding team member is chosen
        if (answers.isAdding) init();

        //Call renderOutput function
        renderOutput();

    } catch (err) {
        console.log(err);
    }
}



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// function init() {
//     inquirer.prompt([starterQuestions]).then(answers => {
//         //do something with answers

//         console.log("This is what you answered...", answers);
//         const fs = require('fs');
//         fs.writeFile('./TEAM_ROSTER/output.html, writeFile(answers), (err) => 
//                 err ?
//                 console.log(err) : console.log ('SUCCESS!!! Your Employee Info has been generated to the output.html file!')
//         )
//     })};



//  create a class instance and push to array?




// After the user has input all employee desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

function buildInternQuestions() {
    inquirer.prompt([internQuestions]);
}

function buildManagerQuestions() {
    inquirer.prompt([managerQuestions]);
}

function buildEngineerQuestions() {
    inquirer.prompt([engineerQuestions]);
}


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

//Render team.html
function renderOutput() {

    //Create the directory TEAM_ROSTER if it does not exist
    if (!fs.existsSync(TEAM_ROSTER_DIR)) fs.mkdirSync(TEAM_ROSTER_DIR);

    // Write team.html file 
    const outputHTML = fs.writeFileSync(outputPath, render(employees), (err) => {
        if (err) throw err;
    })
}



// Initialize questions sequence  
//init();


// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
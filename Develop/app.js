const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Identify the directory and outputPath to render on ".output/team.html".
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Require "./lib/htmlRenderer".
const render = require('./lib/htmlRenderer');

// Define employees
let employees = [];

// Array of newManagerQuestions
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

// Array of newEngineerQuestions
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

// Array of newInternQuestions
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
    type: "list",
    name: "school",
    message: "What is your Intern's school?",
    choices: [
        "UCSD",
        "Massachusetts Institute of Technology",
        "San Diego State University",
        "School of Hard Knocks"
    ]
},
];

// Use inquirer.prompt to addMoreEmployees if the user wants selects to add another employee or else, quit to stop adding employees to the roster. 
const addMoreEmployees = () => {
    inquirer.prompt([{
        type: "list",
        name: "myChoice",
        message: "Which employeee would you like to add?",
        choices: [
            "Engineer",
            "Intern",
            "Manager",
            "Quit"
        ]

    // Use switch statment to determine which set os subquestions to sequence through based on the selection of the employee role.  
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

// If "manager" is selected, sequence through the newManagerQuestions array.
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

// If "engineer" is selected, sequence through the newEngineerQuestions array.
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

// If "intern" is selected, sequence through the newInternQuestions array.
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

// Call the function createManager
createManager();

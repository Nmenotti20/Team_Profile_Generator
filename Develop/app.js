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

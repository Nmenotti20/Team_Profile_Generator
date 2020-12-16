const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const TEAM_ROSTER_DIR = path.resolve(__dirname, "TEAM_ROSTER");
const outputPath = path.join(TEAM_ROSTER_DIR, "./TEAM_ROSTER/output.html");

const render = require('./lib/htmlRenderer');

let employees = [];

// Starter Questions *****************************************************************************************    
const starterQuestions = [

    // Choose to Add EE or Do Nothing
    {
        type: 'list',
            message: 'What what you like to do?',
            name: 'employees',
            choices: ['Add employee', 'cancel'],
            validate: employees =>    {
                if (employees) {
                    return true;
                } 
            return (questions);
            }
    },
   
]

const questions = [

    // Employee Name
    {
        type: 'input',
            message: 'What is your full name?',
            name: 'name',
    },

    // Employee ID
    {
        type: 'input',
            message: 'What is your 3 digit employee id number?',
            name: 'id',
    },

    // Email
    {
		type: 'input',
		message: 'Enter the employee email address:',
		name: 'email',
		validate: email => {
			let pass = email.match(/\S+@\S+\.\S+/g);
			if (pass) {
				return true;
			}

			return 'NICE TRY SLICK! Please enter a valid email address.';
		},
	},

    // Job Roll
    {
        type: 'list',
        message: 'What is the employee role?',
        name: 'role',
        choices: ['Manager', 'Engineer', 'Intern']
       },
]

   // Engineer Questions *********************************************************************************
const engineerQuestions = [

    // GitHub
    {
        type: 'input',
        message: 'What is your GitHub username?',
        name: 'github',
        when: answers => {
			return answers.role === 'Engineer';
		},
    },
]

// Manager Questions****************************************************************
const managerQuestions = [

    // Office Number
    {
        type: 'input',
        message: 'What is your office number?',
        name: 'officeNumber',
        when: answers => {
			return answers.role === 'Manager';
		},
    },
]

// Intern Questions*********************************************************************************
const internQuestions = [
        // School
    {
        type: 'input',
        message: 'What school did you go to?',
        name: 'school',
        when: answers => {
                return answers.role === 'Intern';
        },
    },

    
 // Ask if you want to add another employee to the roster
 {
    type: 'confirm',
    name: 'adding',
    message: 'Would you like to add another employee to the TEAM_ROSTER?',
    deault:true
  }
];

// module.exports = questions;

// Create Class Instance and push to an array*******************************************************
//Async ... await
async function init() {
	// Try
	try {
		const answers = await inquirer.prompt(questions);

                const { name, id, email, role } = answers;

    	// Depending on "roll" selected create, a class instance
		switch (role) {
			case 'Manager':
				let manager = new Manager(name, id, email, answers.officeNumber);
				employees.push(managerQuestions);
				break;
			case 'Engineer':
				let engineer = new Engineer(name, id, email, answers.github);
				employees.push(engineerQuestions);
				break;
			case 'Intern':
				let intern = new Intern(name, id, email, answers.school);
				employees.push(internQuestions);
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

function buildInternQuestions(){     
    inquirer.prompt([internQuestions]);
}

function buildManagerQuestions(){
    inquirer.prompt([managerQuestions]);
}

function buildEngineerQuestions(){
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
    } )
  }



// Initialize questions sequence  
init();


// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

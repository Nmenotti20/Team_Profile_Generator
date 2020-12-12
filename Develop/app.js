const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const TEAM_ROSTER_DIR = path.resolve(__dirname, "TEAM_ROSTER");
const outputPath = path.join(TEAM_ROSTER_DIR, "output.html");

const render = require("./lib/htmlRenderer");
//const questions = require("./lib/questions");

// Engineer Questions *********************************************************************************
const engineerQuestions = [

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
        message: 'What is your email address?',
        name: 'email',
       },

    // GitHub
    {
        type: 'input',
        message: 'What is your GitHub username?',
        name: 'github',
       },
    ]
    
    // Manager Questions****************************************************************
    const managerQuestions = [
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
        message: 'What is your email address?',
        name: 'email',
       },

    // Office Number
    {
        type: 'input',
        message: 'What is your office number?',
        name: 'officeNumber',
       },

    ]

    // Intern Questions*********************************************************************************
    const internQuestions = [
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
            message: 'What is your email address?',
            name: 'email',
           },
    
        // School
        {
            type: 'input',
            message: 'What school did you go to?',
            name: 'school',
           },
        
    ]

    const starterQuestions = [
    {
        type: 'list',
        message: 'What what you like to do?',
        name: 'action',
        choices: ['Add employee', 'Do nothing']
       },
   
    //    Job Roll*************************************************************************
    {
        type: 'list',
        message: 'What is the employee role?',
        name: 'role',
        choices: ['Employee', 'Manager', 'Engineer', 'Intern']
       },
    ]

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

inquirer.prompt(starterQuestions);


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

function buildInternQuestions(){     
    inquirer.prompt(internQuestions);
}

function buildManagerQuestions(){
    inquirer.prompt(managerQuestions);
}

function buildEngineerQuestions(){
    inquirer.prompt(engineerQuestions);
}
    

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

function init() {
    inquirer.prompt(questions).then((answers)=> {
        console.log("This is what you answered...", answers);
        const fs = require('fs');
        fs.writeFile('output.html', generateDocument(answers), (err) =>
        err ? 
        console.log(err) : console.log ('SUCCESS!!! Your html content has been generated to the index.html file!')
        )
    })};

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

const engineerQuestions = [

    // Engineer Questions *********************************************************************************
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

module.exports = questions;

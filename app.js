const inquirer = require('inquirer');


/*const fs = require('fs');
const generatePage = require('./src/page-template');

const pageHTML = generatePage(username, github);

fs.writeFile('./index.html',pageHTML,err =>
{
    if(err) throw new Error(err);

    console.log("Portfolio complete, check index.html to see output");
});*/

const promptUser = () => {
   return inquirer
.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?'
    },

    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username'
    },

    {
        type:'input',
        name: 'about',
        message:'Provide some info about yourself'
    }
]);
};

const promptProject = portfolioData => {

    if(!portfolioData.projects)
    {
        portfolioData.projects = [];
    }

    console.log(`
    ================
    Add a New Project
    ================
    `);

    return inquirer.prompt([
        {
            type: 'input',
            name:'name',
            message: 'What is the name of your project?'
        },
        
        {
            type: 'input',
            name: 'description',
            message: 'Add a project description (Required)'
        },

        {
            type:'checkbox',
            name: 'languages',
            message:'What languages were used to build the project?(Check all that apply)',
            choices:['JavaScript','HTML','CSS','ES6','JQuery','Bootstrap']
        },

        {
            type: 'input',
            name:'link',
            message:'Enter the GitHub link to your project.(Required)'
        },

        {
            type: 'confirm',
            name: 'feature',
            message: 'Would your like to feature this project?',
            default: false
        },

        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to add another project?',
            default: false   
        }
    ]).then(projectData=>{
        portfolioData.projects.push(projectData);
        if(projectData.confirmAddProject)
        {
            return promptProject(portfolioData);
        }
        else
        {
            return portfolioData;
        }
    });
};

promptUser()
.then(promptProject)
.then(portfolioData =>{
    console.log(portfolioData);
});
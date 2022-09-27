const inquirer = require('inquirer');
const {writeFile, copyFile} = require('./utlis/generate-site');
const generatePage = require('./src/page-template');

const promptUser = () => {
   return inquirer
.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'What is your name?(Required)',
        validate:nameInput =>{
            if(nameInput)
            {
                return true;
            }
            else
            {
                console.log("Please enter your name");
                return false;
            }
        }
    },

    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username(Require)',
        validate: githubName =>{
            if(githubName)
            {
                return true;
            }
            else
            {
                console.log("Must enter github username");
                return false;
            }
        }
    },

    {
        type:'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some info about yourself?',
        default:true
    },

    {
        type:'input',
        name: 'about',
        message:'Provide some info about yourself',
        when: ({confirmAbout}) => {
            if(confirmAbout)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
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
            message: 'What is the name of your project?(Required)',
            validate: projectName =>{
                if(projectName)
                {
                    return true;
                }
                else
                {
                    console.log("Must enter project name");
                    return false;
                }
            }
        },
        
        {
            type: 'input',
            name: 'description',
            message: 'Add a project description (Required)',
            validate: projectDes=>{
                if(projectDes)
                {
                    return true;
                }
                else
                {
                    console.log("Must enter project description");
                    return false;
                }
            }
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
            message:'Enter the GitHub link to your project.(Required)',
            validate: hubLink =>{
                if(hubLink)
                {
                    return true;
                }
                else
                {
                    console.log("Must enter github project link");
                    return false;
                }
            }
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
    return generatePage(portfolioData);
})
.then(pageHTML =>{
    return writeFile(pageHTML);
})
.then(writeFileResponse =>{
    console.log(writeFileResponse);
    return copyFile();
})
.then(copyFileResponse =>{
    console.log(copyFileResponse);
})
.catch(err =>{
    console.log(err);
});
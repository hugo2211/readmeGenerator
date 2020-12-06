const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// array of questions for user
const writeFileAsync = util.promisify(fs.writeFile);

const questions = () =>
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the name or your project?',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Please write a brief description of your project',
      },
      {
        type: 'input',
        name: 'github',
        message: 'Enter GitHub username?',
      },
      {
        type: 'input',
        name: 'email',
        message: 'Enter your email?',
      },
      {
        type: 'input',
        name: 'license',
        message: 'What kind of license does your Project have',
        choices: ['MIT', 'ISC', 'IBM']
      },
      {
        type: 'input',
        name: 'installation',
        message: 'What command should be run to install dependecies.',
        choices: ['NPMI', 'none']
      },
      {
        type: 'input',
        name: 'test',
        message: 'What command should be run to run tests',
        choices: 'NPM test'

      },
      {
        type: 'input',
        name: 'usage',
        message: 'What does the user need to know about running the repository?',
      },
      {
        type: 'input',
        name: 'contribution',
        message: 'What does the user need to know about contributing to the repository?',
      },
    ]);

// function to write README file
    function generateMarkdown(data) {
        return `# ${data.title}
      
        ![Github license](${data.license})
      
        ## Description 
        ${data.description}
      
        ## Table of Contents
        *[Installation](#installation)
        *[Usage](#usage)
        *[License](#license)
        *[Contributing](#contributing)
        *[Test](#test)
        *[Questions](#questions)
      
        ## Installation
        ${data.installation}
      
        ## Usage
        ${data.usage}
      
        ##License
        ${data.license}
      
        ##Contributing
        ${data.contribution}
      
        ##Test
        To run test, run the following command:
        '''
        ${data.test}
        '''
      
        ##Questions
        If you have any questions or issues, you can contact me directly at ${data.email}. 
        You can also find more of my word at [Victor Mendizabal](${data.github}).
      `;
}


  // function call to initialize program
questions()
  .then((data) => writeFileAsync('README.md', generateMarkdown(data)))
  .then(() => console.log('Successfully wrote to README.md file'))
  .catch((err) => console.error(err));
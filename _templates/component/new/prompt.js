module.exports = {
  prompt: ({ prompter }) => {
    return prompter
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'How shall we call this awesome component?',
        },
        {
          type: 'input',
          name: 'parent',
          message: 'An what component should it build on?',
        },
      ])
      .then((answers) => {
        return {
          ...answers,
        }
      })
  },
}

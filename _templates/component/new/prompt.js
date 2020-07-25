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
          message: 'On what component should it depend?',
        },
      ])
      .then((answers) => {
        return {
          ...answers,
        }
      })
  },
}

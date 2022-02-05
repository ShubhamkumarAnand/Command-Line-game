#!/user/bin/env node

import chalk from 'chalk'
import inquirer from 'inquirer'
import gradient from 'gradient-string'
import chalkAnimation from 'chalk-animation'
import figlet from 'figlet'
import { createSpinner } from 'nanospinner'

let playerName

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))


async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow('Who wants to be a Millionaire? \n')
  await sleep()
  rainbowTitle.stop()

  console.log(
    `${chalk.bgBlue('HOW TO PLAY')}
    I'm a process on your computer. I'm going to ask you a series of questions.
    If you answer a question incorrectly, I will be ${chalk.red('Killed')}. 
    So answer all questions correctly....
    `)
}

async function askName() {
  const answer = await inquirer.prompt({
    name: 'player_name',
    type: 'input',
    message: 'What is your name?',
    default() {
      return 'Player'
    },
  })

  playerName = answer.player_name
}

async function question1() {
  const answers = await inquirer.prompt({
    name: 'question1',
    type: 'list',
    message: 'What is the capital of India? \n',
    choices: [
      'Mumbai',
      'Chennai',
      'New Delhi',
      'Kolkata',
    ],
  })

  return handleAnswer(answers.question1 == 'New Delhi')
}

async function question2() {
  const answers = await inquirer.prompt({
    name: 'question2',
    type: 'list',
    message: 'Who is the prime minister of India ? \n',
    choices: [
      'Priyanka Chopra',
      'Narendra Modi',
      'Sachin Tendulkar',
      'Shahrukh Khan',
    ],
  })

  return handleAnswer(answers.question2 == 'Narendra Modi')
}

async function question3() {
  const answers = await inquirer.prompt({
    name: 'question3',
    type: 'list',
    message: 'What is India most popular for? \n',
    choices: [
      'Yoga & Sprituality',
      'Bollywood',
      'Innovative Technologies',
      'Food',
    ],
  })

  return handleAnswer(answers.question3 == 'Yoga & Sprituality')
}

async function question4() {
  const answers = await inquirer.prompt({
    name: 'question4',
    type: 'list',
    message: 'When did India got its independence from British? \n',
    choices: [
      '15th July 1947',
      '15th June 1947',
      '15th August 1947',
      '15th September 1947',
    ],
  })

  return handleAnswer(answers.question4 == '15th August 1947')
}

async function question5() {
  const answers = await inquirer.prompt({
    name: 'question5',
    type: 'list',
    message: 'Who invented Zero? \n',
    choices: [
      'Aryabhatta',
      'Vishwarupa',
      'Samudragupta',
      'Visvesvaraya',
    ],
  })

  return handleAnswer(answers.question5 == 'Aryabhatta')
}


async function handleAnswer(isCorrect) {
  const spinner = createSpinner('Checking Answer...').start()
  await sleep()

  if (isCorrect) {
    spinner.success({ text: `Nice Work ${playerName}!. That's a Legit answer.` })
  } else {
    spinner.error({ text: ` Oh no! ${playerName} Wrong Answer. You are ${chalk.red('Killed')} 🕱 🕱 🕱  Game Over.` })
    process.exit(1)
  }
}

function winner() {
  console.clear()
  const msg = `Congrats ,  ${playerName}! \n  \n $ 1 , 0 0 0 , 0 0 0 `
  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data))
  })
}


await welcome()
await askName()
await question1()
await question2()
await question3()
await question4()
await question5()
await winner()

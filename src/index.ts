#!/usr/bin/env node
import chalk from "chalk"
import { copy } from "fs-extra"
import { prompt } from "inquirer"
import { join } from "path"
import updateNotifier from "update-notifier"

import packageJson from "../package.json"
import { allowedDependencyManager, projectInstall } from "./features/dependenciesManager"
import questions from "./questions"
import { capitalize } from "./utils"

const main = async () => {
	const notifier = updateNotifier({ pkg: packageJson })

	if (notifier.update) {
		notifier.notify()
		return
	}

	const { type, name, dependenciesManager } = await prompt(questions)

	const templateDir = join(__dirname, "..", "templates", type)
	const targetDir = join(process.cwd(), name)

	console.log(`Creating project ${capitalize(type)} in ${chalk.blue(targetDir)}`)

	await copy(templateDir, targetDir)

	console.log("Installing packages.. This might take a couple of minutes.")

	if (!allowedDependencyManager(dependenciesManager)) console.log(`Automatic installation don't work with ${dependenciesManager}. Please install dependencies manually.`)

	await projectInstall({ prefer: dependenciesManager, cwd: targetDir })

	console.log()
	console.log("Done! Created %s at %s", name, targetDir)
	console.log()

	console.log("You can now run the following commands:")
	console.log()

	console.log(` ${chalk.cyan("$ cd")} ${name}`)
	console.log(" And start coding!")
}

main()

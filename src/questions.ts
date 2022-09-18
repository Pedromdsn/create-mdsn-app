import { pathExists } from "fs-extra"
import { QuestionCollection } from "inquirer"
import { join } from "path"

import config from "./config"
import { templatesSerializedName } from "./features/getTemplates"

const questions: QuestionCollection<Answers> = [
	{
		type: "input",
		message: "Project name:",
		name: "name",
		default: "mdsn-project",
		async validate(input: string) {
			const oneWord = input.split(" ").length === 1
			if (!oneWord) console.log("\nProject name can't contain spaces")

			const targetDir = join(process.cwd(), input)
			const existTargetDir = await pathExists(targetDir)

			if (existTargetDir) console.log("\nTarget directory already exists")

			return oneWord && !existTargetDir
		},
		filter(input) {
			return input.toLowerCase()
		},
	},
	{
		type: "list",
		message: "Type of project:",
		name: "type",
		choices: config.PROJECTS.map((project) => (project.name)),
		filter(input) {
			return input.toLowerCase()
		},
	},
	{
		type: "list",
		message: "Dependencies manager:",
		name: "dependenciesManager",
		choices: ["Yarn", "NPM", "Pnpm"],
		filter(input) {
			return input.toLowerCase()
		},
	},
]

export default questions

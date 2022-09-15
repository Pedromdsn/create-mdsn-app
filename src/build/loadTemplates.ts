import { mkdir, remove } from "fs-extra"
import { clone } from "git-repo-clone"
import { join } from "path"

import config from "../config"
import { templateDir } from "./"

const main = async () => {
	await remove(templateDir)
	await mkdir(templateDir)

	config.PROJECTS.forEach(async (project) => {
		const projectDir = join(templateDir, project.name)
		await clone(project.url, "main", projectDir)
		await remove(`${projectDir}"/.git"`)
		await remove(`${projectDir}"/yarn.lock"`)
	})
}

main()

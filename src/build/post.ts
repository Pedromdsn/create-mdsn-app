import { copy } from "fs-extra"

import { targetDir, templateDir } from "./"

const main = async () => {
	await copy(templateDir, targetDir)
};

main()

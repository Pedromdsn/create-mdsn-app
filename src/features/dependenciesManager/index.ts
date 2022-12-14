import execa from "execa"

export const projectInstall = async ({ prefer, cwd }: InstallConfig) => {
	const manager = await getManager(prefer)
  if (!allowedDependencyManager(manager)) return false

  const command = commands[manager]

  const done = await execa(command, { cwd, stdio: "inherit" })
  return !!done
};

const isManagerInstalled = async (manager: SupportedPackageManagers) => {
	return new Promise((resolve) =>
		execa(manager, ["--version"])
			.then(() => resolve(true))
			.catch(() => resolve(false))
	);
}

const getManager = async (prefer?: SupportedPackageManagers) => {
	if (prefer) {
		const isInstalled = await isManagerInstalled(prefer)
    if (isInstalled) return prefer
  }
	return "npm"
};
const commands = {
	npm: "npm i",
	yarn: "yarn",
}

export const allowedDependencyManager = (manager: SupportedPackageManagers) => {
	const command = commands[manager]
  return !!command
};

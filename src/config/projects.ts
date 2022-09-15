const PROJECTS: Project[] = [
	{
		name: "frontend",
		description: "NextJS StartKit",
		url: "https://github.com/Pedromdsn/NextJS-StartKit",
	},
	{
		name: "backend",
		description: "ExpressJS StartKit",
		url: "https://github.com/Pedromdsn/Express-Template",
	},
]

interface Project {
	name: string
	description: string
	url: string
}

export default Object.freeze(PROJECTS)

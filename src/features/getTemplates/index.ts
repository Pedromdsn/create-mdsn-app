import { readdirSync } from "fs-extra"
import { join } from "path"

import { capitalize } from "../../utils"

const getTemplates =  () => {
	const templates = readdirSync(join(__dirname, "..", "..","..", "templates"))
	const serializedName = templates.map((template) => capitalize(template))
	return { serializedName, rawNames: templates }
}

export const templatesSerializedName = getTemplates().serializedName

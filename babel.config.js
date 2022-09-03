const tsconfig = require("./tsconfig.json")

const { compilerOptions } = tsconfig
const { paths } = compilerOptions

const alias = Object.keys(paths).reduce((acc, key) => {
	const value = paths[key]
	const path = value[0]
	acc[key.replace("/*", "")] = "./src/" + path.replace("/*", "")
	return acc
}, {})

module.exports = {
	presets: [
		[
			"@babel/preset-env",
			{
				targets: {
					node: "current",
				},
			},
		],
		"@babel/preset-typescript",
	],
	plugins: [
		"babel-plugin-transform-typescript-metadata",
		[
			"module-resolver",
			{
				alias,
			},
		],
	],
	// ignore: ["**/*.spec.ts"],
}

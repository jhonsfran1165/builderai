import { execSync } from "node:child_process"
import type { PackageJson, PlopTypes } from "@turbo/gen"

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("init", {
    description: "Generate a new package for the Unprice Monorepo",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the package? (You can skip the `@unprice/` prefix)",
      },
      {
        type: "input",
        name: "deps",
        message: "Enter a space separated list of dependencies you would like to install",
      },
    ],
    actions: [
      (answers) => {
        if ("name" in answers && typeof answers.name === "string") {
          if (answers.name.startsWith("@unprice/")) {
            answers.name = answers.name.replace("@unprice/", "")
          }
        }
        return "Config sanitized"
      },
      {
        type: "add",
        path: "internal/{{ name }}/package.json",
        templateFile: "templates/package.json.hbs",
      },
      {
        type: "add",
        path: "internal/{{ name }}/tsconfig.json",
        templateFile: "templates/tsconfig.json.hbs",
      },
      {
        type: "add",
        path: "internal/{{ name }}/index.ts",
        template: "export * from './src';",
      },
      {
        type: "add",
        path: "internal/{{ name }}/src/index.ts",
        template: "export const name = '{{ name }}';",
      },
      {
        type: "modify",
        path: "internal/{{ name }}/package.json",
        async transform(content, answers) {
          const pkg = JSON.parse(content) as PackageJson
          for (const dep of answers.deps.split(" ").filter(Boolean)) {
            const version = await fetch(`https://registry.npmjs.org/-/package/${dep}/dist-tags`)
              .then((res) => res.json())
              .then((json) => json.latest)
            pkg.dependencies![dep] = `^${version}`
          }
          return JSON.stringify(pkg, null, 2)
        },
      },
      async (answers) => {
        /**
         * Install deps and format everything
         */
        execSync("pnpm manypkg fix", {
          stdio: "inherit",
        })
        execSync(
          `pnpm fmt --write internal/${(answers as { name: string }).name}/** --list-different`
        )
        return "Package scaffolded"
      },
    ],
  })
}

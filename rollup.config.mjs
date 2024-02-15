import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";

const external = ["openapi-fetch"];

export default [
    // CommonJS (for Node)
    {
        input: ["src/index.ts"],
        output: {
            dir: "build/cjs",
            format: "cjs",
            sourcemap: true,
            // preserveModules: true,
            // preserveModulesRoot: "src",
        },
        // external,
        plugins: [
            typescript({ exclude: ["**/*.test.ts"], tsconfigOverride: { compilerOptions: { declaration: false } } }),
            // alias({
            //     entries: [{ find: "openapi-fetch", replacement: "openapi-fetch/dist/cjs/index.cjs" }],
            // }),
            resolve(),
            commonjs(),
        ],
    },
    // ES module (for bundlers)
    {
        input: ["src/index.ts"],
        output: {
            dir: "build/esm",
            format: "es",
            sourcemap: true,
            preserveModules: true,
            preserveModulesRoot: "src",
        },
        plugins: [typescript({ exclude: ["**/*.test.ts"] })],
    },
];

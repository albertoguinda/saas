import { runCLI } from "jest";
import { join } from "node:path";

const coverage = Boolean(process.env.COVERAGE);

await runCLI({ coverage }, [join(process.cwd(), "jest.config.js")]);

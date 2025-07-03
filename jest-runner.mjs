import { runCLI } from 'jest';
import { join } from 'node:path';

await runCLI({}, [join(process.cwd(), 'jest.config.js')]);

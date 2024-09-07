# ESM Demo

for Just-Like-That bootcamp: This project demonstrates how to use ECMAScript Modules (ESM) with Node.js using the `esm` package. It includes setup instructions for running JavaScript files and testing with Jest.

## Project Structure

- `src/every.js`: Main JavaScript file to be executed.
- `src/every.test.js`: Jest test file for testing `every.js`.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed on your machine. You can download them from [Node.js official website](https://nodejs.org/).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hdriel/esm-demo.git
   cd esm-demo
   npm install
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Project Configuration

   ESM Setup: The project uses the esm package to enable ESM support in Node.js.<br>
   Jest Configuration: Jest is configured with Babel to handle modern JavaScript features.

4. Usage

   - Run the main script (every.js):

     To run the main JavaScript file using ESM, use the following command:

     ```bash
     npm run main:esm
     ```

   - Run tests with Jest:

     To run all the test files (\*.test.js), use:

     ```bash
     npm test
     ```

5. Scripts

   The following scripts are defined in package.json:

   - main:esm: Runs src/every.js with ESM support using the esm package.
   - test: Runs all Jest tests found in the project.

   Additional Information

   - Jest Configuration: Jest is configured with Babel using babel-jest to support modern JavaScript syntax.

### Explanation

Running every.js file with esm code like export

```js
// module.exports = function every(array) {
export function every(array) {
  if (!array.length) {
    return true;
  }

  return !!array[0] && every(array.slice(1));
}

console.log("is all true ? ", every([true, false, true]));
```

will throw the exception error:

```bash
> node ./src/every.js
export function every(array) {
^^^^^^

SyntaxError: Unexpected token 'export'
    at Object.compileFunction (node:vm:360:18)
    at wrapSafe (node:internal/modules/cjs/loader:1088:15)
    at Module._compile (node:internal/modules/cjs/loader:1123:27)
    at Module._extensions..js (node:internal/modules/cjs/loader:1213:10)
    at Module.load (node:internal/modules/cjs/loader:1037:32)
    at Module._load (node:internal/modules/cjs/loader:878:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)
    at node:internal/main/run_main_module:23:47

Node.js v18.12.1
```

to avoid this esm error on commonjs file run via:

```bash
> node -r esm ./src/every.js

"is all true ? false"
```

Running test like every.test.js file with esm code:

```js
import { every } from "../every";

test("test the every recursive function", () => {
  expect(every([true, 1, true, ""])).toBe(false);
});
```

will throw the exception error:

```bash
> jest

 FAIL  src/__tests__/every.test.js
  ● Test suite failed to run

    Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns"
in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/configuration
    For information about custom transformations, see:
    https://jestjs.io/docs/code-transformation

    Details:

    D:\dev\esm\src\__tests__\every.test.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){import { every } from "../every";
                                                                                      ^^^^^^

    SyntaxError: Cannot use import statement outside a module

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1505:14)

Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        0.367 s, estimated 1 s
Ran all test suites.
```

to avoid this esm error on commonjs file run via:

add babel file like `babel.config.js`

```js
module.exports = {
  presets: ["@babel/preset-env"],
};
```

and config the jest.config.js file with babel-jest transform

```js
const config = {
  coverageProvider: "v8",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
};

module.exports = config;
```

and run again:

```bash
> jest

  console.log
    is all true ?  false

      at Object.log (src/every.js:10:9)

 PASS  src/__tests__/every.test.js
  √ test the every recursive function (2 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.5 s
Ran all test suites.
```

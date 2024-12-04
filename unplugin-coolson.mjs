import { createUnplugin } from 'unplugin';
import chalk from 'chalk';

const filter = id => id.endsWith('.coolson');

function wait() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
}

const unplugin = createUnplugin(options => {
  let buildStartComplete = false;

  return {
    name: 'faulty-plugin',

    async buildStart() {
      console.log(`-- ${chalk.yellowBright('buildStart')} call`);

      try {
        await wait();

        // if (shouldFail ?? true) {
        //   console.warn('shouldFail set to true, failing');

        //   throw new Error('shouldFail is set to true');
        // }

        buildStartComplete = true;

        console.log(
          `${chalk.green('√')} ${chalk.yellowBright('buildStart')} return`,
        );
      } catch (err) {
        console.warn(
          `${chalk.redBright('×')} ${chalk.yellowBright('buildStart')} thrown`,
          err,
        );

        throw err;
      } finally {
        console.log(`-- ${chalk.yellowBright('buildStart')} end`);
      }
    },

    webpack(compiler) {
      console.log(`-- ${chalk.blue('webpack')} call`);

      try {
        compiler.options.module.rules.push({
          test: filter,
          type: 'javascript/auto',
        });
      } finally {
        console.log(`-- ${chalk.blue('webpack')} end`);
      }
    },

    transformInclude(id) {
      return id.endsWith('.coolson');
    },

    async transform(_code, _id) {
      console.log(`-- ${chalk.greenBright('transform')} call`);

      try {
        if (!buildStartComplete) {
          console.error(
            'transform call without without buildStart completion, throwing!',
          );

          throw new Error(
            'transform method was called either before buildStart call was completed or after it has thrown an error',
          );
        }

        console.log(
          `${chalk.green('√')} ${chalk.greenBright('transform')} return`,
        );

        return {
          code: 'const COOLSON = function () { return "not implemented!" }; export { COOLSON }',
        };
      } catch (err) {
        console.warn(
          `${chalk.redBright('×')} ${chalk.greenBright('transform')} thrown`,
          err,
        );

        throw err;
      } finally {
        console.log(`-- ${chalk.greenBright('transform')} end`);
      }
    },
  };
});

const webpackPlugin = unplugin.webpack;
const rspackPlugin = unplugin.rspack;

export { webpackPlugin, rspackPlugin };

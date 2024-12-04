import path from 'path';
import { webpackPlugin } from './unplugin-coolson.mjs';

import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default {
  entry: './src/index.mjs',
  plugins: [webpackPlugin()],
};

import { webpackPlugin } from './unplugin-coolson.mjs';

export default {
  entry: './src/index.mjs',
  plugins: [webpackPlugin()],
};

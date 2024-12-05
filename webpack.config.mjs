// import { rspackPlugin } from './unplugin-coolson.mjs';
import { join } from 'path';
const __dirname = new URL('.', import.meta.url).pathname;

export default {
  mode: 'production',
  context: __dirname,
  entry: {
    main: [join(__dirname, './src/main.mjs')],
    'assets/react': [join(__dirname, './src/assets/react.svg')],
  },
  resolve: {
    extensions: ['...', '.ts', '.tsx', '.jsx'],
  },
  externals: [
    // ({ request, dependencyType, contextInfo }, callback) => {
    //   if (request?.[0] === '.') {
    //     return callback(undefined, request);
    //   }
    // },
  ],
  stats: 'verbose',
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    publicPath: '/',
    module: true,
    chunkFormat: 'module',
    library: {
      type: 'modern-module',
    },
    chunkLoading: 'import',
    workerChunkLoading: 'import',
    wasmLoading: 'fetch',
  },

  externalsType: 'module-import',
  experiments: {
    css: true,
    asyncWebAssembly: true,
    outputModule: true,
  },
  optimization: {
    minimize: false,
  }
};

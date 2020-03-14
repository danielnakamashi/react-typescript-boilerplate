import path from 'path';
import { Configuration, Plugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = (env: { [key: string]: string }, argv: Configuration): Configuration => {
  const configProd = {
    entry: path.resolve(__dirname, './src/components/App/index.tsx'),
    output: {
      path: path.resolve(__dirname, './lib'),
      libraryTarget: 'commonjs2',
    },
    externals: {
      react: 'commonjs2 React',
    },
  };
  const configDev = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Simple JSON editor',
        template: require('html-webpack-template'),
        appMountId: 'root',
      }),
    ],
  };

  return {
    ...(argv.mode === 'development' ? configDev : configProd),
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader',
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.ts', '.tsx'],
    },
  } as Configuration;
};

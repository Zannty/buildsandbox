const HtmlWebPackPlugin = require("html-webpack-plugin");
const CssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env = {}) => {
  const { mode = "development" } = env;
  const isProd = mode === "production";
  const isDev = mode === "development";

  const styleLoaders = () => {
    return [isProd ? CssExtractPlugin.loader : "style-loader", "css-loader"];
  };
  const getPlugins = () => {
    const plugins = [
      new HtmlWebPackPlugin({
        title: "Build",
        buildTime: new Date().toDateString(),
        template: "index.html"
      })
    ];
    if (isProd) {
      plugins.push(
        new CssExtractPlugin({
          filename: "main-[hash:8].css"
        })
      );
    }

    return plugins;
  };
  return {
    mode: isProd ? "production" : "development",
    output: {
      filename: isProd ? "main-[hash:8].js" : undefined
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
        {
          test: /\.css$/,
          use: styleLoaders()
        },
        {
          test: /\.(s[ca]ss)$/,
          use: [...styleLoaders(), "sass-loader"]
        },
        {
          test: /\.(png|jpg|ico|jpeg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images",
                name: "[name]-[sha1:hash:7].[ext]"
              }
            }
          ]
        },
        {
          test: /\.(ttf|otf|woff|woof2)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "fonts",
                name: "[name].[ext]"
              }
            }
          ]
        }
      ]
    },
    plugins: getPlugins(),
    devServer: {
      open: true
    }
  };
};

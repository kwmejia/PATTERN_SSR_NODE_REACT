const path = require("path");

module.exports = {
  mode: "development", // cambia a 'production' en deploy
  entry: "./src/client/main.tsx",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/static"),
    publicPath: "/static/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@client": path.resolve(__dirname, "src/client"),
      "@components": path.resolve(__dirname, "src/client/components"),
      "@pages": path.resolve(__dirname, "src/client/pages"),
    },
  },
};

const TerserPlugin = require("terser-webpack-plugin");

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
  // When using webpack's default optimizer, the output file may contain non-UTF-8
  // characters. This doesn't work for Chrome extensions. See, e.g.,
  // <https://stackoverflow.com/q/49979397/353337>. A workaround is to use Terser which
  // allows enforcing ASCII.
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: { ascii_only: true },
        },
      }),
    ],
  },
  // Use source-map to avoid illegal eval()s in the generated code, cf.
  // <https://github.com/webpack/webpack/issues/4899#issuecomment-609737316>.
  devtool: "source-map",
});

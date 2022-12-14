const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: "./src/index.js",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
					},
				],
			},
			{
				test: /\.(css|scss)$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				type: "asset",
			},
		],
	},
	resolve: {
		extensions: ["*", ".js", ".jsx"],
		alias: {
			"@components": path.resolve(__dirname, "src/components/"),
			"@containers": path.resolve(__dirname, "src/containers/"),
			"@pages": path.resolve(__dirname, "src/pages/"),
			"@hooks": path.resolve(__dirname, "src/hooks/"),
			"@routes": path.resolve(__dirname, "src/routes/"),
			"@styles": path.resolve(__dirname, "src/styles/"),
			"@icons": path.resolve(__dirname, "src/assets/icons/"),
			"@logos": path.resolve(__dirname, "src/assets/logos/"),
			"@images": path.resolve(__dirname, "src/assets/images/"),
		},
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
		publicPath: "/",
	},
	mode: "development",
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			filename: "./index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
	],
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
		},
		hot: true,
		open: true,
		compress: true,
		historyApiFallback: {
			index: 'dist/index.html'
		},
	}
};
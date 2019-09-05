const path = require("path")
const htmlWebpackPlugin = require("html-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: "production",
    entry: path.join(__dirname, "./src/main.js"),
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "bundle.js"
    },
    devServer: {  //配置dev-server 的命令参数
        open: true, // 自动打开浏览器
        port: 3000, // 修改启动的运行端口
        contentBase: "src", // 指定托管路径
        hot: true, // 启动热更新
    },
    plugins: [
        new htmlWebpackPlugin({
            //创建一个 在内存中生成html的插件
            template: path.join(__dirname, "./src/index.html"),
            filename: "index.html"
        }),
        new VueLoaderPlugin()

    ],
    module: { // 配置所有的第三方魔块加载器
        rules: [
            {test: /\.css$/, use: ["style-loader", "css-loader"]},//从右到左进行处理
            {test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"]},
            {test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"]},
            {test:/\.(jpg|png|gif|bmp|jpeg)$/,use:"url-loader?limit=20000&[hash:8]-name=[name].[ext]"},
            //limit给定的值是图片的大小，单位bit，如果图片>=limit值 不会被转为base64字符串。
            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:"url-loader"},
            //处理字体图标
            {test:/\.js$/,use:"babel-loader",exclude:/node_modules/},
            {test:/\.vue$/,use:"vue-loader"}
        ]

    },
    // resolve: {
    //     alias: {
    //         "vue$" :"vue/dist/vue.js"
    //     }
    // }
}
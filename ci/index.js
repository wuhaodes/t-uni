const ci = require('miniprogram-ci');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { readFileSync, writeFileSync } = require('fs');

// 获取当前文件夹地址
const dirPath = path.resolve(__dirname);

const sourcePathArr = dirPath.split('\\')
sourcePathArr.pop();

// 获取项目根目录地址
const sourcePath = sourcePathArr.join('\\');

// 获取ext.json位置
const extJsonPath = path.resolve(sourcePath, 'ext.json');

const extStr = readFileSync(extJsonPath, { encoding: "utf-8" })
const ext = JSON.parse(extStr);

// 获取编译后的文件夹
const projectPathDir = ext.projectPathDir;
// 获取appid
const appid = ext.extAppid;

// 上传代码的位置
const projectPath = path.resolve(sourcePath, `${projectPathDir}/mp-weixin`);
// 私钥文件地址
const privateKeyPath = path.resolve(sourcePath, `ci/private.${appid}.key`);


// vesion
const version = (parseInt(ext.version.split('.').join("")) + 1 + '').padStart(3, 0).split('').join('.');

async function upload(desc = 'first upload by ci') {
    console.log(chalk.cyan('开始上传。。。'))
    const project = new ci.Project({
        appid,
        type: 'miniProgram',
        projectPath,
        privateKeyPath,
        ignores: ['node_modules/**/*'],
    });
    const uploadResult = await ci.upload({
        project,
        version,
        desc,
        setting: {
            es6: true,
        },
        onProgressUpdate: function (e) {
            console.log(chalk.cyan('正在上传中。。。', e))
        },
    });
    console.log(chalk.cyan('上传完成。。。', JSON.stringify(uploadResult.subPackageInfo)))
}
// 立即执行函数执行上传等异步任务
; (async () => {
    // 获取上传描述
    const prot = await inquirer.prompt({
        type: "input",
        name: "desc",
        message: "请输入上传描述：",

    })
    await upload(prot.desc);
    writeFileSync(extJsonPath, JSON.stringify({ ...ext, version }, null, "\t"))
})()

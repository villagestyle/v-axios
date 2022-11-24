const fs = require('fs');
const path = require('path')

fs.copyFile(path.resolve(__dirname, 'src/vAxios.ts'), "dist/lib/vAxios.ts", (err) => {
    if  (err) {
        console.error('vAxios复制失败', err);
    } else {
        console.log('===== vAxios复制成功 =====');
    }
});

fs.copyFile(path.resolve(__dirname, 'src/index.d.ts'), "dist/lib/index.d.ts", (err) => {
    if  (err) {
        console.error('类型文件复制失败', err);
    } else {
        console.log('===== 类型文件复制成功 =====');
    }
});

fs.copyFile(path.resolve(__dirname, 'libPackage.json'), "dist/package.json", (err) => {
    if  (err) {
        console.error('package复制失败', err);
    } else {
        console.log('===== package复制成功 =====');
    }
});

fs.writeFile(path.resolve(__dirname, 'dist/index.ts'), `export * from './lib/vAxios';`, (err) => {
    if  (err) {
        console.error('TS导入文件创建失败', err);
    } else {
        console.log('===== 创建TS导入文件成功 =====');
    }
})

fs.writeFile(path.resolve(__dirname, 'dist/index.js'), `module.exports = require('./lib/vAxios.es');`, (err) => {
    if  (err) {
        console.error('导入JS文件创建失败', err);
    } else {
        console.log('===== 创建JS导入文件成功 =====');
    }
})

fs.copyFile(path.resolve(__dirname, 'README.md'), "dist/README.md", (err) => {
    if  (err) {
        console.error('README复制失败', err);
    } else {
        console.log('===== README复制成功 =====');
    }
});
const { execSync } = require('child_process'); // 引入同步执行命令模块
const fs = require('fs'); // 引入文件系统模块

console.log('📦 开始构建和导出Docker镜像...');

// 配置变量
const IMAGE_NAME = 'my-html-app';
const TAR_FILE = `${IMAGE_NAME}.tar`;

try {
    // 检查Dockerfile是否存在
    if (!fs.existsSync('./Dockerfile')) {
        console.error('❌ 找不到Dockerfile文件');
        process.exit(1);
    }

    // 检查index.html是否存在
    if (!fs.existsSync('./index.html')) {
        console.error('❌ 找不到index.html文件');
        process.exit(1);
    }

    console.log('🔨 正在构建Docker镜像...');
    
    // 构建Docker镜像
    execSync(`docker build -t ${IMAGE_NAME} .`, { stdio: 'inherit' });
    
    console.log('\n✅ 镜像构建成功，开始导出镜像...');
    
    // 删除旧的tar文件（如果存在）
    if (fs.existsSync(TAR_FILE)) {
        fs.unlinkSync(TAR_FILE);
        console.log('🗑️  已删除旧的镜像文件');
    }
    
    // 导出镜像
    execSync(`docker save -o ${TAR_FILE} ${IMAGE_NAME}:latest`, { stdio: 'inherit' });
    
    // 检查文件是否成功创建
    if (fs.existsSync(TAR_FILE)) {
        const stats = fs.statSync(TAR_FILE);
        const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log('\n✅ 镜像导出成功！');
        console.log(`📁 导出文件: ${TAR_FILE} 文件大小: ${fileSizeMB} MB`);
        console.log('\n📋 接下来：');
        console.log('1. 复制 my-html-app.tar 和 deploy-to-server.sh 到Ubuntu');
        console.log('2. 在Ubuntu上运行: ./deploy-to-server.sh');
        
    } else {
        console.error('❌ 镜像导出失败');
        process.exit(1);
    }
    
} catch (error) {
    console.error('\n❌ 操作失败：');
    console.error(error.message);
    process.exit(1);
}

# HTML Docker 部署项目

将HTML文件打包成Docker镜像，通过nginx反向代理访问。

## 📁 项目结构

```
docker-demo/
├── index.html              # HTML文件（项目主应用）
├── Dockerfile              # Docker镜像构建配置
├── export-image.js         # 构建导出脚本 (Windows)
├── deploy-to-server.sh     # 部署脚本 (Ubuntu)
├── build.bat               # Windows批处理文件
└── README.md               # 说明文档
```

## 🚀 快速部署

### 1️⃣ Windows上构建镜像

```bash
# 方法一：Node.js
node export-image.js

# 方法二：双击运行
build.bat
```

### 2️⃣ 复制文件到Ubuntu

使用WinSCP或其他工具复制以下文件：
- `my-html-app.tar` (镜像文件)
- `deploy-to-server.sh` (部署脚本)

### 3️⃣ Ubuntu上一键部署

```bash
# 让脚本获得可执行权限
chmod +x deploy-to-server.sh

# 运行脚本
./deploy-to-server.sh
```

### 4️⃣ 配置nginx代理

在nginx配置中添加：
```nginx
location /dockerDemo/ {
    proxy_pass http://localhost:20000/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

## 🌐 访问地址

- **通过nginx代理**: https://ashuai.site/dockerDemo/
- **直接访问（假设服务器放开了这个20000端口）**: http://服务器IP:20000/

## 🛠️ 常用管理命令

```bash
# 查看状态
docker ps

# 查看日志  
docker logs html-app-container

# 重启服务
docker restart html-app-container

# 停止服务
docker stop html-app-container
```

## ⚠️ 常见问题

- **端口冲突**: 修改 `deploy-to-server.sh` 中的端口号
- **容器启动失败**: 检查 `docker logs html-app-container`
- **无法访问**: 检查防火墙和nginx配置
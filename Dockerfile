# 默认从 Docker Hub上下载基于Alpine Linux的轻量级版本的nginx，当执行docker打包镜像命令后，流程是：
# 自己windows电脑的命令行会触发Docker Desktop依据 WSL2 Linux内核从而下载nginx:alpine到WSL2文件系统
# 自己的nginx:alpine会下载到C:\Users\lss13\AppData\Local\Docker\wsl\disk文件夹中
# 有一个docker_data.vhdx硬盘映像文件
# 文件很大，类似压缩包，包含很多东西，其中就有下载的nginx:alpine镜像，也有构建出的新镜像和以往构建的老镜像
FROM nginx:alpine

# 将当前目录下的HTML文件复制到镜像中的/usr/share/nginx/html/目录
# 镜像最终存储在docker_data.vhdx虚拟磁盘中
# /usr/share/nginx/html/这个文件夹路径，是nginx用来默认存放静态资源的路径（规定，不用去修改）
# 至此，镜像文件中，已经包含了nginx的一堆东西和html，当然还有别的docker的一堆东西
COPY index.html /usr/share/nginx/html/

# EXPOSE不会实际开放端口，单纯的语法，不写也行（NGINX默认就是80端口）
EXPOSE 80

# 启动nginx  -g是全局配置命令  daemon off关闭后台运行模式
# （能够确保 nginx 前台运行，避免容器启动后立即退出）
# 这个cmd指令，会被存放在镜像文件中，当镜像被丢到服务器上后
# 当在服务器上执行docker run这个镜像的时候，才会进一步触发镜像里面的这个cmd命令执行
# 才会让镜像中的nginx启动起来，有这样的web服务，才能访问到镜像里面的html文件
CMD ["nginx", "-g", "daemon off;"]
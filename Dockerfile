# 使用nginx alpine版本，轻量级
FROM nginx:alpine

# 将HTML文件复制到nginx的文档根目录
COPY index.html /usr/share/nginx/html/

#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# ===================== 第一步：提交项目源码到 main 分支 =====================
# 1. 添加所有源码文件（.gitignore 中配置的文件会自动忽略）
git init
git add -A
git commit -m "docs: update project source code" || echo "No changes to commit for source code"

# 3. 关联远程仓库
git remote add origin git@github.com:zzxrepository/mmzhang-blog.git || echo "Remote origin already exists"

# 4. 推送源码到远程 main 分支
git push -u origin main

# ===================== 第二步：推送静态文件到 gh-pages 分支 =====================
# 生成静态文件
npm run docs:build

# 进入生成的静态文件目录（已适配你的 src 源码路径）
cd src/.vuepress/dist

# 初始化临时仓库并提交静态文件
git init
git add -A
git commit -m 'deploy: update static files to gh-pages'

# 强制推送静态文件到 gh-pages 分支（核心：替换为你的仓库地址）
git push -f git@github.com:zzxrepository/mmzhang-blog.git master:gh-pages

# 返回项目根目录
cd -

echo "✅ 部署完成！源码已推送到 main 分支，静态文件已推送到 gh-pages 分支"
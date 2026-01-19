# 确保脚本抛出遇到的错误
$ErrorActionPreference = "Stop"

# ===================== 第一步：提交项目源码到 master 分支 =====================
Write-Host "提交项目源码到 master 分支..." -ForegroundColor Green

# 1. 添加所有源码文件（.gitignore 中配置的文件会自动忽略）
git add -A
git commit -m "docs: update project source code" 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "No changes to commit for source code" -ForegroundColor Yellow
}

# 3. 关联远程仓库
try {
    git remote add origin git@github.com:zzxrepository/mmzhang-blog.git
} catch {
    Write-Host "Remote origin already exists" -ForegroundColor Yellow
}

# 4. 推送源码到远程 master 分支
git push -u origin master

# ===================== 第二步：推送静态文件到 gh-pages 分支 =====================
Write-Host "生成静态文件..." -ForegroundColor Green
npm run docs:build

# 进入生成的静态文件目录（已适配你的 src 源码路径）
Set-Location src/.vuepress/dist

# 初始化临时仓库并提交静态文件
git init
git add -A
git commit -m 'deploy: update static files to gh-pages'

# 强制推送静态文件到 gh-pages 分支（核心：替换为你的仓库地址）
git push -f git@github.com:zzxrepository/mmzhang-blog.git master:gh-pages

# 返回项目根目录
Set-Location ../..

Write-Host "✅ 部署完成！源码已推送到 master 分支，静态文件已推送到 gh-pages 分支" -ForegroundColor Green
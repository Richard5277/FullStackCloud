npm & npx

详细对比

1. npx 可以运行未安装的包
bash
# 即使本地没安装，npx 会临时下载并运行
npx create-next-app@latest my-app

# 而 npm run 只能运行已安装的包
npm run create-next-app  # ❌ 错误：未定义的脚本

2. npm run 运行自定义命令组合
json
{
  "scripts": {
    "build": "tsc && node dist/index.js",
    "test": "jest --coverage && eslint .",
    "deploy": "npm run build && npm run test && git push"
  }
}
bash
npm run deploy  # 运行一系列命令
3. npx 可以指定包版本
bash
# npx 可以运行特定版本
npx tsx@4.7.0 src/test.ts
npx typescript@5.0.0 --version

# npm run 使用 package.json 中锁定的版本
实际使用场景
场景1：运行项目脚本（用 npm run）
json
{
  "scripts": {
    "start": "tsx src/index.ts",
    "test": "vitest",
    "lint": "eslint ."
  }
}
bash
npm run start
npm run test
npm run lint
场景2：运行一次性命令（用 npx）
bash
# 创建项目
npx create-vite my-app

# 检查更新
npx npm-check-updates

# 格式化代码
npx prettier --write .
场景3：两者可以互换的情况
bash
# 这两种方式等价（如果本地安装了 tsx）
npx tsx src/test.ts
npm run test  # 如果 package.json 中定义了 "test": "tsx src/test.ts"
优缺点
npx 的优点
✅ 无需配置，直接运行

✅ 可以运行未安装的包

✅ 可以指定版本

✅ 适合一次性命令

npm run 的优点
✅ 命令可以复用

✅ 可以组合多个命令

✅ 脚本有名称，更易读

✅ 团队共享配置

常见误解
误解1：npx 替代了 npm run
bash
# ❌ 错误理解
# 认为 npx 可以替代所有 npm run

# ✅ 正确理解
# npx 用于运行包，npm run 用于运行脚本
误解2：npx 总是下载包
bash
# npx 的查找顺序：
# 1. 本地 node_modules/.bin/
# 2. 全局安装
# 3. 临时下载（如果前面都没有）

npx tsx --version
# 如果本地有 tsx，使用本地的
# 如果没有，临时下载
实际例子
项目中的典型用法
json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc && vite build",
    "test": "vitest run",
    "lint": "eslint src/",
    "format": "prettier --write src/"
  }
}
bash
# 日常开发
npm run dev

# 偶尔使用
npx create-component my-component
npx update-browserslist-db
npx check-node-version
快捷方式
bash
# npm run 的简写
npm run test  →  npm test
npm run start  →  npm start
npm run build  →  npm build

# 其他脚本必须用完整形式
npm run deploy  # 不能简写
总结
特性	npm run	npx
运行自定义脚本	✅	❌
运行 npm 包	❌	✅
运行未安装的包	❌	✅
组合多个命令	✅	❌
团队共享	✅	手动
需要配置	是	否
结论：npx 和 npm run 是互补的，不是替代关系！

用 npm run 运行项目定义的脚本

用 npx 运行临时的包命令


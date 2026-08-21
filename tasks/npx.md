 是 npm 自带的命令，当你安装 Node.js 时，npm 和 npx 会一起自动安装。

npx 是什么？
npx = Node Package Execute（Node 包执行器）
它是 npm 5.2+ 版本内置的一个工具，不需要单独安装。

检查你的 npx
bash
# 查看 npx 版本
npx --version

# 查看 npx 位置
which npx
# 通常输出：/usr/local/bin/npx

# 查看 npm 版本（npm 和 npx 一起安装）
npm --version
npx 的神奇之处
1. 运行本地已安装的包
bash
# 假设你安装了 tsx
npm install -D tsx

# 这些命令等价
npx tsx src/test.ts
./node_modules/.bin/tsx src/test.ts
2. 运行未安装的包（临时下载）
bash
# 你没有安装 create-react-app，但 npx 会：
# 1. 检查本地是否有
# 2. 检查全局是否有
# 3. 都没有？临时下载到缓存
# 4. 运行
# 5. 用完后清理（或缓存）

npx create-react-app my-app
# 输出：Need to install the following packages:
#   create-react-app@5.0.1
# Ok to proceed? (y)
3. 运行一次性命令
bash
# 不想全局安装，只想用一次
npx cowsay "Hello"
npx http-server
npx json-server --watch db.json
实际演示
场景：你没有安装 TypeScript
bash
# 查看本地是否有 tsc
ls node_modules/.bin/tsc
# 输出：No such file or directory

# 但你可以直接用 npx 运行
npx tsc --version
# 输出：Need to install the following packages:
#   typescript@5.3.3
# Ok to proceed? (y) y
# Version 5.3.3

# 运行完后，再次检查
ls node_modules/.bin/tsc
# 还是没有！npx 只是临时使用
npx 的缓存机制
bash
# npx 下载的包存在缓存中
ls ~/.npm/_npx/
# 可以看到之前临时下载的包

# 下次再运行同样的命令，会更快
npx tsc --version
# 直接从缓存运行，不再询问
npx vs 全局安装
传统方式（全局安装）
bash
# 全局安装
npm install -g create-react-app

# 全局使用
create-react-app my-app

# 问题：
# 1. 占用全局空间
# 2. 版本管理困难
# 3. 可能冲突
现代方式（npx）
bash
# 无需安装，直接使用
npx create-react-app my-app

# 优点：
# 1. 不占用全局空间
# 2. 总是使用最新版本
# 3. 用完即走
npx 的查找顺序
bash
npx some-command

# 查找顺序：
# 1. 当前项目的 node_modules/.bin/
# 2. 全局安装的包
# 3. npm 缓存
# 4. 询问是否从 npm 下载
常见用法示例
1. 运行项目依赖
json
{
  "devDependencies": {
    "vitest": "^1.0.0"
  }
}
bash
# 不需要全局安装 vitest
npx vitest
npx vitest run
2. 尝试新工具
bash
# 想试试新的打包工具？
npx parcel index.html
npx vite
npx webpack

# 不用安装就能体验
3. 运行特定版本
bash
# 运行特定版本
npx typescript@4.9.5 --version
npx node@16 script.js
npx npm@8 install
4. 执行 GitHub 上的包
bash
# 直接从 GitHub 运行
npx github:user/repo
npx gist:user/gist-id
安全考虑
bash
# npx 会询问是否下载
npx some-unknown-package
# Need to install the following packages:
#   some-unknown-package@1.0.0
# Ok to proceed? (y)

# 使用 --yes 跳过询问（不推荐）
npx --yes some-package

# 使用 --no 拒绝
npx --no some-package
总结
npx 随 npm 一起安装，你已经有它了

npx 可以运行未安装的包（临时下载）

npx 优先使用本地已安装的包

npx 适合运行一次性命令

npx 不会污染你的项目或全局环境

简单说：npx 就像是一个"即用即走"的命令运行器，让你无需安装就能试用各种 npm 包！


# 🍃 温馨待办 - Cozy Todo

一个简洁温暖的待办清单 Web 应用，记录每一件值得期待的小事。

## ✨ 功能特性

- 📝 **待办管理** — 添加、完成、删除待办事项
- 🗂️ **多视图筛选** — 全部 / 待完成 / 已完成 / 回收站
- 🔐 **登录系统** — 简单的本地登录验证
- 💾 **本地持久化** — 数据存储在 localStorage，刷新不丢失
- 🎨 **温馨 UI** — 柔和配色 + 流畅动画过渡
- 📱 **响应式布局** — 适配桌面和移动端

## 🛠️ 技术栈

| 技术 | 说明 |
|------|------|
| [Vue 3](https://vuejs.org/) | 渐进式 JavaScript 框架 |
| [Vite](https://vitejs.dev/) | 下一代前端构建工具 |
| [Vue Router 4](https://router.vuejs.org/) | 官方路由管理器 |
| [Element Plus](https://element-plus.org/) | Vue 3 组件库 |

## 📦 安装与运行

```bash
# 克隆项目
git clone https://github.com/<your-username>/cozy-todo.git
cd cozy-todo

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 📁 项目结构

```
vue2/
├── index.html              # 入口 HTML
├── vite.config.js          # Vite 配置
├── package.json
├── public/                 # 静态资源
├── src/
│   ├── main.js             # 应用入口
│   ├── App.vue             # 根组件
│   ├── components/
│   │   ├── Navbar.vue      # 导航栏
│   │   └── TodoItem.vue    # 待办项组件
│   ├── views/
│   │   ├── Home.vue        # 全部待办
│   │   ├── Completed.vue   # 已完成
│   │   ├── Pending.vue     # 待完成
│   │   ├── Trash.vue       # 回收站
│   │   └── Login.vue       # 登录页
│   ├── router/
│   │   └── index.js        # 路由配置
│   ├── utils/
│   │   └── storage.js      # localStorage 工具
│   └── styles/
│       └── main.css        # 全局样式
└── dist/                   # 构建输出
```

## 📄 License

MIT

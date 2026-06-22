<div align="center">

# 🍃 Cozy Todo

**温馨待办 · 一个简洁温暖的待办清单 Web 应用**

<br>

![Vue 3](https://img.shields.io/badge/Vue_3-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Element Plus](https://img.shields.io/badge/Element_Plus-409EFF?style=for-the-badge&logo=element&logoColor=white)

<br>

记录每一件值得期待的小事

[功能特性](#功能特性) · [技术栈](#技术栈) · [快速启动](#快速启动)

</div>

---

## 功能特性

| 功能 | 说明 |
|------|------|
| 📝 待办管理 | 添加、完成、删除待办事项 |
| 🗂️ 多视图筛选 | 全部 / 待完成 / 已完成 / 回收站 |
| 🔐 登录系统 | 本地登录验证 |
| 💾 数据持久化 | localStorage 存储，刷新不丢失 |
| 🎨 温馨 UI | 柔和配色 + 流畅动画过渡 |
| 📱 响应式 | 桌面端与移动端自适应 |

---

## 技术栈

| 技术 | 职责 |
|------|------|
| Vue 3 | 渐进式 JavaScript 框架 |
| Vite | 下一代构建工具 |
| Vue Router 4 | 官方路由管理器 |
| Element Plus | Vue 3 组件库 |

---

## 快速启动

```bash
git clone https://github.com/H1nk5/cozy-todo.git
cd cozy-todo
npm install
npm run dev
```

---

## 项目结构

```
cozy-todo/
├── src/
│   ├── main.js              # 应用入口
│   ├── App.vue              # 根组件
│   ├── components/
│   │   ├── Navbar.vue       # 导航栏
│   │   └── TodoItem.vue     # 待办项组件
│   ├── views/
│   │   ├── Home.vue         # 全部待办
│   │   ├── Completed.vue    # 已完成
│   │   ├── Pending.vue      # 待完成
│   │   ├── Trash.vue        # 回收站
│   │   └── Login.vue        # 登录页
│   ├── router/index.js      # 路由配置
│   └── utils/storage.js     # localStorage 工具
└── dist/
```

---

## 开源许可

MIT © [H1nk5](https://github.com/H1nk5)

# 高校排课系统 (University Course Scheduling System)

一个基于Vue.js的现代化高校排课管理系统，提供课程安排、教师管理、学生管理等功能的综合性解决方案。

## 功能特点

- 🎓 多角色管理
  - 管理员：全系统管理权限
  - 教师：查看个人课表
  - 学生：查看班级课表
  
- 📚 课程管理
  - 课程信息维护
  - 教室资源管理
  - 课表编排与查询
  
- 👥 用户管理
  - 教师信息管理
  - 学生信息管理
  - 管理员信息管理

- 🔐 安全特性
  - 基于角色的访问控制
  - 用户认证与授权
  - 登录状态持久化

## 技术栈

- Vue.js 2.x
- Vue Router
- Element UI
- Axios
- ES6+

## 快速开始

### 环境要求

- Node.js >= 12.x
- npm >= 6.x

### 安装步骤

1. 克隆项目
```bash
git clone [repository-url]
cd [project-name]
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run serve
```

4. 构建生产版本
```bash
npm run build
```

## 项目结构

```
src/
├── assets/         # 静态资源
├── components/     # 公共组件
├── router/         # 路由配置
├── utils/          # 工具函数
├── views/          # 页面组件
└── App.vue         # 根组件
```

## 使用说明

1. 首次使用需要注册账号
2. 使用对应角色账号登录系统
3. 根据权限访问相应功能模块

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

[MIT License](LICENSE)

## 联系方式

如有任何问题或建议，欢迎提交 issue 或联系项目维护者。

## 致谢

感谢所有为本项目做出贡献的开发者。


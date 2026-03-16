# Dev Workflow Manager

> 统一开发工作流管理器 - 整合了Git平台管理、标准化模板、工作流指导和统计分析功能

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-cross--platform-orange.svg)](https://github.com)

## 📖 目录

- [简介](#简介)
- [特性](#特性)
- [快速开始](#快速开始)
- [安装](#安装)
- [使用指南](#使用指南)
- [跨平台支持](#跨平台支持)
- [配置说明](#配置说明)
- [API参考](#api参考)
- [常见问题](#常见问题)
- [贡献指南](#贡献指南)
- [许可证](#许可证)

## 简介

Dev Workflow Manager是一个专为软件开发团队设计的统一工作流管理工具。它整合了三个独立的skill（Gitea、Gitea Workflow Helper、Work Logger）的所有功能，提供完整的开发工作流支持。

### 为什么选择Dev Workflow Manager？

- 🎯 **统一管理** - 一个工具管理所有工作流
- 🌍 **跨平台** - 支持多种IDE和Git平台
- 📋 **标准化** - 统一的模板和流程规范
- 🤖 **智能化** - 自动化工作量统计和日报生成
- 🔧 **可扩展** - 模块化设计，易于扩展

## 特性

### 🌍 跨平台支持

支持多种IDE和开发环境：
- ✅ CodeArts Doer
- ✅ Trae
- ✅ OpenClaw
- ✅ Cursor
- ✅ Kiro
- ✅ VSCode
- ✅ 通用环境

支持多种Git平台：
- ✅ GitHub
- ✅ GitLab
- ✅ Gitea
- ✅ Gitee
- ✅ Bitbucket
- ✅ Azure DevOps

### 📋 标准化模板系统

#### Issue模板
- **Bug报告** - 完整的Bug描述和复现步骤
- **Feature需求** - 详细的需求说明和验收标准
- **Task任务** - 清晰的任务分解和完成标准
- **工单描述** - 面向非技术人员的工单模板

#### PR模板
- **Feature PR** - 功能开发的PR描述
- **Fix PR** - Bug修复的PR描述
- **Refactor PR** - 代码重构的PR描述
- **Docs PR** - 文档更新的PR描述

#### 分支模板
- **feat** - 功能开发分支
- **fix** - Bug修复分支
- **hotfix** - 紧急修复分支
- **release** - 发布分支
- **docs** - 文档分支
- **refactor** - 重构分支

### 🤖 智能功能

#### Git平台管理
- 自动检测Git平台类型
- 支持Gitea CLI操作
- 跨平台兼容性处理

#### 工作流管理
- Commit Message自动生成
- 自动Git提交
- 发版Checklist指导
- 安全规则和确认机制

#### 统计分析
- Git提交分析
- 代码变更统计
- 智能工时估算
- 自动化日报生成
- 工作效率分析

## 快速开始

### 环境要求

- Node.js >= 18.0.0
- Git >= 2.0.0
- npm 或 pnpm

### 快速安装

```bash
# 克隆或下载项目
git clone <repository-url>

# 进入项目目录
cd your-project

# 运行安装脚本
node skills/dev-workflow-manager/install.js
```

### 基本使用

```bash
# 检测当前环境
node skills/dev-workflow-manager/environment-detector.js detect

# 查看所有模板
node skills/dev-workflow-manager/workflow-manager.js template:list

# 创建Issue
node skills/dev-workflow-manager/workflow-manager.js issue:create bug

# 创建PR
node skills/dev-workflow-manager/workflow-manager.js pr:create feature

# 生成日报
node skills/dev-workflow-manager/workflow-manager.js report
```

## 安装

### 方式一：自动安装（推荐）

```bash
# 运行安装脚本，自动检测环境并安装
node skills/dev-workflow-manager/install.js
```

安装脚本会自动：
1. 检测当前IDE环境
2. 创建必要的目录
3. 安装skill文件
4. 更新配置文件

### 方式二：手动安装

#### 1. 复制文件

```bash
# 复制skill目录到你的项目
cp -r skills/dev-workflow-manager /path/to/your/project/skills/
```

#### 2. 更新配置文件

编辑你的IDE配置文件（如`.codeartsdoer/config.json`）：

```json
{
  "skills": [
    {
      "name": "dev-workflow-manager",
      "path": "./skills/dev-workflow-manager/SKILL.md",
      "description": "统一开发工作流管理器"
    }
  ]
}
```

#### 3. 添加npm脚本（可选）

编辑`package.json`：

```json
{
  "scripts": {
    "workflow:detect": "node skills/dev-workflow-manager/environment-detector.js detect",
    "workflow:template": "node skills/dev-workflow-manager/workflow-manager.js template:list",
    "workflow:issue": "node skills/dev-workflow-manager/workflow-manager.js issue:create",
    "workflow:pr": "node skills/dev-workflow-manager/workflow-manager.js pr:create",
    "workflow:report": "node skills/dev-workflow-manager/workflow-manager.js report"
  }
}
```

### 验证安装

```bash
# 检测环境
node skills/dev-workflow-manager/environment-detector.js detect

# 检查环境是否就绪
node skills/dev-workflow-manager/environment-detector.js check
```

## 使用指南

### 环境检测

```bash
# 检测当前环境
node skills/dev-workflow-manager/environment-detector.js detect

# 输出示例：
# 🔍 环境检测结果:
# ──────────────────────────────────────────────────
# 系统类型:     CodeArts Doer
# 配置目录:     .codeartsdoer
# 配置文件:     config.json
# Skills目录:   skills
# 检测方式:     auto-detect
# ──────────────────────────────────────────────────
```

### 创建Issue

```bash
# 创建Bug报告
node skills/dev-workflow-manager/workflow-manager.js issue:create bug

# 创建Feature需求
node skills/dev-workflow-manager/workflow-manager.js issue:create feature

# 创建Task任务
node skills/dev-workflow-manager/workflow-manager.js issue:create task
```

### 创建PR

```bash
# 创建Feature PR
node skills/dev-workflow-manager/workflow-manager.js pr:create feature

# 创建Fix PR
node skills/dev-workflow-manager/workflow-manager.js pr:create fix

# 创建Refactor PR
node skills/dev-workflow-manager/workflow-manager.js pr:create refactor
```

### 创建分支

```bash
# 创建功能分支
node skills/dev-workflow-manager/workflow-manager.js branch:create feat user-login

# 创建修复分支
node skills/dev-workflow-manager/workflow-manager.js branch:create fix login-error

# 创建紧急修复分支
node skills/dev-workflow-manager/workflow-manager.js branch:create hotfix payment-timeout
```

### 生成日报

```bash
# 生成Markdown格式日报
node skills/dev-workflow-manager/workflow-manager.js report

# 生成JSON格式日报
node skills/dev-workflow-manager/workflow-manager.js report --format json

# 查看工作统计
node skills/dev-workflow-manager/workflow-manager.js stats
```

### Commit Message生成

```bash
# 生成Commit Message
node skills/dev-workflow-manager/workflow-manager.js commit:generate

# 自动执行Git提交
node skills/dev-workflow-manager/workflow-manager.js commit:execute
```

## 跨平台支持

### 支持的IDE

Dev Workflow Manager通过环境检测器自动适应不同的IDE：

| IDE | 配置目录 | 检测方式 |
|-----|---------|---------|
| CodeArts Doer | `.codeartsdoer` | 自动检测 |
| Trae | `.trae` | 自动检测 |
| OpenClaw | `.openclaw` | 自动检测 |
| Cursor | `.cursor` | 自动检测 |
| Kiro | `.kiro` | 自动检测 |
| VSCode | `.vscode` | 自动检测 |

### 环境变量配置

可以通过环境变量指定使用哪个环境：

```bash
# 指定使用Trae
SKILL_ENV=trae node skills/dev-workflow-manager/environment-detector.js detect

# 指定使用OpenClaw
SKILL_ENV=openclaw node skills/dev-workflow-manager/environment-detector.js detect
```

### 在不同IDE中使用

#### CodeArts Doer
```bash
# 自动检测到.codeartsdoer目录
node skills/dev-workflow-manager/environment-detector.js detect
```

#### Trae
```bash
# 方式1: 自动检测（如果有.trae目录）
node skills/dev-workflow-manager/environment-detector.js detect

# 方式2: 环境变量指定
SKILL_ENV=trae node skills/dev-workflow-manager/environment-detector.js detect
```

#### OpenClaw
```bash
# 方式1: 自动检测（如果有.openclaw目录）
node skills/dev-workflow-manager/environment-detector.js detect

# 方式2: 环境变量指定
SKILL_ENV=openclaw node skills/dev-workflow-manager/environment-detector.js detect
```

## 配置说明

### 配置文件结构

```json
{
  "version": "1.0.0",
  "skills": [
    {
      "name": "dev-workflow-manager",
      "path": "./skills/dev-workflow-manager/SKILL.md",
      "description": "统一开发工作流管理器"
    }
  ],
  "dev-workflow-manager": {
    "platforms": {
      "gitea": {
        "apiUrl": "http://192.168.1.30:3000/api/v1",
        "webUrl": "http://192.168.1.30:3000"
      }
    },
    "templates": {
      "enabled": true,
      "customPath": "./custom-templates"
    },
    "workflow": {
      "autoCommit": false,
      "requireConfirmation": true
    },
    "statistics": {
      "enabled": true,
      "linesPerHour": 50
    }
  }
}
```

### 配置项说明

#### platforms
配置不同的Git平台信息：
- `apiUrl`: Git平台API地址
- `webUrl`: Git平台Web地址

#### templates
模板相关配置：
- `enabled`: 是否启用模板系统
- `customPath`: 自定义模板路径

#### workflow
工作流相关配置：
- `autoCommit`: 是否自动执行Git提交
- `requireConfirmation`: 是否需要用户确认

#### statistics
统计相关配置：
- `enabled`: 是否启用统计功能
- `linesPerHour`: 每小时代码行数（用于工时估算）

## API参考

### 环境检测器 API

```javascript
import EnvironmentDetector from './environment-detector.js';

const detector = new EnvironmentDetector();

// 检测环境
const env = detector.detect();

// 获取路径
const skillsPath = detector.getSkillsPath();
const skillPath = detector.getSkillPath('dev-workflow-manager');

// 检查环境
const status = detector.isReady();

// 获取配置
const config = detector.getConfig();

// 初始化环境
detector.init();
```

### 命令行 API

```bash
# 环境检测
node environment-detector.js detect    # 检测环境
node environment-detector.js check     # 检查环境是否就绪
node environment-detector.js init      # 初始化环境
node environment-detector.js config    # 显示配置

# 工作流管理
node workflow-manager.js template:list           # 列出模板
node workflow-manager.js issue:create <type>     # 创建Issue
node workflow-manager.js pr:create <type>        # 创建PR
node workflow-manager.js branch:create <type>    # 创建分支
node workflow-manager.js commit:generate         # 生成Commit Message
node workflow-manager.js commit:execute          # 执行Git提交
node workflow-manager.js report                  # 生成日报
node workflow-manager.js stats                   # 工作统计
```

## 常见问题

### Q: 如何在不同IDE中使用？

**A:** Dev Workflow Manager会自动检测当前IDE环境，无需手动配置。只需运行安装脚本即可。

### Q: 如何自定义模板？

**A:** 在配置文件中设置`templates.customPath`，然后在该目录下创建自定义模板文件。

### Q: 如何禁用自动提交？

**A:** 在配置文件中设置`workflow.autoCommit: false`。

### Q: 如何调整工时估算？

**A:** 在配置文件中修改`statistics.linesPerHour`的值。

### Q: 支持哪些Git平台？

**A:** 支持GitHub、GitLab、Gitea、Gitee、Bitbucket、Azure DevOps等主流Git平台。

### Q: 如何在CI/CD中使用？

**A:** 可以通过环境变量指定环境，然后在CI/CD脚本中调用相关命令。

## 贡献指南

欢迎贡献代码、报告问题或提出建议！

### 贡献步骤

1. Fork本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建Pull Request

### 代码规范

- 使用ES Module语法
- 遵循JavaScript Standard Style
- 添加必要的注释
- 编写单元测试

## 许可证

本项目采用MIT许可证 - 详见 [LICENSE](LICENSE) 文件

## 致谢

Dev Workflow Manager整合了以下项目的功能：
- Gitea Skill
- Gitea Workflow Helper
- Work Logger

感谢所有贡献者的支持！

## 联系方式

- 项目主页: [GitHub Repository]
- 问题反馈: [GitHub Issues]
- 文档: [Documentation]

---

**版本**: 1.0.0  
**最后更新**: 2026-03-16  
**维护者**: Dev Workflow Manager Team

**Made with ❤️ by Dev Workflow Manager Team**
# Dev Workflow Manager - 整合指南

## 📋 整合概述

Dev Workflow Manager整合了以下三个skill的所有功能：

1. **Gitea Skill** - Gitea平台CLI操作
2. **Gitea Workflow Helper** - 工作流模板和指导
3. **Work Logger** - 工作量统计和日报生成

## 🔄 功能映射表

### 从Gitea Skill迁移

| 原功能 | 新命令 | 说明 |
|--------|--------|------|
| `tea login add` | `npm run workflow:gitea:login` | Gitea登录 |
| `tea repos list` | `npm run workflow:gitea:repos` | 列出仓库 |
| `tea pr create` | `npm run workflow:gitea:pr:create` | 创建PR |
| `tea issue create` | `npm run workflow:gitea:issue:create` | 创建Issue |
| `tea release create` | `npm run workflow:gitea:release` | 创建Release |
| 安全规则 | 保留 | 操作确认机制 |
| 中文编码 | 保留 | UTF-8处理 |

### 从Gitea Workflow Helper迁移

| 原功能 | 新命令 | 说明 |
|--------|--------|------|
| Bug模板 | `npm run workflow:issue:create bug` | Bug报告模板 |
| Feature模板 | `npm run workflow:issue:create feature` | Feature需求模板 |
| Task模板 | `npm run workflow:issue:create task` | Task任务模板 |
| 工单模板 | `npm run workflow:issue:create ticket` | 工单描述模板 |
| PR模板 | `npm run workflow:pr:create` | PR描述模板 |
| Commit生成 | `npm run workflow:commit:generate` | 生成Commit Message |
| 自动提交 | `npm run workflow:commit:execute` | 执行Git提交 |
| 发版Checklist | `npm run workflow:release:checklist` | 发版流程清单 |

### 从Work Logger迁移

| 原功能 | 新命令 | 说明 |
|--------|--------|------|
| 平台检测 | `npm run workflow:platform:detect` | Git平台检测 |
| 模板列表 | `npm run workflow:template:list` | 列出所有模板 |
| 创建分支 | `npm run workflow:branch:create` | 创建分支 |
| 创建工单 | `npm run workflow:issue:create` | 创建工单 |
| 创建PR | `npm run workflow:pr:create` | 创建PR |
| 工作统计 | `npm run workflow:stats` | 工作统计 |
| 生成日报 | `npm run workflow:report` | 生成日报 |

## 🚀 迁移步骤

### 第一步：备份现有配置

```bash
# 备份现有skill配置
cp -r .codeartsdoer/skills/gitea .codeartsdoer/skills/gitea.backup
cp -r .codeartsdoer/skills/gitea-workflow-helper .codeartsdoer/skills/gitea-workflow-helper.backup
cp -r .codeartsdoer/skills/work-logger .codeartsdoer/skills/work-logger.backup

# 备份配置文件
cp .codeartsdoer/config.json .codeartsdoer/config.json.backup
```

### 第二步：更新配置文件

编辑`.codeartsdoer/config.json`，将三个skill替换为一个：

```json
{
  "skills": [
    {
      "name": "dev-workflow-manager",
      "path": "./skills/dev-workflow-manager/SKILL.md",
      "description": "统一开发工作流管理器，整合了Git平台管理、标准化模板、工作流指导和统计分析功能"
    }
  ]
}
```

### 第三步：更新package.json脚本

添加新的npm脚本命令：

```json
{
  "scripts": {
    "workflow:platform:detect": "node .codeartsdoer/skills/dev-workflow-manager/workflow-manager.js platform:detect",
    "workflow:template:list": "node .codeartsdoer/skills/dev-workflow-manager/workflow-manager.js template:list",
    "workflow:issue:create": "node .codeartsdoer/skills/dev-workflow-manager/workflow-manager.js issue:create",
    "workflow:pr:create": "node .codeartsdoer/skills/dev-workflow-manager/workflow-manager.js pr:create",
    "workflow:branch:create": "node .codeartsdoer/skills/dev-workflow-manager/workflow-manager.js branch:create",
    "workflow:commit:generate": "node .codeartsdoer/skills/dev-workflow-manager/workflow-manager.js commit:generate",
    "workflow:commit:execute": "node .codeartsdoer/skills/dev-workflow-manager/workflow-manager.js commit:execute",
    "workflow:release:checklist": "node .codeartsdoer/skills/dev-workflow-manager/workflow-manager.js release:checklist",
    "workflow:stats": "node .codeartsdoer/skills/dev-workflow-manager/workflow-manager.js stats",
    "workflow:report": "node .codeartsdoer/skills/dev-workflow-manager/workflow-manager.js report",
    "workflow:analysis": "node .codeartsdoer/skills/dev-workflow-manager/workflow-manager.js analysis"
  }
}
```

### 第四步：迁移自定义配置

如果您有自定义的模板或配置，需要迁移到新的skill：

```bash
# 迁移自定义模板
cp -r .codeartsdoer/skills/work-logger/templates/custom/* .codeartsdoer/skills/dev-workflow-manager/templates/custom/

# 迁移自定义配置
# 编辑 dev-workflow-manager/skill.json，合并原有配置
```

### 第五步：测试验证

```bash
# 测试平台检测
npm run workflow:platform:detect

# 测试模板列表
npm run workflow:template:list

# 测试日报生成
npm run workflow:report
```

## 📝 命令对照表

### 常用命令对照

| 旧命令 | 新命令 | 功能 |
|--------|--------|------|
| `npm run work:platform` | `npm run workflow:platform:detect` | 检测Git平台 |
| `npm run work:templates` | `npm run workflow:template:list` | 列出模板 |
| `npm run work:branch feat xxx` | `npm run workflow:branch:create feat xxx` | 创建分支 |
| `npm run work:issue bug` | `npm run workflow:issue:create bug` | 创建Issue |
| `npm run work:pr feature` | `npm run workflow:pr:create feature` | 创建PR |
| `npm run work:report` | `npm run workflow:report` | 生成日报 |
| `npm run work:stats` | `npm run workflow:stats` | 工作统计 |

## 🔧 配置迁移

### Git平台配置

**旧配置**（work-logger/skill.json）：
```json
{
  "git": {
    "platforms": {
      "gitea": {
        "apiUrl": "http://192.168.1.30:3000/api/v1",
        "webUrl": "http://192.168.1.30:3000"
      }
    }
  }
}
```

**新配置**（dev-workflow-manager/skill.json）：
```json
{
  "platforms": {
    "gitea": {
      "apiUrl": "http://192.168.1.30:3000/api/v1",
      "webUrl": "http://192.168.1.30:3000",
      "cli": "tea"
    }
  }
}
```

### 模板配置

**旧配置**（分散在多个skill中）：
- gitea-workflow-helper: Issue/PR模板
- work-logger: 分支/工单模板

**新配置**（统一管理）：
```json
{
  "templates": {
    "issue": {
      "bug": "./templates/issue-bug.md",
      "feature": "./templates/issue-feature.md",
      "task": "./templates/issue-task.md",
      "ticket": "./templates/issue-ticket.md"
    },
    "pr": {
      "feature": "./templates/pr-feature.md",
      "fix": "./templates/pr-fix.md",
      "refactor": "./templates/pr-refactor.md",
      "docs": "./templates/pr-docs.md"
    },
    "branch": {
      "feat": "./templates/branch-feat.json",
      "fix": "./templates/branch-fix.json",
      "hotfix": "./templates/branch-hotfix.json"
    }
  }
}
```

## ⚠️ 注意事项

### 1. 命令变更
- 所有命令前缀从`work:`改为`workflow:`
- 命令更加语义化和结构化
- 保持向后兼容的别名（可选）

### 2. 配置变更
- 配置文件结构更加清晰
- 支持更多自定义选项
- 保持原有配置的兼容性

### 3. 功能增强
- 整合后的功能更强大
- 新增了一些功能（如效率分析）
- 改进了一些功能（如模板系统）

### 4. 文档更新
- 需要更新团队文档
- 需要培训团队成员
- 需要更新CI/CD脚本

## 🎯 迁移检查清单

### 迁移前
- [ ] 备份现有配置和文件
- [ ] 通知团队成员即将迁移
- [ ] 准备迁移文档和培训材料

### 迁移中
- [ ] 更新配置文件
- [ ] 更新package.json脚本
- [ ] 迁移自定义配置和模板
- [ ] 测试所有功能

### 迁移后
- [ ] 验证所有功能正常
- [ ] 更新团队文档
- [ ] 培训团队成员
- [ ] 收集反馈并优化

## 💡 迁移建议

### 1. 渐进式迁移
- 可以先保留旧skill，同时使用新skill
- 逐步迁移团队成员的使用习惯
- 最后移除旧skill

### 2. 团队培训
- 组织培训会议介绍新skill
- 提供迁移对照表
- 解答团队成员的疑问

### 3. 文档更新
- 更新项目README
- 更新开发指南
- 更新CI/CD配置

### 4. 反馈收集
- 收集使用反馈
- 及时解决问题
- 持续优化改进

## 📞 技术支持

### 迁移问题
如遇到迁移问题，请参考：
- 本整合指南
- SKILL.md主文档
- 各功能模块的详细文档

### 功能问题
如遇到功能问题，请：
- 检查配置是否正确
- 查看错误日志
- 联系技术支持

## 🎉 迁移完成

迁移完成后，您将拥有：
- ✅ 统一的工作流管理工具
- ✅ 更强大的功能
- ✅ 更好的用户体验
- ✅ 更易维护的代码

祝您迁移顺利！

---

**迁移指南版本**: v1.0.0
**最后更新**: 2026-03-16
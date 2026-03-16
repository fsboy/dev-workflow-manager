---
name: dev-workflow-manager
description: "统一开发工作流管理器，整合了Git平台管理、标准化模板、工作流指导和统计分析功能。支持多种Git平台（GitHub、GitLab、Gitea、Gitee等），提供Issue/PR/分支模板、Commit Message生成、发版Checklist、工作量统计和日报生成等完整功能。"
---

# Dev Workflow Manager - 统一开发工作流管理器

整合了Gitea、Gitea Workflow Helper和Work Logger三个skill的统一工作流管理工具，提供完整的开发工作流支持。

## 🎯 核心功能

### 1. 平台管理
- **跨平台支持**：GitHub、GitLab、Gitea、Gitee、Bitbucket、Azure DevOps
- **自动检测**：智能识别当前Git平台
- **Gitea CLI**：完整的tea命令行支持
- **跨平台兼容**：Windows、macOS、Linux

### 2. 模板系统
- **Issue模板**：Bug报告、Feature需求、Task任务、工单描述
- **PR模板**：Feature、Fix、Refactor、Docs
- **分支模板**：feat、fix、hotfix、release、docs、refactor
- **Commit Message**：规范化提交信息生成

### 3. 工作流管理
- **自动Git提交**：生成并执行提交命令
- **发版Checklist**：从开发到上线的完整流程
- **安全规则**：操作确认和风险控制
- **中文编码**：Windows环境UTF-8处理

### 4. 统计分析
- **工作量统计**：Git提交分析和代码变更统计
- **智能工时估算**：基于代码量的工时计算
- **日报生成**：自动化工作日报
- **效率分析**：工作效率趋势分析

## 🚀 快速开始

### 环境要求
- Node.js >= 18.0.0
- Git >= 2.0.0
- tea CLI（可选，用于Gitea操作）

### 基本命令

```bash
# 平台管理
npm run workflow:platform:detect     # 检测Git平台
npm run workflow:platform:config     # 配置平台

# 模板管理
npm run workflow:template:list       # 列出所有模板
npm run workflow:issue:create        # 创建Issue
npm run workflow:pr:create           # 创建PR
npm run workflow:branch:create       # 创建分支

# 工作流管理
npm run workflow:commit:generate     # 生成Commit Message
npm run workflow:commit:execute      # 执行Git提交
npm run workflow:release:checklist   # 发版Checklist

# 统计分析
npm run workflow:stats               # 工作统计
npm run workflow:report              # 生成日报
npm run workflow:analysis            # 效率分析
```

## 📋 功能模块详解

### 一、平台管理模块

#### 1. Git平台检测
自动识别当前使用的Git平台，支持：
- GitHub
- GitLab
- Gitea
- Gitee
- Bitbucket
- Azure DevOps

#### 2. Gitea CLI操作
提供完整的tea命令行支持：
- 仓库管理（创建、删除、Fork）
- PR管理（创建、查看、合并）
- Issue管理（创建、查看、关闭）
- Release管理（创建、发布）
- 其他操作（分支、标签、Webhook等）

#### 3. 跨平台兼容性
- Windows中文编码处理
- macOS/Linux路径处理
- 统一的命令接口

### 二、模板系统模块

#### 1. Issue模板

**Bug报告模板**：
```markdown
**标题**
- [模块] 问题简要描述

**问题描述**
- 复现场景说明
- 实际行为
- 期望行为

**复现步骤**
1. 步骤1
2. 步骤2
3. 步骤3

**环境信息**
- 环境：开发/测试/生产
- 客户端：Web/自助机
- 时间：YYYY-MM-DD HH:mm

**错误信息 & 截图**
- 日志关键内容
- 前端报错信息
- 截图/录屏链接

**影响范围评估**
- 影响用户数/门店数
- 是否影响核心业务
- 可否临时规避

**优先级**
- 建议优先级：P0/P1/P2/P3
```

**Feature需求模板**：
```markdown
**标题**
- [模块] 需求简要描述

**背景说明**
- 业务背景
- 相关业务方/干系人

**目标 & 价值**
- 目标：实现后希望达到什么效果
- 价值：对用户/业务的具体收益

**需求详情**
- 功能点1
- 功能点2
- 边界/例外情况

**交互与界面**
- 页面/弹窗
- 主要交互流程
- 原型/设计稿链接

**数据 & 规则**
- 关键字段与含义
- 业务规则/计算规则

**验收标准**
- 验收点1
- 验收点2

**风险与依赖**
- 依赖系统/接口/第三方
- 潜在风险
```

**Task任务模板**：
```markdown
**标题**
- [模块] 任务简要描述

**任务背景**
- 为什么需要本任务

**任务内容**
- 子任务1
- 子任务2
- 非目标（本次不做的内容）

**预期输出**
- 代码改动范围
- 是否需要文档更新
- 是否需要脚本/工具

**验收标准**
- [ ] 条件1
- [ ] 条件2

**时间与资源**
- 预计工作量
- 需要配合的角色
```

**工单描述模板**（面向非技术人员）：
```markdown
**工单标题**
- 清晰说明问题/需求主题

**业务背景**
- 发生在什么业务场景
- 影响哪些门店/设备/用户

**现象描述**
- 当前出现了什么情况
- 发生频率：必现/偶发
- 举例说明真实案例

**影响评估**
- 是否影响交易/营业额
- 影响门店数/设备数/用户数估算
- 是否存在合规/安全风险

**期望处理**
- 希望解决目标是什么
- 有无时间要求

**已做排查**
- 已尝试的处理方式
- 相关截图/日志说明
- 其他补充信息
```

#### 2. PR模板

**Feature PR模板**：
```markdown
**PR标题**
- 简要概括本次改动

**变更内容概述**
- 功能调整
- Bug修复
- 其他变更

**变更类型**
- [ ] 新功能（feature）
- [ ] 修复缺陷（bug fix）
- [ ] 性能优化
- [ ] 重构/代码结构调整
- [ ] 文档变更
- [ ] 构建/部署/配置相关

**影响范围**
- 影响模块/页面
- 可能波及的相关功能

**测试情况**
- 测试类型：自测/联调/测试环境验证
- 测试内容与结果

**回滚方案**
- 若线上出现严重问题，准备如何回滚

**关联内容**
- 关联issue/需求单/工单
- 关联文档
```

#### 3. 分支模板

**feat分支模板**：
- 命名：`feat/{feature-name}`
- 源分支：dev
- 目标分支：dev
- 检查清单：
  - 功能需求已明确
  - 技术方案已设计
  - 开发环境已准备
  - 相关依赖已安装

**fix分支模板**：
- 命名：`fix/{bug-description}`
- 源分支：dev
- 目标分支：dev
- 检查清单：
  - Bug已复现
  - 根本原因已分析
  - 修复方案已确定
  - 回归测试计划已制定

**hotfix分支模板**：
- 命名：`hotfix/{issue-id}`
- 源分支：master
- 目标分支：[master, dev]
- 检查清单：
  - 问题影响范围已评估
  - 修复方案已验证
  - 回滚方案已准备
  - 运维团队已通知

### 三、工作流管理模块

#### 1. Commit Message生成

**规范格式**：
```text
<type>(<optional-scope>): <简要概述>

<可选：详细说明>

<可选：关联信息>
```

**常用type**：
- `feat`：新功能
- `fix`：缺陷修复
- `refactor`：重构
- `perf`：性能优化
- `chore`：杂项
- `docs`：文档
- `test`：测试

#### 2. 自动Git提交流程

1. 分析改动内容
2. 生成候选commit message
3. 等待用户确认
4. 展示将执行的命令
5. 用户确认后执行
6. 反馈执行结果

#### 3. 发版Checklist

完整的从开发到上线的流程清单：
- 开发阶段
- 提交与推送
- Pull Request阶段
- 发布准备
- 创建Release/Tag
- 上线与验证
- 收尾工作

### 四、统计分析模块

#### 1. 工作量统计
- Git提交分析
- 代码变更统计
- 智能工时估算
- 任务类型分布

#### 2. 日报生成
- 自动分析今日工作
- 生成标准化日报
- 支持多种格式（Markdown、JSON）
- 包含工作效率分析

#### 3. 效率分析
- 工作效率趋势
- 代码质量评估
- 团队协作分析
- 项目进度追踪

## 🔧 配置说明

### Skill配置文件

编辑`.codeartsdoer/skills/dev-workflow-manager/skill.json`：

```json
{
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
```

### 自定义模板

可以在`custom-templates/`目录下添加自定义模板。

## 🛡️ 安全规则

### 操作确认机制
- 所有有副作用的命令都需要用户确认
- 高危命令禁止直接执行
- Git提交需要明确授权

### 中文编码处理
- Windows环境自动处理UTF-8编码
- PowerShell和CMD的编码设置
- 避免中文乱码问题

## 📚 使用场景

### 场景1：开始新功能开发
```bash
# 1. 检测Git平台
npm run workflow:platform:detect

# 2. 创建功能分支
npm run workflow:branch:create feat user-login

# 3. 创建Feature Issue
npm run workflow:issue:create feature

# 4. 开发功能...

# 5. 生成Commit Message
npm run workflow:commit:generate

# 6. 执行Git提交
npm run workflow:commit:execute

# 7. 创建PR
npm run workflow:pr:create feature

# 8. 生成日报
npm run workflow:report
```

### 场景2：修复Bug
```bash
# 1. 创建Bug Issue
npm run workflow:issue:create bug

# 2. 创建修复分支
npm run workflow:branch:create fix login-error

# 3. 修复Bug...

# 4. 提交修复
npm run workflow:commit:generate
npm run workflow:commit:execute

# 5. 创建Fix PR
npm run workflow:pr:create fix

# 6. 生成日报
npm run workflow:report
```

### 场景3：发版上线
```bash
# 1. 查看发版Checklist
npm run workflow:release:checklist

# 2. 按照Checklist执行各项任务

# 3. 生成发布说明
npm run workflow:report

# 4. 创建Release
# 使用Gitea CLI或Web界面
```

## 🔄 从旧Skill迁移

### 从Gitea Skill迁移
- 所有tea命令功能已整合
- 安全规则和确认机制保留
- 中文编码处理保留

### 从Gitea Workflow Helper迁移
- 所有模板已整合并增强
- Commit Message生成功能保留
- 发版Checklist保留

### 从Work Logger迁移
- 所有功能已整合
- 跨平台支持保留
- 工作量统计和日报生成保留

## 📖 相关文档

- **INTEGRATION-GUIDE.md** - 整合指南和迁移说明
- **TEMPLATE-REFERENCE.md** - 完整的模板参考
- **PLATFORM-GUIDE.md** - 各平台使用指南
- **API-REFERENCE.md** - 命令行API参考

## 💡 最佳实践

1. **统一使用**：团队统一使用本skill进行工作流管理
2. **规范提交**：使用规范的Commit Message格式
3. **定期统计**：每天生成工作日报
4. **遵循流程**：按照发版Checklist执行
5. **安全操作**：重要操作前仔细确认

## 🎉 总结

Dev Workflow Manager整合了三个skill的所有功能，提供：
- ✅ 统一的工作流管理
- ✅ 完整的模板系统
- ✅ 跨平台支持
- ✅ 智能统计分析
- ✅ 安全可靠的操作

一个skill解决所有开发工作流问题！

---

**版本**: v1.0.0
**整合日期**: 2026-03-16
**整合来源**: Gitea + Gitea Workflow Helper + Work Logger
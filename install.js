#!/usr/bin/env node

/**
 * 跨平台安装脚本
 * 自动检测环境并安装Dev Workflow Manager
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import EnvironmentDetector from './environment-detector.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Installer {
  constructor() {
    this.detector = new EnvironmentDetector();
    this.env = this.detector.detect();
  }

  /**
   * 执行安装
   */
  install() {
    console.log('🚀 Dev Workflow Manager - 跨平台安装\n');
    console.log(`检测到环境: ${this.env.name}`);
    console.log(`配置目录: ${this.env.configDir}\n`);

    // 1. 检查环境
    const status = this.detector.isReady();
    if (!status.ready) {
      console.log('⚠️  环境未就绪，正在初始化...\n');
      this.detector.init();
    }

    // 2. 安装skill文件
    this.installSkillFiles();

    // 3. 更新配置文件
    this.updateConfig();

    // 4. 显示安装结果
    this.showResult();
  }

  /**
   * 安装skill文件
   */
  installSkillFiles() {
    console.log('📦 安装skill文件...\n');

    const skillName = 'dev-workflow-manager';
    const skillPath = this.detector.getSkillPath(skillName);

    // 创建skill目录
    if (!fs.existsSync(skillPath)) {
      fs.mkdirSync(skillPath, { recursive: true });
      console.log(`✅ 创建目录: ${skillPath}`);
    }

    // 需要复制的文件
    const files = [
      'SKILL.md',
      'INTEGRATION-GUIDE.md',
      'environment-detector.js'
    ];

    // 复制文件
    files.forEach(file => {
      const srcPath = path.join(__dirname, file);
      const destPath = path.join(skillPath, file);

      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ 复制文件: ${file}`);
      }
    });

    console.log('');
  }

  /**
   * 更新配置文件
   */
  updateConfig() {
    console.log('⚙️  更新配置文件...\n');

    const configPath = this.env.configPath;
    let config = {};

    // 读取现有配置
    if (fs.existsSync(configPath)) {
      try {
        const content = fs.readFileSync(configPath, 'utf-8');
        config = JSON.parse(content);
      } catch (error) {
        console.log('⚠️  无法读取配置文件，将创建新配置');
      }
    }

    // 确保skills数组存在
    if (!config.skills) {
      config.skills = [];
    }

    // 检查是否已安装
    const existingIndex = config.skills.findIndex(s => s.name === 'dev-workflow-manager');
    const skillConfig = {
      name: 'dev-workflow-manager',
      path: `./skills/dev-workflow-manager/SKILL.md`,
      description: '统一开发工作流管理器，整合了Git平台管理、标准化模板、工作流指导和统计分析功能'
    };

    if (existingIndex >= 0) {
      config.skills[existingIndex] = skillConfig;
      console.log('✅ 更新现有skill配置');
    } else {
      config.skills.push(skillConfig);
      console.log('✅ 添加新skill配置');
    }

    // 添加skill特定配置
    if (!config['dev-workflow-manager']) {
      config['dev-workflow-manager'] = {
        platforms: {
          gitea: {
            apiUrl: 'http://192.168.1.30:3000/api/v1',
            webUrl: 'http://192.168.1.30:3000'
          }
        },
        templates: {
          enabled: true
        },
        workflow: {
          autoCommit: false,
          requireConfirmation: true
        },
        statistics: {
          enabled: true,
          linesPerHour: 50
        }
      };
      console.log('✅ 添加skill默认配置');
    }

    // 保存配置
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
    console.log(`✅ 配置文件已更新: ${configPath}\n`);
  }

  /**
   * 显示安装结果
   */
  showResult() {
    console.log('─'.repeat(50));
    console.log('✅ 安装完成！\n');
    console.log('📋 安装信息:');
    console.log(`   环境: ${this.env.name}`);
    console.log(`   配置目录: ${this.env.configDir}`);
    console.log(`   Skill路径: ${this.detector.getSkillPath('dev-workflow-manager')}`);
    console.log('');
    console.log('📚 使用方法:');
    console.log('   1. 查看SKILL.md了解功能');
    console.log('   2. 查看INTEGRATION-GUIDE.md了解迁移');
    console.log('   3. 使用环境检测器检测环境');
    console.log('');
    console.log('🔧 环境检测:');
    console.log('   node skills/dev-workflow-manager/environment-detector.js detect');
    console.log('');
    console.log('─'.repeat(50));
  }
}

// 执行安装
const installer = new Installer();
installer.install();
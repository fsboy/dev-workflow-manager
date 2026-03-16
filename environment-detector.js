#!/usr/bin/env node

/**
 * 环境检测器 - 自动检测不同的IDE和系统环境
 * 支持 CodeArts Doer、Trae、OpenClaw、Cursor、VSCode 等
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class EnvironmentDetector {
  constructor() {
    this.environments = {
      codeartsdoer: {
        name: 'CodeArts Doer',
        configDir: '.codeartsdoer',
        configFile: 'config.json',
        skillsDir: 'skills',
        description: 'CodeArts Doer IDE'
      },
      trae: {
        name: 'Trae',
        configDir: '.trae',
        configFile: 'config.json',
        skillsDir: 'skills',
        description: 'Trae IDE'
      },
      openclaw: {
        name: 'OpenClaw',
        configDir: '.openclaw',
        configFile: 'config.json',
        skillsDir: 'skills',
        description: 'OpenClaw System'
      },
      cursor: {
        name: 'Cursor',
        configDir: '.cursor',
        configFile: 'config.json',
        skillsDir: 'skills',
        description: 'Cursor IDE'
      },
      kiro: {
        name: 'Kiro',
        configDir: '.kiro',
        configFile: 'config.json',
        skillsDir: 'skills',
        description: 'Kiro IDE'
      },
      vscode: {
        name: 'VSCode',
        configDir: '.vscode',
        configFile: 'settings.json',
        skillsDir: 'skills',
        description: 'Visual Studio Code'
      }
    };
  }

  /**
   * 检测当前环境
   */
  detect() {
    // 1. 优先检查环境变量
    if (process.env.SKILL_ENV) {
      const env = this.environments[process.env.SKILL_ENV];
      if (env) {
        return {
          type: process.env.SKILL_ENV,
          ...env,
          configPath: this.getConfigPath(env),
          detected: 'environment-variable'
        };
      }
    }

    // 2. 自动检测配置目录
    for (const [key, env] of Object.entries(this.environments)) {
      const configDirPath = path.join(process.cwd(), env.configDir);
      if (fs.existsSync(configDirPath)) {
        return {
          type: key,
          ...env,
          configPath: this.getConfigPath(env),
          detected: 'auto-detect'
        };
      }
    }

    // 3. 返回默认配置
    return {
      type: 'default',
      name: 'Default',
      configDir: '.',
      configFile: 'skill-config.json',
      skillsDir: 'skills',
      description: 'Default Environment',
      configPath: path.join(process.cwd(), 'skill-config.json'),
      detected: 'default'
    };
  }

  /**
   * 获取配置文件路径
   */
  getConfigPath(env) {
    return path.join(process.cwd(), env.configDir, env.configFile);
  }

  /**
   * 获取Skills目录路径
   */
  getSkillsPath() {
    const env = this.detect();
    return path.join(process.cwd(), env.configDir, env.skillsDir);
  }

  /**
   * 获取特定Skill的路径
   */
  getSkillPath(skillName) {
    const skillsPath = this.getSkillsPath();
    return path.join(skillsPath, skillName);
  }

  /**
   * 获取当前Skill的路径
   */
  getCurrentSkillPath() {
    // 从当前文件位置向上查找skills目录
    let currentDir = __dirname;
    while (currentDir !== path.dirname(currentDir)) {
      if (path.basename(currentDir) === 'skills') {
        return currentDir;
      }
      currentDir = path.dirname(currentDir);
    }
    
    // 如果找不到，使用默认路径
    return this.getSkillPath('dev-workflow-manager');
  }

  /**
   * 获取配置内容
   */
  getConfig() {
    const env = this.detect();
    const configPath = env.configPath;
    
    if (fs.existsSync(configPath)) {
      try {
        const content = fs.readFileSync(configPath, 'utf-8');
        return JSON.parse(content);
      } catch (error) {
        console.error(`读取配置文件失败: ${error.message}`);
        return {};
      }
    }
    
    return {};
  }

  /**
   * 获取Skill配置
   */
  getSkillConfig(skillName) {
    const config = this.getConfig();
    
    // 查找skill配置
    if (config.skills) {
      const skill = config.skills.find(s => s.name === skillName);
      if (skill) {
        return skill;
      }
    }
    
    // 查找特定配置
    if (config[skillName]) {
      return config[skillName];
    }
    
    return {};
  }

  /**
   * 显示环境信息
   */
  showInfo() {
    const env = this.detect();
    
    console.log('\n🔍 环境检测结果:');
    console.log('─'.repeat(50));
    console.log(`系统类型:     ${env.name}`);
    console.log(`配置目录:     ${env.configDir}`);
    console.log(`配置文件:     ${env.configFile}`);
    console.log(`Skills目录:   ${env.skillsDir}`);
    console.log(`检测方式:     ${env.detected}`);
    console.log(`配置路径:     ${env.configPath}`);
    console.log('─'.repeat(50));
    console.log('');
  }

  /**
   * 检查环境是否就绪
   */
  isReady() {
    const env = this.detect();
    const configPath = env.configPath;
    
    // 检查配置文件是否存在
    if (!fs.existsSync(configPath)) {
      return {
        ready: false,
        reason: `配置文件不存在: ${configPath}`
      };
    }
    
    // 检查skills目录是否存在
    const skillsPath = this.getSkillsPath();
    if (!fs.existsSync(skillsPath)) {
      return {
        ready: false,
        reason: `Skills目录不存在: ${skillsPath}`
      };
    }
    
    return {
      ready: true,
      reason: '环境就绪'
    };
  }

  /**
   * 初始化环境
   */
  init() {
    const env = this.detect();
    
    console.log(`🚀 初始化 ${env.name} 环境...\n`);
    
    // 创建配置目录
    const configDir = path.join(process.cwd(), env.configDir);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
      console.log(`✅ 创建配置目录: ${configDir}`);
    }
    
    // 创建skills目录
    const skillsPath = this.getSkillsPath();
    if (!fs.existsSync(skillsPath)) {
      fs.mkdirSync(skillsPath, { recursive: true });
      console.log(`✅ 创建Skills目录: ${skillsPath}`);
    }
    
    // 创建默认配置文件
    const configPath = env.configPath;
    if (!fs.existsSync(configPath)) {
      const defaultConfig = {
        version: '1.0.0',
        skills: [],
        'dev-workflow-manager': {
          platforms: {},
          templates: { enabled: true },
          workflow: { autoCommit: false },
          statistics: { enabled: true }
        }
      };
      
      fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), 'utf-8');
      console.log(`✅ 创建配置文件: ${configPath}`);
    }
    
    console.log('\n✅ 环境初始化完成！\n');
  }
}

// CLI 接口
if (import.meta.url === `file://${process.argv[1]}`) {
  const detector = new EnvironmentDetector();
  const command = process.argv[2] || 'detect';
  
  switch (command) {
    case 'detect':
      detector.showInfo();
      break;
      
    case 'check':
      const status = detector.isReady();
      if (status.ready) {
        console.log('✅ 环境就绪\n');
      } else {
        console.log(`❌ 环境未就绪: ${status.reason}\n`);
      }
      break;
      
    case 'init':
      detector.init();
      break;
      
    case 'config':
      const config = detector.getConfig();
      console.log('📋 当前配置:\n');
      console.log(JSON.stringify(config, null, 2));
      break;
      
    default:
      console.log(`
环境检测器 - 使用说明

命令:
  node environment-detector.js detect  - 检测当前环境
  node environment-detector.js check   - 检查环境是否就绪
  node environment-detector.js init    - 初始化环境
  node environment-detector.js config  - 显示当前配置

环境变量:
  SKILL_ENV=codeartsdoer  - 指定使用CodeArts Doer
  SKILL_ENV=trae          - 指定使用Trae
  SKILL_ENV=openclaw      - 指定使用OpenClaw
  SKILL_ENV=cursor        - 指定使用Cursor

示例:
  SKILL_ENV=trae node environment-detector.js detect
      `);
  }
}

export default EnvironmentDetector;
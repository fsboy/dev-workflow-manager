#!/usr/bin/env node

import EnvironmentDetector from './environment-detector.js';

console.log('🧪 测试环境检测器...\n');

const detector = new EnvironmentDetector();

// 测试1: 检测当前环境
console.log('📋 测试1: 检测当前环境');
detector.showInfo();

// 测试2: 检查环境是否就绪
console.log('📋 测试2: 检查环境是否就绪');
const status = detector.isReady();
console.log(`状态: ${status.ready ? '✅ 就绪' : '❌ 未就绪'}`);
console.log(`原因: ${status.reason}\n`);

// 测试3: 获取配置
console.log('📋 测试3: 获取配置');
const config = detector.getConfig();
console.log('配置文件存在:', Object.keys(config).length > 0 ? '✅ 是' : '❌ 否');
console.log('');

// 测试4: 获取路径
console.log('📋 测试4: 获取路径');
console.log(`Skills路径: ${detector.getSkillsPath()}`);
console.log(`当前Skill路径: ${detector.getCurrentSkillPath()}`);
console.log('');

console.log('✅ 所有测试完成！\n');
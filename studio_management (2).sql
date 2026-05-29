/*
 Navicat Premium Dump SQL

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80045 (8.0.45)
 Source Host           : localhost:3306
 Source Schema         : studio_management

 Target Server Type    : MySQL
 Target Server Version : 80045 (8.0.45)
 File Encoding         : 65001

 Date: 15/04/2026 22:49:43
*/
-- 先安全删除（如果存在）
DROP DATABASE IF EXISTS studio_management;

-- 正确创建：字符集和排序规则要写在CREATE语句内
CREATE DATABASE studio_management
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_unicode_ci;

-- 切换数据库
USE studio_management;

-- ----------------------------
-- Table structure for project
-- ----------------------------
-- 项目表
DROP TABLE IF EXISTS project;
CREATE TABLE project (
  project_id CHAR(20) NOT NULL PRIMARY KEY,
  project_name VARCHAR(255) NOT NULL,
  project_desc VARCHAR(255),
  principal_id CHAR(20) NOT NULL,
  icon VARCHAR(255),
  image VARCHAR(255),
  create_time DATETIME,
  state VARCHAR(10) NOT NULL DEFAULT '已规划'
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO project VALUES 
('2026-2001', '智析 BI 平台', '企业级商业智能系统，实时数据看板与预测分析，服务 50+ 中大型客户。', '20260001', 'fa-chart-line', NULL, '2026-04-10 00:00:00', '已规划'),
('2026-2002', '跨境全渠道电商中台', '多语言、多货币电商引擎，订单管理 + AI 推荐，GMV 提升 130% 。', '20260001', 'fa-store', NULL, '2026-04-10 00:00:00', '已规划'),
('2026-2003', '智音 AI 助手', '语音识别 + 大语言模型，赋能客服与办公场景，毫秒级响应。', '20260001', 'fa-microphone-alt', NULL, '2026-04-10 00:00:00', '已规划'),
('2026-2004', '远程医疗协作平台', '符合 HIPAA 标准，视频问诊 + 电子病历，连接 300+ 医疗机构。', '20260001', 'fa-heartbeat', NULL, '2026-04-10 00:00:00', '已规划'),
('2026-2005', '安盾零信任安全系统', '基于零信任架构的企业级安全防护，动态权限管控，防护 99.9% 网络攻击。', '20260001', 'fa-shield-halved', NULL, '2026-04-10 00:00:00', '已规划'),
('2026-2006', '智联工业物联网平台', '工业设备全生命周期管理，边缘计算+云端协同，助力工厂数字化转型。', '20260001', 'fa-industry', NULL, '2026-04-10 00:00:00', '已规划'),
('2026-2007', '智学AI教育大脑', '个性化学习路径规划，AI自适应题库，服务 200+ 学校，提分率超 40%。', '20260001', 'fa-brain', NULL, '2026-04-10 00:00:00', '已规划'),
('2026-2008', '智融数字金融风控平台', '大数据风控模型，实时反欺诈与信用评估，服务 30+ 金融机构。', '20260001', 'fa-arrow-trend-up', NULL, '2026-04-10 00:00:00', '已规划'),
('2026-2009', '智运智慧物流调度系统', 'AI路径优化+智能调度，降低物流成本 25%，配送时效提升 35%。', '20260001', 'fa-boxes-stacked', NULL, '2026-04-10 00:00:00', '已规划'),
('2026-2010', '智建智慧工地管理系统', 'AI视频监控+人员设备管理，安全事故率下降 80%，施工效率提升 30%。', '20260001', 'fa-building', NULL, '2026-04-10 00:00:00', '已规划');

-- 服务表
DROP TABLE IF EXISTS serve;
CREATE TABLE serve (
  service_id CHAR(20) NOT NULL PRIMARY KEY,
  service_name VARCHAR(255) NOT NULL,
  service_desc VARCHAR(255),
  principal_id CHAR(20) NOT NULL,
  icon VARCHAR(255),
  image VARCHAR(255),
  create_time DATETIME
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO serve VALUES 
('2026-1001', '定制软件开发', '全栈式企业级应用、SaaS 平台与内部效率工具，高可用架构与安全合规。', '20260001', 'fa-laptop-code', NULL, '2026-04-10 00:00:00'),
('2026-1002', '移动应用开发', 'iOS & Android 原生 / 跨平台 (Flutter, RN)，流畅交互与极致性能。', '20260001', 'fa-mobile-alt', NULL, '2026-04-10 00:00:00'),
('2026-1003', 'AI 与智能系统', '机器学习模型集成、智能数据分析、自动化工作流与 ChatGPT 应用落地。', '20260001', 'fa-brain', NULL, '2026-04-10 00:00:00'),
('2026-1004', '云原生 & DevOps', 'AWS/Azure/GCP 架构设计，CI/CD 流水线，容器化与可观测性建设。', '20260001', 'fa-cloud-upload-alt', NULL, '2026-04-10 00:00:00');

-- 用户表
DROP TABLE IF EXISTS user;
CREATE TABLE user (
  id CHAR(10) NOT NULL,
  user_name VARCHAR(20) NOT NULL,
  passWord CHAR(15) NOT NULL,
  email VARCHAR(30) NOT NULL,
  power VARCHAR(30) NOT NULL DEFAULT 'user',
  name VARCHAR(20),
  join_date DATETIME,
  birth_date DATETIME,
  region VARCHAR(40),
  job VARCHAR(20),
  PRIMARY KEY (id, user_name)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO user VALUES 
('20260001', 'Demo', 'Demo123', '123@qq.com', 'admin', 'Demo', '2026-04-01 00:00:00', '2000-02-02 00:00:00', '浙江杭州', '后端工程师'),
('20260002', 'Demo2', 'Demo234', '234@123.com', 'user', NULL, '2026-04-12 18:57:56', NULL, NULL, NULL),
('20260003', 'Demo3', 'Demo234', '345@123.com', 'user', NULL, '2026-04-12 22:47:12', NULL, NULL, NULL);

-- ===================== 新增：留言表 =====================
DROP TABLE IF EXISTS message;
CREATE TABLE message (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(30) NOT NULL,
  content VARCHAR(255)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

-- 测试数据（可直接用）
INSERT INTO message VALUES
(NULL, '张三', 'zhangsan@test.com', '希望增加项目进度查看功能'),
(NULL, '李四', 'lisi@test.com', '界面很简洁，使用体验很好');
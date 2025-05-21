import labels from '@/app/data/labels.json';
import agents from '@/app/data/agents.json';
import { Language } from '@/app/types/questions';

export type LabelPath = string;

/**
 * 指定されたパスから多言語ラベルを取得する
 * @param path ドット区切りのパス (例: 'results.title')
 * @param language 言語コード ('ja', 'en', 'ko')
 * @returns 対応する言語のラベル
 */
export function getLabel(path: LabelPath, language: Language): string {
  const keys = path.split('.');
  let current: any = labels;
  
  for (const key of keys) {
    if (current[key] === undefined) {
      console.warn(`Label not found for path: ${path}`);
      return path;
    }
    current = current[key];
  }
  
  if (typeof current === 'string') {
    return current;
  }
  
  if (current[language]) {
    return current[language];
  }
  
  console.warn(`Translation not found for language: ${language}, path: ${path}`);
  return path;
}

/**
 * エージェント情報を取得する
 * @param agentId エージェントID
 * @returns エージェント情報
 */
export function getAgent(agentId: string) {
  return agents.agents.find(agent => agent.id === agentId);
}

/**
 * 全エージェント情報を取得する
 * @returns 全エージェント情報
 */
export function getAllAgents() {
  return agents.agents;
}

/**
 * エージェント名を取得する
 * @param agentId エージェントID
 * @param language 言語コード
 * @returns エージェント名
 */
export function getAgentName(agentId: string, language: Language): string {
  const agent = getAgent(agentId);
  if (!agent) {
    console.warn(`Agent not found: ${agentId}`);
    return agentId;
  }
  return agent.name[language];
}

/**
 * エージェントの役割名を取得する
 * @param role 役割コード
 * @param language 言語コード
 * @returns 役割名
 */
export function getRoleName(role: string, language: Language): string {
  const rolePath = `results.role.${role}`;
  return getLabel(rolePath, language);
}

interface Metrics {
  aggressiveness: number;
  strategy: number;
  support: number;
}

function calculateDistance(metrics1: Metrics, metrics2: Metrics): number {
  const dx = metrics1.aggressiveness - metrics2.aggressiveness;
  const dy = metrics1.strategy - metrics2.strategy;
  const dz = metrics1.support - metrics2.support;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function findClosestAgent(userMetrics: Metrics): string {
  let closestAgent = agents.agents[0];
  let minDistance = calculateDistance(userMetrics, agents.agents[0].metrics);

  for (const agent of agents.agents) {
    const distance = calculateDistance(userMetrics, agent.metrics);
    if (distance < minDistance) {
      minDistance = distance;
      closestAgent = agent;
    }
  }

  return closestAgent.id;
} 
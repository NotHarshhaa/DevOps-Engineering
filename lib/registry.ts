import { ResourceMonitor } from '@/components/resource-monitor';
import { PipelineVisualizer } from '@/components/pipeline-visualizer';
import { InfrastructureGraph } from '@/components/infrastructure-graph';
import type { PipelineVisualizerProps } from '@/components/pipeline-visualizer';
import type { InfrastructureGraphProps } from '@/components/infrastructure-graph';
import type { ResourceMonitorProps } from '@/components/resource-monitor';

export interface RegistryItem<T = Record<string, unknown>> {
  name: string;
  component: React.ComponentType<T>;
  icon?: string;
  description?: string;
}

const registry = {
  'resource-monitor': {
    name: 'Resource Monitor',
    component: ResourceMonitor,
    icon: 'LineChart',
    description: 'Real-time monitoring of cloud resources and infrastructure'
  } satisfies RegistryItem<ResourceMonitorProps>,
  'pipeline-visualizer': {
    name: 'Pipeline Visualizer',
    component: PipelineVisualizer,
    icon: 'GitBranch',
    description: 'Interactive visualization of CI/CD pipelines'
  } satisfies RegistryItem<PipelineVisualizerProps>,
  'infrastructure-graph': {
    name: 'Infrastructure Graph',
    component: InfrastructureGraph,
    icon: 'Graph',
    description: 'Dynamic visualization of cloud infrastructure and dependencies'
  } satisfies RegistryItem<InfrastructureGraphProps>
} as const;

export function getComponentByName<K extends keyof typeof registry>(
  name: K
): typeof registry[K] | undefined {
  return registry[name];
}

export function getAllComponents(): (typeof registry)[keyof typeof registry][] {
  return Object.values(registry);
}

export default registry; 
'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { ResourceMonitor } from '../resource-monitor';
import { PipelineVisualizer } from '../pipeline-visualizer';
import { InfrastructureGraph } from '../infrastructure-graph';
import type { ResourceMonitorProps } from '../resource-monitor';
import type { PipelineVisualizerProps } from '../pipeline-visualizer';
import type { InfrastructureGraphProps } from '../infrastructure-graph';

const components = {
  'resource-monitor': ResourceMonitor,
  'pipeline-visualizer': PipelineVisualizer,
  'infrastructure-graph': InfrastructureGraph,
} as const;

type ComponentProps = {
  'resource-monitor': ResourceMonitorProps;
  'pipeline-visualizer': PipelineVisualizerProps;
  'infrastructure-graph': InfrastructureGraphProps;
};

interface PreviewProps {
  component: keyof typeof components;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any;
}

export function Preview({ component, props }: PreviewProps) {
  const Component = components[component];
  return (
    <Card className="p-4">
      <Component {...props} />
    </Card>
  );
}

export default Preview;

// Example usage in MDX:
/*
import { Preview } from '@/components/preview'

<Preview 
  component="resource-monitor" 
  props={{
    resources: [
      {
        type: "kubernetes",
        cluster: "production",
        metrics: ["cpu", "memory"]
      }
    ]
  }} 
/>
*/ 
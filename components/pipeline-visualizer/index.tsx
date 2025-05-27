'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Stage {
  name: string;
  status: 'pending' | 'running' | 'success' | 'failed' | 'cancelled';
  duration?: string;
  steps?: string[];
  environment?: string;
  dependencies?: string[];
}

export interface Pipeline {
  id: string;
  platform: 'github-actions' | 'gitlab-ci' | 'jenkins' | 'azure-devops';
  repository: string;
  branch: string;
  stages: Stage[];
}

export interface PipelineVisualizerProps {
  pipeline: Pipeline;
  refreshInterval?: number;
  onStageClick?: (stage: Stage) => void;
  theme?: 'light' | 'dark';
}

export function PipelineVisualizer({
  pipeline,
  refreshInterval = 10000,
  onStageClick,
  theme = 'light'
}: PipelineVisualizerProps) {
  const getStatusColor = (status: Stage['status']) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'running': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      case 'cancelled': return 'bg-gray-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{pipeline.repository}</h3>
          <p className="text-sm text-muted-foreground">Branch: {pipeline.branch}</p>
        </div>
        <Badge variant="outline">{pipeline.platform}</Badge>
      </div>

      <div className="relative">
        {pipeline.stages.map((stage, index) => (
          <div
            key={stage.name}
            className="flex items-center mb-4 cursor-pointer"
            onClick={() => onStageClick?.(stage)}
          >
            <div className={`w-3 h-3 rounded-full ${getStatusColor(stage.status)}`} />
            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">{stage.name}</span>
                {stage.duration && (
                  <span className="text-sm text-muted-foreground">{stage.duration}</span>
                )}
              </div>
              {stage.steps && (
                <div className="mt-1 text-sm text-muted-foreground">
                  {stage.steps.join(' → ')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
} 
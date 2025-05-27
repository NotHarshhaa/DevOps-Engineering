'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

export interface Resource {
  type: string;
  region?: string;
  cluster?: string;
  instanceIds?: string[];
  metrics: string[];
  metadata?: Record<string, unknown>;
}

export interface AlertThresholds {
  [metric: string]: number;
}

export interface ResourceMonitorProps {
  resources: Resource[];
  refreshInterval?: number;
  alertThresholds?: AlertThresholds;
  onAlert?: (resource: Resource, metric: string, value: number) => void;
}

export function ResourceMonitor({
  resources = [],
  refreshInterval = 5000,
  alertThresholds = {},
  onAlert
}: ResourceMonitorProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Resource Monitor</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{resource.type}</span>
              <span className="text-xs text-muted-foreground">{resource.region}</span>
            </div>
            <div className="space-y-2">
              {resource.metrics?.map((metric: string, idx: number) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm">{metric}</span>
                  <span className="text-sm font-mono">--</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
} 
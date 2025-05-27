'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

export interface Node {
  id: string;
  type: string;
  name: string;
  parent?: string;
  metadata?: Record<string, unknown>;
  status?: 'active' | 'warning' | 'error';
}

export interface Edge {
  from: string;
  to: string;
  type: 'network' | 'dependency' | 'data-flow';
  direction: 'inbound' | 'outbound' | 'bidirectional';
  metadata?: Record<string, unknown>;
}

export interface Infrastructure {
  nodes: Node[];
  edges: Edge[];
}

export interface InfrastructureGraphProps {
  resources: Infrastructure;
  overlays?: string[];
  layout?: 'force-directed' | 'hierarchical' | 'circular' | 'grid';
  onNodeClick?: (node: Node) => void;
  onEdgeClick?: (edge: Edge) => void;
}

export function InfrastructureGraph({
  resources,
  overlays = [],
  layout = 'force-directed',
  onNodeClick,
  onEdgeClick
}: InfrastructureGraphProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Infrastructure Map</h3>
        <div className="flex gap-2">
          {overlays.map((overlay) => (
            <span key={overlay} className="text-sm text-muted-foreground">
              {overlay}
            </span>
          ))}
        </div>
      </div>

      <div className="min-h-[400px] border rounded-lg p-4">
        {resources.nodes.map((node) => (
          <div
            key={node.id}
            className="p-3 border rounded-md mb-2 cursor-pointer hover:bg-accent"
            onClick={() => onNodeClick?.(node)}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{node.name}</span>
              <span className="text-sm text-muted-foreground">{node.type}</span>
            </div>
            {node.metadata && (
              <div className="mt-2 text-sm text-muted-foreground">
                {Object.entries(node.metadata).map(([key, value]) => (
                  <div key={key}>
                    {key}: {String(value)}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
} 
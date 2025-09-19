'use client';

import { memo } from 'react';

export interface GradientStop {
  offset: string;
  color: string;
  opacity?: number;
}

export interface LinearGradientProps {
  id: string;
  x1?: string;
  y1?: string;
  x2?: string;
  y2?: string;
  stops: GradientStop[];
}

export const LinearGradient = memo(function LinearGradient({
  id,
  x1 = '0%',
  y1 = '0%',
  x2 = '100%',
  y2 = '100%',
  stops
}: LinearGradientProps) {
  return (
    <linearGradient id={id} x1={x1} y1={y1} x2={x2} y2={y2}>
      {stops.map((stop, index) => (
        <stop
          key={index}
          offset={stop.offset}
          stopColor={stop.color}
          stopOpacity={stop.opacity ?? 1}
        />
      ))}
    </linearGradient>
  );
});

export const gradientPresets = {
  blueGreen: [
    { offset: '0%', color: '#3b82f6', opacity: 1 },
    { offset: '50%', color: '#06b6d4', opacity: 1 },
    { offset: '100%', color: '#10b981', opacity: 1 }
  ],
  purplePink: [
    { offset: '0%', color: '#8b5cf6', opacity: 1 },
    { offset: '100%', color: '#ec4899', opacity: 1 }
  ],
  warmSunset: [
    { offset: '0%', color: '#f59e0b', opacity: 1 },
    { offset: '100%', color: '#ef4444', opacity: 1 }
  ],
  coolMint: [
    { offset: '0%', color: '#06b6d4', opacity: 1 },
    { offset: '100%', color: '#10b981', opacity: 1 }
  ]
} as const;
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

const defaults = { size: 28, fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };

export function BookIcon({ size = defaults.size, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={defaults.fill} stroke={defaults.stroke} strokeWidth={defaults.strokeWidth} strokeLinecap={defaults.strokeLinecap} strokeLinejoin={defaults.strokeLinejoin} {...props}>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 7h8" />
      <path d="M8 11h6" />
    </svg>
  );
}

export function CodeIcon({ size = defaults.size, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={defaults.fill} stroke={defaults.stroke} strokeWidth={defaults.strokeWidth} strokeLinecap={defaults.strokeLinecap} strokeLinejoin={defaults.strokeLinejoin} {...props}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="12" y1="2" x2="12" y2="22" opacity="0" />
    </svg>
  );
}

export function PlugIcon({ size = defaults.size, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={defaults.fill} stroke={defaults.stroke} strokeWidth={defaults.strokeWidth} strokeLinecap={defaults.strokeLinecap} strokeLinejoin={defaults.strokeLinejoin} {...props}>
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a6 6 0 0 1-12 0V8z" />
    </svg>
  );
}

export function MessageIcon({ size = defaults.size, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={defaults.fill} stroke={defaults.stroke} strokeWidth={defaults.strokeWidth} strokeLinecap={defaults.strokeLinecap} strokeLinejoin={defaults.strokeLinejoin} {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 10h8" />
      <path d="M8 14h4" />
    </svg>
  );
}

export function TagIcon({ size = defaults.size, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={defaults.fill} stroke={defaults.stroke} strokeWidth={defaults.strokeWidth} strokeLinecap={defaults.strokeLinecap} strokeLinejoin={defaults.strokeLinejoin} {...props}>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

export function RobotIcon({ size = defaults.size, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={defaults.fill} stroke={defaults.stroke} strokeWidth={defaults.strokeWidth} strokeLinecap={defaults.strokeLinecap} strokeLinejoin={defaults.strokeLinejoin} {...props}>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M12 8V4" />
      <circle cx="12" cy="2" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="9" cy="14" r="1.5" />
      <circle cx="15" cy="14" r="1.5" />
      <path d="M9 18h6" />
    </svg>
  );
}

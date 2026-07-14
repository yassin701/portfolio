import React from 'react';
import { 
  Code2, 
  FileJson, 
  Database, 
  Server, 
  Globe, 
  Layout, 
  Palette, 
  GitBranch, 
  Cloud, 
  Wrench,
  Workflow,
  FileText,
  PenTool
} from 'lucide-react';

export const TechIcon = ({ name, size = 20, className = '' }) => {
  const commonProps = {
    size,
    strokeWidth: 1.2,
    className: `transition-all duration-300 group-hover:stroke-accent ${className}`,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  // Thin SVG paths for specific tech logos, using a generic wrapper for consistency
  const CustomIcon = ({ children }) => (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-all duration-300 group-hover:stroke-accent ${className}`}
    >
      {children}
    </svg>
  );

  switch (name.toLowerCase()) {
    case 'html5':
      return (
        <CustomIcon>
          <path d="M3 3h18l-1.5 14.5L12 21l-7.5-3.5L3 3z" />
          <path d="M7.5 7h9l-.5 4h-8l.5 4 3.5 1 3.5-1 .25-2" />
        </CustomIcon>
      );
    case 'css3':
      return (
        <CustomIcon>
          <path d="M3 3h18l-1.5 14.5L12 21l-7.5-3.5L3 3z" />
          <path d="M16.5 7h-9l.5 4h8l-.5 4-3.5 1-3.5-1-.25-2" />
        </CustomIcon>
      );
    case 'javascript':
    case 'js':
      return (
        <CustomIcon>
          <path d="M4 4h16v16H4z" />
          <path d="M9.5 16c0-1.5 1.5-2 3-2.5s2.5-1.5 2.5-3a2.5 2.5 0 0 0-5 0" />
          <path d="M9.5 10.5v1.5" />
          <path d="M14.5 16v-6.5" />
        </CustomIcon>
      );
    case 'react.js':
    case 'react':
      return (
        <CustomIcon>
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="1.5" />
        </CustomIcon>
      );
    case 'next.js':
    case 'next':
      return (
        <CustomIcon>
          <circle cx="12" cy="12" r="10" />
          <path d="M8 15V9l7 7V9" />
        </CustomIcon>
      );
    case 'tailwind css':
    case 'tailwind':
      return (
        <CustomIcon>
          <path d="M12 10c-2.5-1.5-4-1.5-5 0-1.5 1.5-1.5 4 0 5 2.5 1.5 4 1.5 5 0 1.5-1.5 1.5-4 0-5" />
          <path d="M17 10c-2.5-1.5-4-1.5-5 0" />
          <path d="M7 15c2.5 1.5 4 1.5 5 0" />
        </CustomIcon>
      );
    case 'php':
      return (
        <CustomIcon>
          <ellipse cx="12" cy="12" rx="10" ry="6" />
          <path d="M7 15v-5a2 2 0 0 1 4 0v1H7" />
          <path d="M13 15v-5a2 2 0 0 1 4 0v5" />
        </CustomIcon>
      );
    case 'laravel':
      return (
        <CustomIcon>
          <path d="M4 6l8-4 8 4-8 4-8-4z" />
          <path d="M4 10v4l8 4 8-4v-4" />
          <path d="M12 10v8" />
        </CustomIcon>
      );
    case 'mysql':
    case 'database':
      return <Database {...commonProps} />;
    case 'supabase':
      return (
        <CustomIcon>
          <path d="M12 3v9h8a1 1 0 0 1 .8 1.6l-9 8v-9H4a1 1 0 0 1-.8-1.6l9-8z" />
        </CustomIcon>
      );
    case 'rest apis':
    case 'api':
      return <Server {...commonProps} />;
    case 'framer motion':
    case 'gsap':
      return <Code2 {...commonProps} />;
    case 'git & github':
    case 'git':
      return <GitBranch {...commonProps} />;
    case 'cloudinary':
    case 'vercel':
      return <Cloud {...commonProps} />;
    case 'n8n':
      return <Workflow {...commonProps} />;
    case 'figma':
      return <PenTool {...commonProps} />;
    case 'jira':
      return <FileText {...commonProps} />;
    default:
      return <Code2 {...commonProps} />;
  }
};

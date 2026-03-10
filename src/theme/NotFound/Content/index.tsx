import React from 'react';
import Link from '@docusaurus/Link';

export default function NotFoundContent(): React.JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '6rem 1.5rem',
        minHeight: '50vh',
      }}
    >
      <h1
        style={{
          fontSize: '6rem',
          fontWeight: 800,
          lineHeight: 1,
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        404
      </h1>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>
        Page not found
      </h2>
      <p
        style={{
          maxWidth: '420px',
          color: 'var(--ifm-color-emphasis-600)',
          marginBottom: '2rem',
          lineHeight: 1.6,
        }}
      >
        The page you're looking for doesn't exist or has been moved. Try one of the links below, or use <strong>Ask AI</strong> to search the docs.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.625rem 1.5rem',
            borderRadius: '0.75rem',
            background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.9rem',
            textDecoration: 'none',
          }}
        >
          Home
        </Link>
        <Link
          to="/docs/getting-started"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.625rem 1.5rem',
            borderRadius: '0.75rem',
            border: '1px solid var(--ifm-color-emphasis-300)',
            background: 'transparent',
            color: 'var(--ifm-font-color-base)',
            fontWeight: 600,
            fontSize: '0.9rem',
            textDecoration: 'none',
          }}
        >
          Docs
        </Link>
        <Link
          to="/docs/api/overview"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.625rem 1.5rem',
            borderRadius: '0.75rem',
            border: '1px solid var(--ifm-color-emphasis-300)',
            background: 'transparent',
            color: 'var(--ifm-font-color-base)',
            fontWeight: 600,
            fontSize: '0.9rem',
            textDecoration: 'none',
          }}
        >
          API Reference
        </Link>
      </div>
    </div>
  );
}

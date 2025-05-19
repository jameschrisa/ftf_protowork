# Environment Variables Documentation

This document describes the environment variables used in this project.

## Overview

Environment variables are used to configure the application for different environments (development, testing, production).
They are stored in `.env` files and accessed in the application code.

## Files

- `.env`: Local development environment variables (not committed to version control)
- `.env.example`: Example template with all required variables (committed to version control)
- `.env.development`: Development environment variables
- `.env.production`: Production environment variables
- `.env.test`: Testing environment variables

## Variables

### API Configuration

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Base URL for API requests | `http://localhost:8000/api` |
| `VITE_API_TIMEOUT` | Timeout for API requests (in milliseconds) | `30000` |

### Authentication

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_AUTH_ENABLED` | Enable/disable authentication | `true` |
| `VITE_AUTH_DOMAIN` | Authentication domain | `your-auth-domain` |
| `VITE_AUTH_CLIENT_ID` | Authentication client ID | `your-client-id` |
| `VITE_AUTH_AUDIENCE` | Authentication audience | `your-audience` |

### Feature Flags

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_FEATURE_ANALYTICS` | Enable/disable analytics | `false` |
| `VITE_FEATURE_NOTIFICATIONS` | Enable/disable notifications | `true` |
| `VITE_FEATURE_DARK_MODE` | Enable/disable dark mode | `true` |

### Logging

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_LOG_LEVEL` | Logging level | `info`, `debug`, `error` |

### Application Settings

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_APP_NAME` | Application name | `"Supply Chain Dashboard"` |
| `VITE_APP_VERSION` | Application version | `1.0.0` |
| `VITE_APP_ENVIRONMENT` | Application environment | `development`, `production`, `test` |

### External Services

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_MAPS_API_KEY` | API key for maps service | `your-maps-api-key` |

## Usage in Code

Environment variables are accessed in the code using `import.meta.env`:

```typescript
// Example usage
const apiUrl = import.meta.env.VITE_API_URL;
const isAuthEnabled = import.meta.env.VITE_AUTH_ENABLED === 'true';
```

## Adding New Variables

When adding new environment variables:

1. Add them to `.env.example` with a default value or placeholder
2. Add them to the appropriate environment files (`.env.development`, `.env.production`, etc.)
3. Document them in this file
4. Use them in the code with `import.meta.env.VARIABLE_NAME`

## Important Notes

- All environment variables must be prefixed with `VITE_` to be exposed to the client-side code
- Do not commit sensitive information (API keys, secrets) to version control
- Use `.env.local` for local overrides (not committed to version control)

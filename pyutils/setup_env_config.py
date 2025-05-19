#!/usr/bin/env python3
"""
Environment Configuration Setup

This script checks for environment configuration files (.env) and creates them if they don't exist.
It also generates a template .env.example file with common environment variables for frontend projects.
"""

import os
import sys
from typing import Dict, List, Set

# ANSI color codes for terminal output
class Colors:
    HEADER = '\033[95m'
    BLUE = '\033[94m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def print_header(message: str) -> None:
    """Print a formatted header message."""
    print(f"\n{Colors.HEADER}{Colors.BOLD}{'=' * 80}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{message.center(80)}{Colors.ENDC}")
    print(f"{Colors.HEADER}{Colors.BOLD}{'=' * 80}{Colors.ENDC}\n")

def print_success(message: str) -> None:
    """Print a success message."""
    print(f"{Colors.GREEN}✓ {message}{Colors.ENDC}")

def print_warning(message: str) -> None:
    """Print a warning message."""
    print(f"{Colors.YELLOW}⚠ {message}{Colors.ENDC}")

def print_error(message: str) -> None:
    """Print an error message."""
    print(f"{Colors.RED}✗ {message}{Colors.ENDC}")

def print_info(message: str) -> None:
    """Print an info message."""
    print(f"{Colors.BLUE}ℹ {message}{Colors.ENDC}")

def check_env_files(project_dir: str) -> Dict[str, bool]:
    """Check if environment files exist."""
    env_files = {
        '.env': 'Environment variables for local development',
        '.env.example': 'Example environment variables template',
        '.env.development': 'Environment variables for development',
        '.env.production': 'Environment variables for production',
        '.env.test': 'Environment variables for testing',
    }
    
    print_header("Checking Environment Configuration Files")
    
    results = {}
    for file_name, description in env_files.items():
        file_path = os.path.join(project_dir, file_name)
        exists = os.path.isfile(file_path)
        results[file_name] = exists
        
        if exists:
            print_success(f"Found {file_name} ({description})")
        else:
            print_warning(f"Missing {file_name} ({description})")
    
    return results

def create_env_example(project_dir: str) -> None:
    """Create a .env.example file with common environment variables."""
    env_example_path = os.path.join(project_dir, '.env.example')
    
    # Skip if file already exists
    if os.path.isfile(env_example_path):
        print_info(f".env.example already exists at {env_example_path}")
        return
    
    print_info("Creating .env.example template...")
    
    env_content = """# API Configuration
VITE_API_URL=http://localhost:8000/api
VITE_API_TIMEOUT=30000

# Authentication
VITE_AUTH_ENABLED=true
VITE_AUTH_DOMAIN=your-auth-domain
VITE_AUTH_CLIENT_ID=your-client-id
VITE_AUTH_AUDIENCE=your-audience

# Feature Flags
VITE_FEATURE_ANALYTICS=false
VITE_FEATURE_NOTIFICATIONS=true
VITE_FEATURE_DARK_MODE=true

# Logging
VITE_LOG_LEVEL=info

# Application Settings
VITE_APP_NAME="Supply Chain Dashboard"
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development

# External Services
VITE_MAPS_API_KEY=your-maps-api-key
"""
    
    try:
        with open(env_example_path, 'w') as file:
            file.write(env_content)
        print_success(f"Created .env.example at {env_example_path}")
    except Exception as e:
        print_error(f"Error creating .env.example: {str(e)}")

def create_env_file(project_dir: str) -> None:
    """Create a .env file if it doesn't exist."""
    env_path = os.path.join(project_dir, '.env')
    
    # Skip if file already exists
    if os.path.isfile(env_path):
        print_info(f".env already exists at {env_path}")
        return
    
    print_info("Creating .env file...")
    
    env_content = """# Local Development Environment Variables
VITE_API_URL=http://localhost:8000/api
VITE_API_TIMEOUT=30000

# Authentication (disabled for local development)
VITE_AUTH_ENABLED=false

# Feature Flags
VITE_FEATURE_ANALYTICS=false
VITE_FEATURE_NOTIFICATIONS=true
VITE_FEATURE_DARK_MODE=true

# Logging
VITE_LOG_LEVEL=debug

# Application Settings
VITE_APP_NAME="Supply Chain Dashboard"
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development
"""
    
    try:
        with open(env_path, 'w') as file:
            file.write(env_content)
        print_success(f"Created .env at {env_path}")
    except Exception as e:
        print_error(f"Error creating .env: {str(e)}")

def create_env_development(project_dir: str) -> None:
    """Create a .env.development file if it doesn't exist."""
    env_dev_path = os.path.join(project_dir, '.env.development')
    
    # Skip if file already exists
    if os.path.isfile(env_dev_path):
        print_info(f".env.development already exists at {env_dev_path}")
        return
    
    print_info("Creating .env.development file...")
    
    env_content = """# Development Environment Variables
VITE_API_URL=https://dev-api.example.com/api
VITE_API_TIMEOUT=30000

# Authentication
VITE_AUTH_ENABLED=true
VITE_AUTH_DOMAIN=dev-auth-domain
VITE_AUTH_CLIENT_ID=dev-client-id
VITE_AUTH_AUDIENCE=dev-audience

# Feature Flags
VITE_FEATURE_ANALYTICS=true
VITE_FEATURE_NOTIFICATIONS=true
VITE_FEATURE_DARK_MODE=true

# Logging
VITE_LOG_LEVEL=debug

# Application Settings
VITE_APP_NAME="Supply Chain Dashboard"
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=development
"""
    
    try:
        with open(env_dev_path, 'w') as file:
            file.write(env_content)
        print_success(f"Created .env.development at {env_dev_path}")
    except Exception as e:
        print_error(f"Error creating .env.development: {str(e)}")

def create_env_production(project_dir: str) -> None:
    """Create a .env.production file if it doesn't exist."""
    env_prod_path = os.path.join(project_dir, '.env.production')
    
    # Skip if file already exists
    if os.path.isfile(env_prod_path):
        print_info(f".env.production already exists at {env_prod_path}")
        return
    
    print_info("Creating .env.production file...")
    
    env_content = """# Production Environment Variables
VITE_API_URL=https://api.example.com/api
VITE_API_TIMEOUT=30000

# Authentication
VITE_AUTH_ENABLED=true
VITE_AUTH_DOMAIN=prod-auth-domain
VITE_AUTH_CLIENT_ID=prod-client-id
VITE_AUTH_AUDIENCE=prod-audience

# Feature Flags
VITE_FEATURE_ANALYTICS=true
VITE_FEATURE_NOTIFICATIONS=true
VITE_FEATURE_DARK_MODE=true

# Logging
VITE_LOG_LEVEL=error

# Application Settings
VITE_APP_NAME="Supply Chain Dashboard"
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=production
"""
    
    try:
        with open(env_prod_path, 'w') as file:
            file.write(env_content)
        print_success(f"Created .env.production at {env_prod_path}")
    except Exception as e:
        print_error(f"Error creating .env.production: {str(e)}")

def create_env_test(project_dir: str) -> None:
    """Create a .env.test file if it doesn't exist."""
    env_test_path = os.path.join(project_dir, '.env.test')
    
    # Skip if file already exists
    if os.path.isfile(env_test_path):
        print_info(f".env.test already exists at {env_test_path}")
        return
    
    print_info("Creating .env.test file...")
    
    env_content = """# Test Environment Variables
VITE_API_URL=http://localhost:8000/api
VITE_API_TIMEOUT=5000

# Authentication (disabled for testing)
VITE_AUTH_ENABLED=false

# Feature Flags
VITE_FEATURE_ANALYTICS=false
VITE_FEATURE_NOTIFICATIONS=false
VITE_FEATURE_DARK_MODE=true

# Logging
VITE_LOG_LEVEL=debug

# Application Settings
VITE_APP_NAME="Supply Chain Dashboard"
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=test
"""
    
    try:
        with open(env_test_path, 'w') as file:
            file.write(env_content)
        print_success(f"Created .env.test at {env_test_path}")
    except Exception as e:
        print_error(f"Error creating .env.test: {str(e)}")

def update_gitignore(project_dir: str) -> None:
    """Update .gitignore to include .env files if needed."""
    gitignore_path = os.path.join(project_dir, '.gitignore')
    
    if not os.path.isfile(gitignore_path):
        print_warning(".gitignore not found, creating one...")
        try:
            with open(gitignore_path, 'w') as file:
                file.write("# Environment variables\n.env\n.env.local\n.env.development.local\n.env.test.local\n.env.production.local\n")
            print_success("Created .gitignore with environment variables")
            return
        except Exception as e:
            print_error(f"Error creating .gitignore: {str(e)}")
            return
    
    # Check if .env is already in .gitignore
    try:
        with open(gitignore_path, 'r') as file:
            content = file.read()
            
            if '.env' in content:
                print_success(".env files are already in .gitignore")
                return
            
            print_warning(".env files not found in .gitignore, updating...")
            
            with open(gitignore_path, 'a') as append_file:
                append_file.write("\n# Environment variables\n.env\n.env.local\n.env.development.local\n.env.test.local\n.env.production.local\n")
            
            print_success("Updated .gitignore to include .env files")
    
    except Exception as e:
        print_error(f"Error updating .gitignore: {str(e)}")

def create_env_documentation(project_dir: str) -> None:
    """Create a documentation file for environment variables."""
    env_docs_path = os.path.join(project_dir, 'ENV_VARIABLES.md')
    
    # Skip if file already exists
    if os.path.isfile(env_docs_path):
        print_info(f"ENV_VARIABLES.md already exists at {env_docs_path}")
        return
    
    print_info("Creating environment variables documentation...")
    
    docs_content = """# Environment Variables Documentation

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
"""
    
    try:
        with open(env_docs_path, 'w') as file:
            file.write(docs_content)
        print_success(f"Created environment variables documentation at {env_docs_path}")
    except Exception as e:
        print_error(f"Error creating environment variables documentation: {str(e)}")

def main() -> None:
    """Main function to run the script."""
    print_header("Environment Configuration Setup")
    
    # Get project directory (default to current directory)
    project_dir = os.getcwd()
    
    # Check for existing environment files
    env_results = check_env_files(project_dir)
    
    # Create environment files if they don't exist
    if not env_results.get('.env.example', False):
        create_env_example(project_dir)
    
    if not env_results.get('.env', False):
        create_env_file(project_dir)
    
    if not env_results.get('.env.development', False):
        create_env_development(project_dir)
    
    if not env_results.get('.env.production', False):
        create_env_production(project_dir)
    
    if not env_results.get('.env.test', False):
        create_env_test(project_dir)
    
    # Update .gitignore if needed
    update_gitignore(project_dir)
    
    # Create documentation
    create_env_documentation(project_dir)
    
    print_header("Environment Configuration Complete")
    
    print_info("""
Next Steps:
1. Review and customize the created environment files
2. Update the environment variables to match your project requirements
3. Add any additional environment variables specific to your project
4. Ensure sensitive information is not committed to version control
    """)

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Frontend Project Validator

This script checks a frontend project to ensure it has all required libraries
and configuration files. It analyzes the package.json, verifies configuration files,
and provides recommendations for any missing components.
"""

import json
import os
import sys
from typing import Dict, List, Set, Tuple, Any, Optional
import re

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

def load_json_file(file_path: str) -> Optional[Dict]:
    """Load and parse a JSON file."""
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        print_error(f"File not found: {file_path}")
        return None
    except json.JSONDecodeError:
        print_error(f"Invalid JSON in file: {file_path}")
        return None
    except Exception as e:
        print_error(f"Error reading {file_path}: {str(e)}")
        return None

def check_file_exists(file_path: str) -> bool:
    """Check if a file exists."""
    exists = os.path.isfile(file_path)
    if exists:
        print_success(f"Found {file_path}")
    else:
        print_error(f"Missing {file_path}")
    return exists

def check_package_json(project_dir: str) -> Tuple[bool, Optional[Dict]]:
    """Check if package.json exists and load its contents."""
    package_path = os.path.join(project_dir, 'package.json')
    if not check_file_exists(package_path):
        return False, None
    
    package_data = load_json_file(package_path)
    if not package_data:
        return False, None
    
    return True, package_data

def check_required_dependencies(package_data: Dict) -> List[str]:
    """Check if all required dependencies are present in package.json."""
    dependencies = set(package_data.get('dependencies', {}).keys())
    dev_dependencies = set(package_data.get('devDependencies', {}).keys())
    all_dependencies = dependencies.union(dev_dependencies)
    
    # Essential React TypeScript dependencies
    essential_deps = {
        'react': 'Core React library',
        'react-dom': 'React DOM manipulation',
        'typescript': 'TypeScript language support',
    }
    
    # Build and development tools
    build_tools = {
        'vite': 'Build tool',
        '@vitejs/plugin-react': 'React plugin for Vite',
    }
    
    # Styling dependencies
    styling_deps = {
        'tailwindcss': 'Utility-first CSS framework',
        'postcss': 'CSS transformation tool',
        'autoprefixer': 'PostCSS plugin to parse CSS and add vendor prefixes',
    }
    
    # Linting and formatting
    linting_deps = {
        'eslint': 'Linting utility',
        'typescript-eslint': 'TypeScript ESLint',
    }
    
    # Testing frameworks
    testing_deps = {
        'vitest': 'Vite-native testing framework',
        '@testing-library/react': 'React testing utilities',
        '@testing-library/jest-dom': 'Custom jest matchers for DOM testing',
    }
    
    # Type definitions
    type_deps = {
        '@types/react': 'React type definitions',
        '@types/react-dom': 'React DOM type definitions',
        '@types/node': 'Node.js type definitions',
    }
    
    # Combine all categories for checking
    all_required_deps = {}
    all_required_deps.update(essential_deps)
    all_required_deps.update(build_tools)
    all_required_deps.update(styling_deps)
    all_required_deps.update(linting_deps)
    
    # Check for missing dependencies
    missing_deps = []
    
    print_header("Checking Required Dependencies")
    
    for dep, description in all_required_deps.items():
        if dep in all_dependencies:
            print_success(f"Found {dep} ({description})")
        else:
            print_error(f"Missing {dep} ({description})")
            missing_deps.append(dep)
    
    # Check for recommended testing dependencies
    print_header("Checking Testing Dependencies")
    
    missing_testing_deps = []
    for dep, description in testing_deps.items():
        if dep in all_dependencies:
            print_success(f"Found {dep} ({description})")
        else:
            print_warning(f"Recommended: {dep} ({description})")
            missing_testing_deps.append(dep)
    
    if missing_testing_deps:
        print_info("Consider adding testing libraries for better code quality")
    
    # Check for type definitions
    print_header("Checking Type Definitions")
    
    for dep, description in type_deps.items():
        if dep in all_dependencies:
            print_success(f"Found {dep} ({description})")
        else:
            print_warning(f"Recommended: {dep} ({description})")
            missing_deps.append(dep)
    
    return missing_deps

def check_config_files(project_dir: str) -> Dict[str, bool]:
    """Check if all required configuration files exist."""
    config_files = {
        'vite.config.ts': 'Vite configuration',
        'vite.config.js': 'Vite configuration (JavaScript)',
        'tsconfig.json': 'TypeScript configuration',
        'tailwind.config.js': 'Tailwind CSS configuration',
        'postcss.config.js': 'PostCSS configuration',
        'eslint.config.js': 'ESLint configuration',
        '.eslintrc.js': 'ESLint configuration (legacy)',
        '.eslintrc.json': 'ESLint configuration (legacy JSON)',
        'components.json': 'shadcn/ui components configuration',
    }
    
    print_header("Checking Configuration Files")
    
    results = {}
    for file_name, description in config_files.items():
        file_path = os.path.join(project_dir, file_name)
        exists = os.path.isfile(file_path)
        
        # Group similar config files (e.g., different ESLint config formats)
        base_name = file_name.split('.')[0]
        if base_name in ['vite', 'eslintrc', 'eslint']:
            if base_name not in results:
                results[base_name] = False
            
            results[base_name] = results[base_name] or exists
            
            if exists:
                print_success(f"Found {file_name} ({description})")
        else:
            results[file_name] = exists
            if exists:
                print_success(f"Found {file_name} ({description})")
            else:
                print_error(f"Missing {file_name} ({description})")
    
    return results

def check_project_structure(project_dir: str) -> None:
    """Check if the project follows standard React/TypeScript structure."""
    expected_dirs = {
        'src': 'Source code directory',
        'src/components': 'React components',
        'src/pages': 'Page components',
        'public': 'Static assets',
    }
    
    print_header("Checking Project Structure")
    
    for dir_name, description in expected_dirs.items():
        dir_path = os.path.join(project_dir, dir_name)
        if os.path.isdir(dir_path):
            print_success(f"Found {dir_name}/ directory ({description})")
        else:
            print_warning(f"Missing {dir_name}/ directory ({description})")

def analyze_vite_config(project_dir: str) -> None:
    """Analyze the Vite configuration file."""
    vite_config_path = os.path.join(project_dir, 'vite.config.ts')
    if not os.path.isfile(vite_config_path):
        vite_config_path = os.path.join(project_dir, 'vite.config.js')
        if not os.path.isfile(vite_config_path):
            print_error("Could not find Vite configuration file")
            return
    
    print_header("Analyzing Vite Configuration")
    
    try:
        with open(vite_config_path, 'r') as file:
            content = file.read()
            
            # Check for React plugin
            if re.search(r'@vitejs/plugin-react', content):
                print_success("Vite is configured with React plugin")
            else:
                print_error("Vite configuration is missing React plugin")
            
            # Check for path aliases
            if re.search(r'resolve.*alias', content, re.DOTALL):
                print_success("Vite is configured with path aliases")
            else:
                print_warning("Consider adding path aliases in Vite config for better imports")
            
            # Check for build optimizations
            if re.search(r'build.*rollupOptions', content, re.DOTALL):
                print_success("Vite has build optimizations configured")
            else:
                print_warning("Consider adding build optimizations in Vite config")
    
    except Exception as e:
        print_error(f"Error analyzing Vite config: {str(e)}")

def analyze_tsconfig(project_dir: str) -> None:
    """Analyze the TypeScript configuration file."""
    tsconfig_path = os.path.join(project_dir, 'tsconfig.json')
    if not os.path.isfile(tsconfig_path):
        print_error("Could not find tsconfig.json")
        return
    
    print_header("Analyzing TypeScript Configuration")
    
    tsconfig = load_json_file(tsconfig_path)
    if not tsconfig:
        return
    
    compiler_options = tsconfig.get('compilerOptions', {})
    
    # Check for strict mode
    if compiler_options.get('strict'):
        print_success("TypeScript is configured with strict mode")
    else:
        print_warning("Consider enabling strict mode in TypeScript for better type safety")
    
    # Check for path aliases
    if 'paths' in compiler_options:
        print_success("TypeScript is configured with path aliases")
    else:
        print_warning("Consider adding path aliases in tsconfig.json for better imports")
    
    # Check for target ECMAScript version
    target = compiler_options.get('target')
    if target and target in ['ES2020', 'ES2021', 'ES2022']:
        print_success(f"TypeScript target is set to modern ECMAScript ({target})")
    else:
        print_warning(f"Consider using a modern ECMAScript target (current: {target})")

def analyze_tailwind_config(project_dir: str) -> None:
    """Analyze the Tailwind CSS configuration file."""
    tailwind_config_path = os.path.join(project_dir, 'tailwind.config.js')
    if not os.path.isfile(tailwind_config_path):
        print_error("Could not find tailwind.config.js")
        return
    
    print_header("Analyzing Tailwind CSS Configuration")
    
    try:
        with open(tailwind_config_path, 'r') as file:
            content = file.read()
            
            # Check for content configuration
            if re.search(r'content.*\[.*\]', content, re.DOTALL):
                print_success("Tailwind CSS content paths are configured")
            else:
                print_error("Tailwind CSS is missing content path configuration")
            
            # Check for theme customization
            if re.search(r'theme.*extend', content, re.DOTALL):
                print_success("Tailwind CSS theme customization is configured")
            else:
                print_warning("Consider customizing Tailwind CSS theme")
            
            # Check for plugins
            if re.search(r'plugins.*\[', content, re.DOTALL):
                print_success("Tailwind CSS plugins are configured")
            else:
                print_warning("Consider adding Tailwind CSS plugins for additional functionality")
    
    except Exception as e:
        print_error(f"Error analyzing Tailwind config: {str(e)}")

def generate_recommendations(missing_deps: List[str], config_results: Dict[str, bool]) -> None:
    """Generate recommendations based on analysis results."""
    print_header("Recommendations")
    
    if missing_deps:
        print_info("Missing Dependencies:")
        print("To install missing dependencies, run:")
        deps_str = ' '.join(missing_deps)
        print(f"\n    npm install {deps_str}\n")
    
    # Check for missing configuration files
    missing_configs = [key for key, value in config_results.items() if not value and key not in ['eslintrc']]
    
    if 'tsconfig.json' in missing_configs:
        print_info("Create a TypeScript configuration:")
        print("""
    npx tsc --init --jsx react --target es2020 --module esnext --moduleResolution bundler
    --resolveJsonModule --allowJs --noEmit --strict --esModuleInterop
        """)
    
    if 'tailwind.config.js' in missing_configs:
        print_info("Create a Tailwind CSS configuration:")
        print("""
    npx tailwindcss init -p
        """)
    
    if 'vite' in missing_configs:
        print_info("Create a Vite configuration:")
        print("""
    // vite.config.ts
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import path from 'path'

    export default defineConfig({
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
    })
        """)
    
    # General recommendations
    print_info("General Recommendations:")
    print("""
1. Consider adding a testing setup with Vitest and React Testing Library
2. Set up a CI/CD pipeline for automated testing and deployment
3. Add a pre-commit hook for linting and formatting
4. Consider adding Storybook for component documentation
5. Implement error boundaries for better error handling
6. Add environment variable handling for different environments
    """)

def main() -> None:
    """Main function to run the script."""
    print_header("Frontend Project Validator")
    
    # Get project directory (default to current directory)
    project_dir = os.getcwd()
    
    # Check if package.json exists
    has_package, package_data = check_package_json(project_dir)
    if not has_package:
        print_error("This doesn't appear to be a valid frontend project (missing package.json)")
        sys.exit(1)
    
    # Check required dependencies
    missing_deps = check_required_dependencies(package_data)
    
    # Check configuration files
    config_results = check_config_files(project_dir)
    
    # Check project structure
    check_project_structure(project_dir)
    
    # Analyze configuration files
    analyze_vite_config(project_dir)
    analyze_tsconfig(project_dir)
    analyze_tailwind_config(project_dir)
    
    # Generate recommendations
    generate_recommendations(missing_deps, config_results)
    
    print_header("Validation Complete")
    
    if not missing_deps and all(config_results.values()):
        print_success("All required dependencies and configuration files are present!")
    else:
        print_warning("Some dependencies or configuration files are missing. See recommendations above.")

if __name__ == "__main__":
    main()

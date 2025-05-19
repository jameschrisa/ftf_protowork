# Frontend Project Setup Scripts

This collection of Python scripts helps ensure your React/TypeScript frontend project has all the required libraries and configuration files. The scripts check for dependencies, verify configuration files, and set up environment variables.

## Scripts Overview

### 1. `setup_frontend_project.py`

The main script that runs both the dependency checker and environment configuration setup. This is the primary script you should run.

### 2. `check_frontend_project.py`

Analyzes your frontend project to ensure it has all required dependencies and configuration files. It checks:

- Required dependencies in package.json
- Configuration files (vite.config.ts, tsconfig.json, etc.)
- Project structure
- Configuration file contents

### 3. `setup_env_config.py`

Sets up environment configuration files for your project:

- Creates .env files for different environments (development, production, test)
- Creates a .env.example template
- Updates .gitignore to exclude .env files
- Creates documentation for environment variables

## Requirements

- Python 3.6 or higher
- A React/TypeScript frontend project

## Usage

1. Place these scripts in your frontend project's root directory
2. Make the scripts executable (if needed):
   ```
   chmod +x setup_frontend_project.py
   chmod +x check_frontend_project.py
   chmod +x setup_env_config.py
   ```
3. Run the main script:
   ```
   python setup_frontend_project.py
   ```

## What the Scripts Check For

### Dependencies

- Core React libraries (react, react-dom)
- TypeScript
- Build tools (Vite, plugins)
- Styling libraries (Tailwind CSS, PostCSS)
- Linting tools (ESLint)
- Testing libraries (recommended)
- Type definitions

### Configuration Files

- vite.config.ts/js
- tsconfig.json
- tailwind.config.js
- postcss.config.js
- eslint.config.js
- components.json (for shadcn/ui)

### Environment Files

- .env (local development)
- .env.example (template)
- .env.development
- .env.production
- .env.test

## Output

The scripts provide colorful terminal output with:

- ✓ Success messages (green)
- ⚠ Warning messages (yellow)
- ✗ Error messages (red)
- ℹ Info messages (blue)

## Recommendations

The scripts also provide recommendations for:

- Missing dependencies
- Configuration improvements
- Best practices
- Environment variable setup

## Customization

You can modify the scripts to add or remove checks based on your project's specific requirements:

- Add additional dependencies to check for
- Modify configuration file checks
- Customize environment variables

## Example Output

```
================================================================================
                          Frontend Project Setup
================================================================================

================================================================================
                  Step 1: Checking Frontend Project
================================================================================

...

================================================================================
              Step 2: Setting Up Environment Configuration
================================================================================

...

================================================================================
                             Setup Summary
================================================================================

✓ Frontend project check completed successfully
✓ Environment configuration setup completed successfully

================================================================================
                              Next Steps
================================================================================

ℹ 
1. Review the output of the scripts for any warnings or errors
2. Install any missing dependencies identified by the check script
3. Create any missing configuration files
4. Customize the environment variables to match your project requirements
5. Run your project with:
   
   npm run dev
   
   or
   
   yarn dev
    
```

## Troubleshooting

If you encounter any issues:

1. Ensure Python 3.6+ is installed
2. Make sure the scripts are in your project's root directory
3. Check that the scripts have execute permissions
4. Review the error messages for specific issues

## License

These scripts are provided under the MIT License. Feel free to modify and distribute them as needed.

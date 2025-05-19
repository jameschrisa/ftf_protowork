#!/usr/bin/env python3
"""
Frontend Project Setup

This script runs the check_frontend_project.py and setup_env_config.py scripts
to ensure the frontend project has all required libraries and configuration files.
"""

import os
import sys
import subprocess
import importlib.util

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

def check_script_exists(script_path: str) -> bool:
    """Check if a script exists."""
    if os.path.isfile(script_path):
        return True
    print_error(f"Script not found: {script_path}")
    return False

def run_script(script_path: str) -> int:
    """Run a Python script and return the exit code."""
    try:
        # Make the script executable
        os.chmod(script_path, 0o755)
        
        # Run the script
        print_info(f"Running {os.path.basename(script_path)}...")
        result = subprocess.run([sys.executable, script_path], check=False)
        return result.returncode
    except Exception as e:
        print_error(f"Error running {script_path}: {str(e)}")
        return 1

def import_and_run_script(script_path: str, script_name: str) -> bool:
    """Import and run a Python script as a module."""
    try:
        # Import the script as a module
        spec = importlib.util.spec_from_file_location(script_name, script_path)
        if spec is None:
            print_error(f"Could not load {script_path} as a module")
            return False
        
        module = importlib.util.module_from_spec(spec)
        if spec.loader is None:
            print_error(f"Could not load {script_path} as a module (loader is None)")
            return False
        
        spec.loader.exec_module(module)
        
        # Run the main function
        if hasattr(module, 'main'):
            module.main()
            return True
        else:
            print_error(f"Script {script_path} does not have a main() function")
            return False
    except Exception as e:
        print_error(f"Error importing and running {script_path}: {str(e)}")
        return False

def main() -> None:
    """Main function to run the script."""
    print_header("Frontend Project Setup")
    
    # Get the directory of this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Define paths to the scripts
    check_script_path = os.path.join(script_dir, 'check_frontend_project.py')
    env_script_path = os.path.join(script_dir, 'setup_env_config.py')
    
    # Check if the scripts exist
    check_script_exists = os.path.isfile(check_script_path)
    env_script_exists = os.path.isfile(env_script_path)
    
    if not check_script_exists:
        print_error(f"Script not found: {check_script_path}")
    
    if not env_script_exists:
        print_error(f"Script not found: {env_script_path}")
    
    if not check_script_exists or not env_script_exists:
        print_error("One or more required scripts are missing. Please ensure both scripts are in the same directory as this script.")
        sys.exit(1)
    
    # Run the check_frontend_project.py script
    print_header("Step 1: Checking Frontend Project")
    check_result = import_and_run_script(check_script_path, 'check_frontend_project')
    
    # Run the setup_env_config.py script
    print_header("Step 2: Setting Up Environment Configuration")
    env_result = import_and_run_script(env_script_path, 'setup_env_config')
    
    # Print summary
    print_header("Setup Summary")
    
    if check_result:
        print_success("Frontend project check completed successfully")
    else:
        print_warning("Frontend project check encountered issues")
    
    if env_result:
        print_success("Environment configuration setup completed successfully")
    else:
        print_warning("Environment configuration setup encountered issues")
    
    # Print next steps
    print_header("Next Steps")
    
    print_info("""
1. Review the output of the scripts for any warnings or errors
2. Install any missing dependencies identified by the check script
3. Create any missing configuration files
4. Customize the environment variables to match your project requirements
5. Run your project with:
   
   npm run dev
   
   or
   
   yarn dev
    """)

if __name__ == "__main__":
    main()

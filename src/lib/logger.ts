interface LogEntry {
  timestamp: string
  type: string
  message: string
  details?: Record<string, any>
}

class Logger {
  private logDirectory?: FileSystemDirectoryHandle

  constructor() {
    this.logDirectory = undefined
  }

  private async log(type: string, message: string, details?: Record<string, any>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      type,
      message,
      details
    }
    
    // Always log to console
    console.log(entry)

    // If logDirectory is set, attempt to write to file
    if (this.logDirectory) {
      try {
        const fileHandle = await this.logDirectory.getFileHandle('dashboard.log', { create: true });
        const writable = await fileHandle.createWritable({ keepExistingData: true });
        const logLine = `${entry.timestamp} [${entry.type}] ${entry.message}${details ? ` ${JSON.stringify(details)}` : ''}\n`;
        await writable.write(logLine);
        await writable.close();
      } catch (error) {
        console.error('Failed to write to log file:', error);
      }
    }
  }

  async info(message: string, details?: Record<string, any>) {
    await this.log('INFO', message, details)
  }

  async debug(message: string, details?: Record<string, any>) {
    await this.log('DEBUG', message, details)
  }

  async warn(message: string, details?: Record<string, any>) {
    await this.log('WARN', message, details)
  }

  async error(message: string, details?: Record<string, any>) {
    await this.log('ERROR', message, details)
  }

  async logActivity(message: string, details?: Record<string, any>) {
    await this.log('ACTIVITY', message, details)
  }

  async logSystemError(error: Error, context: string) {
    await this.log('SYSTEM_ERROR', error.message, {
      context,
      stack: error.stack
    })
  }

  async logAppState(message: string, state: Record<string, any>) {
    await this.log('APP_STATE', message, state)
  }

  async setLogDirectory(directory: FileSystemDirectoryHandle) {
    this.logDirectory = directory
  }
}

export const logger = new Logger()

import { ipcRenderer } from 'electron';

export interface FileStats {
  name: string;
  size: number;
  type: string;
  lastModified: Date;
  path: string;
}

class FileService {
  async readFile(path: string): Promise<string> {
    try {
      const content = await ipcRenderer.invoke('read-file', path);
      return content;
    } catch (error) {
      console.error('Error reading file:', error);
      throw error;
    }
  }

  async writeFile(path: string, content: string): Promise<void> {
    try {
      await ipcRenderer.invoke('write-file', { path, content });
    } catch (error) {
      console.error('Error writing file:', error);
      throw error;
    }
  }

  async getFileStats(path: string): Promise<FileStats> {
    try {
      const stats = await ipcRenderer.invoke('get-file-stats', path);
      return stats;
    } catch (error) {
      console.error('Error getting file stats:', error);
      throw error;
    }
  }

  async listDirectory(path: string): Promise<FileStats[]> {
    try {
      const files = await ipcRenderer.invoke('list-directory', path);
      return files;
    } catch (error) {
      console.error('Error listing directory:', error);
      throw error;
    }
  }

  async createDirectory(path: string): Promise<void> {
    try {
      await ipcRenderer.invoke('create-directory', path);
    } catch (error) {
      console.error('Error creating directory:', error);
      throw error;
    }
  }

  async deleteFile(path: string): Promise<void> {
    try {
      await ipcRenderer.invoke('delete-file', path);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  async searchFiles(directory: string, pattern: string): Promise<FileStats[]> {
    try {
      const files = await ipcRenderer.invoke('search-files', { directory, pattern });
      return files;
    } catch (error) {
      console.error('Error searching files:', error);
      throw error;
    }
  }

  async watchFile(path: string, callback: (event: string, filename: string) => void): Promise<void> {
    try {
      await ipcRenderer.invoke('watch-file', path);
      ipcRenderer.on('file-changed', (_, event, filename) => {
        callback(event, filename);
      });
    } catch (error) {
      console.error('Error watching file:', error);
      throw error;
    }
  }

  async getFileHistory(path: string): Promise<{ content: string; timestamp: Date }[]> {
    try {
      const history = await ipcRenderer.invoke('get-file-history', path);
      return history;
    } catch (error) {
      console.error('Error getting file history:', error);
      throw error;
    }
  }
}

export const fileService = new FileService(); 
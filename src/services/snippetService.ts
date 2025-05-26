interface Snippet {
  id: string;
  name: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

class SnippetService {
  private snippets: Map<string, Snippet> = new Map();

  async createSnippet(snippet: Omit<Snippet, 'id' | 'createdAt' | 'updatedAt'>): Promise<Snippet> {
    const id = Date.now().toString();
    const now = new Date();
    
    const newSnippet: Snippet = {
      ...snippet,
      id,
      createdAt: now,
      updatedAt: now
    };

    this.snippets.set(id, newSnippet);
    return newSnippet;
  }

  async updateSnippet(id: string, updates: Partial<Snippet>): Promise<Snippet> {
    const snippet = this.snippets.get(id);
    if (!snippet) {
      throw new Error('Snippet not found');
    }

    const updatedSnippet: Snippet = {
      ...snippet,
      ...updates,
      updatedAt: new Date()
    };

    this.snippets.set(id, updatedSnippet);
    return updatedSnippet;
  }

  async deleteSnippet(id: string): Promise<void> {
    if (!this.snippets.has(id)) {
      throw new Error('Snippet not found');
    }
    this.snippets.delete(id);
  }

  async getSnippet(id: string): Promise<Snippet> {
    const snippet = this.snippets.get(id);
    if (!snippet) {
      throw new Error('Snippet not found');
    }
    return snippet;
  }

  async getAllSnippets(): Promise<Snippet[]> {
    return Array.from(this.snippets.values());
  }

  async searchSnippets(query: string): Promise<Snippet[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.snippets.values()).filter(snippet => 
      snippet.name.toLowerCase().includes(searchTerm) ||
      snippet.description.toLowerCase().includes(searchTerm) ||
      snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  async getSnippetsByLanguage(language: string): Promise<Snippet[]> {
    return Array.from(this.snippets.values()).filter(
      snippet => snippet.language.toLowerCase() === language.toLowerCase()
    );
  }

  async getSnippetsByTag(tag: string): Promise<Snippet[]> {
    return Array.from(this.snippets.values()).filter(
      snippet => snippet.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
  }

  async exportSnippets(): Promise<string> {
    const snippets = Array.from(this.snippets.values());
    return JSON.stringify(snippets, null, 2);
  }

  async importSnippets(json: string): Promise<void> {
    try {
      const snippets = JSON.parse(json) as Snippet[];
      snippets.forEach(snippet => {
        this.snippets.set(snippet.id, snippet);
      });
    } catch (error) {
      throw new Error('Invalid snippets format');
    }
  }

  // Predefined snippets
  private readonly defaultSnippets: Snippet[] = [
    {
      id: '1',
      name: 'React Component',
      description: 'Basic React functional component with TypeScript',
      code: `import React from 'react';

interface Props {
  // Add your props here
}

const Component: React.FC<Props> = () => {
  return (
    <div>
      {/* Add your JSX here */}
    </div>
  );
};

export default Component;`,
      language: 'typescript',
      tags: ['react', 'typescript', 'component'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'Async Function',
      description: 'Basic async function with error handling',
      code: `async function fetchData() {
  try {
    const response = await fetch('url');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}`,
      language: 'javascript',
      tags: ['async', 'javascript', 'fetch'],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  constructor() {
    // Initialize with default snippets
    this.defaultSnippets.forEach(snippet => {
      this.snippets.set(snippet.id, snippet);
    });
  }
}

export const snippetService = new SnippetService(); 
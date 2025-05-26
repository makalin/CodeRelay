interface CodeMetrics {
  linesOfCode: number;
  commentLines: number;
  blankLines: number;
  complexity: number;
  functions: number;
  classes: number;
  imports: number;
  exports: number;
}

interface CodeIssue {
  type: 'error' | 'warning' | 'info';
  message: string;
  line: number;
  column: number;
}

class CodeAnalysisService {
  analyzeCode(code: string): CodeMetrics {
    const lines = code.split('\n');
    const metrics: CodeMetrics = {
      linesOfCode: 0,
      commentLines: 0,
      blankLines: 0,
      complexity: 0,
      functions: 0,
      classes: 0,
      imports: 0,
      exports: 0
    };

    let inMultiLineComment = false;

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Skip empty lines
      if (!trimmedLine) {
        metrics.blankLines++;
        continue;
      }

      // Check for single-line comments
      if (trimmedLine.startsWith('//')) {
        metrics.commentLines++;
        continue;
      }

      // Check for multi-line comments
      if (trimmedLine.startsWith('/*')) {
        inMultiLineComment = true;
        metrics.commentLines++;
        continue;
      }
      if (trimmedLine.includes('*/')) {
        inMultiLineComment = false;
        metrics.commentLines++;
        continue;
      }
      if (inMultiLineComment) {
        metrics.commentLines++;
        continue;
      }

      // Count code lines
      metrics.linesOfCode++;

      // Count functions
      if (trimmedLine.includes('function') || trimmedLine.match(/=>\s*{/)) {
        metrics.functions++;
      }

      // Count classes
      if (trimmedLine.includes('class ')) {
        metrics.classes++;
      }

      // Count imports
      if (trimmedLine.startsWith('import ')) {
        metrics.imports++;
      }

      // Count exports
      if (trimmedLine.startsWith('export ')) {
        metrics.exports++;
      }

      // Calculate complexity (simplified)
      if (trimmedLine.includes('if') || trimmedLine.includes('for') || 
          trimmedLine.includes('while') || trimmedLine.includes('switch')) {
        metrics.complexity++;
      }
    }

    return metrics;
  }

  findIssues(code: string): CodeIssue[] {
    const issues: CodeIssue[] = [];
    const lines = code.split('\n');

    // Check for common issues
    lines.forEach((line, index) => {
      // Check for long lines
      if (line.length > 100) {
        issues.push({
          type: 'warning',
          message: 'Line is too long (over 100 characters)',
          line: index + 1,
          column: 101
        });
      }

      // Check for console.log statements
      if (line.includes('console.log')) {
        issues.push({
          type: 'warning',
          message: 'Console.log statement found',
          line: index + 1,
          column: line.indexOf('console.log') + 1
        });
      }

      // Check for TODO comments
      if (line.includes('TODO')) {
        issues.push({
          type: 'info',
          message: 'TODO comment found',
          line: index + 1,
          column: line.indexOf('TODO') + 1
        });
      }

      // Check for unused variables (simplified)
      if (line.includes('let ') || line.includes('const ')) {
        const varName = line.split('=')[0].split(' ').pop();
        if (varName && !code.includes(varName, line.length)) {
          issues.push({
            type: 'warning',
            message: `Potentially unused variable: ${varName}`,
            line: index + 1,
            column: line.indexOf(varName) + 1
          });
        }
      }
    });

    return issues;
  }

  suggestImprovements(code: string): string[] {
    const suggestions: string[] = [];
    const metrics = this.analyzeCode(code);
    const issues = this.findIssues(code);

    // Suggest based on metrics
    if (metrics.complexity > 10) {
      suggestions.push('Consider breaking down complex functions into smaller ones');
    }
    if (metrics.functions > 20) {
      suggestions.push('Consider splitting the code into multiple modules');
    }
    if (metrics.commentLines < metrics.linesOfCode * 0.1) {
      suggestions.push('Consider adding more comments to improve code documentation');
    }

    // Suggest based on issues
    const consoleLogs = issues.filter(i => i.message.includes('console.log'));
    if (consoleLogs.length > 0) {
      suggestions.push('Remove console.log statements before production');
    }

    const todos = issues.filter(i => i.message.includes('TODO'));
    if (todos.length > 0) {
      suggestions.push('Address TODO comments');
    }

    return suggestions;
  }

  formatCode(code: string): string {
    // This is a simplified version. In production, you'd want to use a proper formatter
    return code
      .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
      .replace(/\s*{\s*/g, ' { ')  // Format opening braces
      .replace(/\s*}\s*/g, ' } ')  // Format closing braces
      .replace(/\s*;\s*/g, ';\n')  // Add newlines after semicolons
      .replace(/\n\s*\n/g, '\n\n')  // Remove multiple empty lines
      .trim();
  }
}

export const codeAnalysisService = new CodeAnalysisService(); 
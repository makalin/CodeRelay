import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('has code editor panel', () => {
    render(<App />);
    expect(screen.getByTestId('code-editor')).toBeInTheDocument();
  });

  it('has chat panel', () => {
    render(<App />);
    expect(screen.getByTestId('chat-panel')).toBeInTheDocument();
  });

  it('has terminal panel', () => {
    render(<App />);
    expect(screen.getByTestId('terminal-panel')).toBeInTheDocument();
  });
}); 
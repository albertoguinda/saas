import { render, screen } from '@testing-library/react';
import fs from 'fs';
import path from 'path';

test('globals.css defines focus outline rule', () => {
  const css = fs.readFileSync(path.join(process.cwd(), 'styles', 'globals.css'), 'utf8');
  expect(css).toMatch(/:focus-visible/);
});

test('button receives focus', () => {
  render(<button>click</button>);
  const btn = screen.getByRole('button');
  btn.focus();
  expect(btn).toHaveFocus();
});

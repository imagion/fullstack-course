import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders content', () => {
  const blog = {
    title: 'New World',
    author: 'Hellas',
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText('New World Hellas');
  expect(element).toBeDefined();
});

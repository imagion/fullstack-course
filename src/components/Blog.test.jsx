import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import { vi } from 'vitest';

test('renders content', () => {
  const blog = {
    title: 'New World',
    author: 'Hellas',
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText('New World Hellas');
  expect(element).toBeDefined();
});

test('renders hiden content after click', async () => {
  const blog = {
    title: 'Testing React',
    author: 'Arto Hellas',
    url: 'https://example.com',
    likes: 5,
    user: {
      name: 'Arto Hellas',
    },
  };

  const user = userEvent.setup();

  render(<Blog blog={blog} />);

  const button = screen.getByText('view');
  await user.click(button);

  // expect(screen.getByText('https://example.com')).toBeInTheDocument();
  // expect(screen.getByText('likes: 5')).toBeInTheDocument();
  expect(
    screen.getByText((content) => content.includes('https://example.com')),
  ).toBeInTheDocument();
  expect(
    screen.getByText((content) => content.includes('likes: 5')),
  ).toBeInTheDocument();
});

test('like button clicked twice', async () => {
  const blog = {
    title: 'Testing React',
    author: 'Arto Hellas',
    url: 'https://example.com',
    likes: 5,
    user: {
      name: 'Arto Hellas',
    },
  };

  const mockUpdate = vi.fn();
  const blogService = {
    update: mockUpdate,
  };
  const user = userEvent.setup();

  render(<Blog blog={blog} blogService={blogService} />);

  const button = screen.getByText('view');
  await user.click(button);

  const like = screen.getByText('like');
  await user.click(like);
  await user.click(like);

  expect(mockUpdate.mock.calls).toHaveLength(2);
});

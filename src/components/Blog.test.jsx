import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  screen.debug();

  // expect(screen.getByText('https://example.com')).toBeInTheDocument();
  // expect(screen.getByText('likes: 5')).toBeInTheDocument();
  expect(
    screen.getByText((content) => content.includes('https://example.com')),
  ).toBeInTheDocument();
  expect(
    screen.getByText((content) => content.includes('likes: 5')),
  ).toBeInTheDocument();
});

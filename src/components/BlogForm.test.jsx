import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';
import { vi } from 'vitest';

test('check the new blog form', async () => {
  const mockCreate = vi.fn();
  const mockSetNotification = vi.fn();
  const blogService = {
    create: mockCreate,
  };
  const user = userEvent.setup();

  render(
    <BlogForm
      blogService={blogService}
      mockSetNotification={mockSetNotification}
    />,
  );

  const inputTitle = screen.getByLabelText('title:', { selector: 'input' });
  await user.type(inputTitle, 'test title');

  const inputAuthor = screen.getByLabelText('author:', { selector: 'input' });
  await user.type(inputAuthor, 'test author');

  const inputUrl = screen.getByLabelText('url:', { selector: 'input' });
  await user.type(inputUrl, 'test url');

  const button = screen.getByText('create');
  await user.click(button);

  screen.debug();

  console.log(mockCreate.mock.calls);

  expect(mockCreate.mock.calls).toHaveLength(1);
  // expect(mockCreate.mock.calls[0][0].title).toBe('test title');
  // expect(mockCreate.mock.calls[0][0].author).toBe('test author');
  // expect(mockCreate.mock.calls[0][0].url).toBe('test url');
  expect(mockCreate.mock.calls[0][0]).toEqual({
    title: 'test title',
    author: 'test author',
    url: 'test url',
  });
});

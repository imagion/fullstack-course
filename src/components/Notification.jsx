const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }
  return notification && <div className='notification'>{notification}</div>;
};
const Error = ({ error }) => {
  if (error === null) {
    return null;
  }
  return error && <div className='error'>{error}</div>;
};

export { Notification, Error };

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  return notification && <div className='notification'>{notification}</div>;
};

export default Notification;

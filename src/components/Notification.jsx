import { Alert as MuiAlert, Box } from '@mui/material';

const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  return (
    <MuiAlert severity={notification.type} sx={{ mt: 2, mb: 2 }}>
      {notification.text}
    </MuiAlert>
  );
};
const Error = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <MuiAlert severity='error'>{error}</MuiAlert>
    </Box>
  );
};

export { Notification, Error };

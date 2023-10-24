import { Alert, Snackbar } from "@mui/material";

/**
 * 
 * @param {object} param0 
 * @param {object} param0.message 
 * @param {string} param0.message.content 
 * @param {string} param0.message.type 
 * @param {Function} param0.setMessage
 * @returns 
 */
export default function AlertMessage({ message, setMessage, autoHideDuration = 6000 }) {
  const handleCloseMesssage = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage((m) => ({ ...m, content: "" }));
  };
  return (
    <Snackbar
      open={!!message.content}
      autoHideDuration={autoHideDuration}
      onClose={handleCloseMesssage}
    >
      {!!message.content && (
        <Alert
          onClose={handleCloseMesssage}
          severity={message.type}
          sx={{ width: "100%" }}
        >
          {message.content}
        </Alert>
      )}
    </Snackbar>
  );
}

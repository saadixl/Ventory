import { toast } from "react-toastify";

export function showAlert(message, type) {
  let customToast = toast.success;
  if (type === "warning") {
    customToast = toast.warning;
  } else if (type === "error") {
    customToast = toast.error;
  }
  customToast(message, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
}

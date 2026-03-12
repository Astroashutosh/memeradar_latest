// src/components/notifications.tsx
import { toast, ToastContainer } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  pauseOnFocusLoss: true,
};

// Wrapper functions for different toast types
export const notifySuccess = (message: string) => toast.success(message, defaultOptions);
export const notifyInfo = (message: string) => toast.info(message, defaultOptions);
export const notifyError = (message: string) => toast.error(message, defaultOptions);

// Component to place once in App.tsx
export const Notifications = () => <ToastContainer />;
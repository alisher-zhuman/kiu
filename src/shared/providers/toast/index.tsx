"use client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = () => (
  <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
);

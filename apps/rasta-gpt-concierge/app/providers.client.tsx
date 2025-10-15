"use client";
import AuthProvider from "./components/AuthProvider";
// import ToastProvider from "./ToastProvider" // etc.


export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {/* <ToastProvider> */}
        {children} 
      {/* </ToastProvider> */}
    </AuthProvider>
  );
}

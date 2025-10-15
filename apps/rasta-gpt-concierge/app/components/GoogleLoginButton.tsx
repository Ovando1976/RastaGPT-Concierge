"use client";

import { GoogleOAuthProvider, GoogleLogin, type CredentialResponse } from "@react-oauth/google";

export default function GoogleLoginButton() {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
  // You can forward the credential to your backend or Firebase Auth here.
  const handleSuccess = (credentialResponse: CredentialResponse) => {
    // credentialResponse.credential is a JWT (Google ID token)
    // Example: send to API route for verification / session exchange
    // fetch("/api/auth/google", { method: "POST", headers: {"content-type":"application/json"}, body: JSON.stringify(credentialResponse) });
    console.log("Google login success", credentialResponse);
  };

  const handleError = () => {
    console.error("Google login failed");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </GoogleOAuthProvider>
  );
}
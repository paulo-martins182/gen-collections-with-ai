"use client";
import { auth } from "@/configs/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";

function Authentication({ children }: any) {
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  const onButtonPress = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential: any = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        router.push("/app");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <div>
      <div onClick={onButtonPress}>{children}</div>
    </div>
  );
}

export default Authentication;

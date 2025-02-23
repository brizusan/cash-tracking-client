"use client";

import { useState } from "react";
import { FormResetPassword } from "./FormResetPassword";
import { ValidateTokenForm } from "./ValidateTokenForm";

export const PasswordResetHandler = () => {
  const [isValidToken, setIsValidToken] = useState(false);
  const [token, setToken] = useState("");

  return (
    <>
      {isValidToken ? (
        <FormResetPassword token={token} />
      ) : (
        <ValidateTokenForm
          token={token}
          setToken={setToken}
          isValidatedToken={setIsValidToken}
        />
      )}
    </>
  );
};

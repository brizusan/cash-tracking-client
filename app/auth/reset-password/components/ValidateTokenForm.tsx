import { validateResetToken } from "@/src/actions/validate-reset-token";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

type Props = {
  isValidatedToken: Dispatch<SetStateAction<boolean>>;
  token?: string;
  setToken: Dispatch<SetStateAction<string>>;
};

export const ValidateTokenForm = ({
  isValidatedToken,
  token,
  setToken,
}: Props) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const dispatchResetPassword = validateResetToken.bind(null, token!);
  const [state, trigger] = useFormState(dispatchResetPassword, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (isCompleted) {
      // Aquí puedes enviar el token al servidor
      trigger();
    }
  }, [isCompleted]);

  useEffect(() => {
    if (state.errors) {
      toast.error(state.errors[0], {
        onClose: () => {
          setToken("");
          setIsCompleted(false);
        },
      });
    }
  }, [state]);

  useEffect(() => {
    if (state.success) {
      toast.success(state.success, {
        onClose: () => {
          isValidatedToken(true);
        },
      });
    }
  }, [state]);

  const handleChange = (token: string) => {
    setToken(token);
  };

  const handleComplete = () => {
    setIsCompleted(true);
  };

  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput
        value={token}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
      </PinInput>
    </div>
  );
};

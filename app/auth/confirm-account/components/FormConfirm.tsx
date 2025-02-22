"use client";
import { confirmAccount } from "@/src/actions/confirm-account";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

export const FormConfirm = () => {
  const [token, setToken] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();
  const dispatchToken = confirmAccount.bind(null, token);
  const [state, dispatch] = useFormState(dispatchToken, {
    errors: [],
    success: "",
  });

  useEffect(() => {
    if (isComplete) {
      dispatch();
    }
  }, [isComplete]);

  useEffect(() => {
    if (state.errors.length > 0) {
      state.errors.forEach((error) => toast.error(error));
    }
  }, [state]);

  useEffect(() => {
    if (state.success) {
      setToken("");
      setIsComplete(false);
      toast.success(state.success, {
        onClose: () => {
          router.replace("/auth/login");
        },
      });
    }
  }, [state]);

  const handleComplete = () => {
    setIsComplete(true);
  };

  return (
    <div className=" mt-14 space-y-5">
      <div className="flex flex-col gap-2 mb-2">
        <label className="font-bold text-center text-2xl">
          Ingresa el token
        </label>

        <div className="flex gap-2 justify-center max-w-md">
          <PinInput
            value={token}
            onChange={(token: string) => setToken(token)}
            onComplete={handleComplete}
          >
            <PinInputField className="w-10 h-10 border border-gray-200 shadow rounded-lg text-center placeholder-white" />
            <PinInputField className="w-10 h-10 border border-gray-200 shadow rounded-lg text-center placeholder-white" />
            <PinInputField className="w-10 h-10 border border-gray-200 shadow rounded-lg text-center placeholder-white" />
            <PinInputField className="w-10 h-10 border border-gray-200 shadow rounded-lg text-center placeholder-white" />
            <PinInputField className="w-10 h-10 border border-gray-200 shadow rounded-lg text-center placeholder-white" />
            <PinInputField className="w-10 h-10 border border-gray-200 shadow rounded-lg text-center placeholder-white" />
          </PinInput>
        </div>
      </div>
    </div>
  );
};

"use client";

import { Label } from "@radix-ui/react-label";
import { Button } from "./button";
import { Eye, EyeOff } from "lucide-react";
import { useState, forwardRef } from "react";

type FormInputProps = {
  id?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  type?: "text" | "password";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ id, name, placeholder, label, type, value, onChange }: FormInputProps, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <>
        {label && (
          <Label htmlFor={id} className="text-sm font-medium">
            {label}
          </Label>
        )}
        <div className="relative mt-1">
          <div className="flex items-center h-10 rounded-md border outline-none">
            <input
              ref={ref}
              id={id}
              name={name}
              type={!showPassword ? type : "text"}
              placeholder={placeholder}
              value={value}
              onChange={onChange}
              className="flex-1 outline-none bg-transparent h-full px-4"
            />
          </div>
          {type === "password" && (
            <Button
              type="button"
              className="absolute top-0 bottom-0 right-1 flex items-center justify-center h-10 w-10 text-gray-500 bg-transparent hover:bg-transparent p-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </>
    );
  }
);

FormInput.displayName = "FormInput"; // Necessário para evitar warnings com forwardRef

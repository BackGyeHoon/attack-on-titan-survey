import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const baseClasses =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none";
    const variantClasses =
      variant === "default"
        ? "bg-blue-500 text-white hover:bg-blue-600"
        : variant === "outline"
        ? "border border-gray-300 text-gray-700 hover:bg-gray-100"
        : "bg-transparent hover:bg-gray-100";

    const sizeClasses =
      size === "sm" ? "px-2 py-1" : size === "lg" ? "px-4 py-2" : "px-3 py-2";

    return (
      <button
        ref={ref}
        className={cn(baseClasses, variantClasses, sizeClasses, className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };

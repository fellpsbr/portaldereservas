import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "primary" | "secondary" | "ghost" | "whatsapp";
    size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "md", ...props }, ref) => {
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    "disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-gray-900 text-white hover:bg-gray-800": variant === "default",
                        "bg-[#2E8B57] text-white hover:bg-[#267347] shadow-md hover:shadow-lg":
                            variant === "primary",
                        "bg-[#C77C4F] text-white hover:bg-[#B36B42]": variant === "secondary",
                        "bg-transparent hover:bg-gray-100": variant === "ghost",
                        "bg-[#25D366] text-white hover:bg-[#20BA5A] shadow-md hover:shadow-lg hover:scale-105":
                            variant === "whatsapp",
                    },
                    {
                        "h-9 px-3 text-sm": size === "sm",
                        "h-11 px-6 text-base": size === "md",
                        "h-14 px-8 text-lg": size === "lg",
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };

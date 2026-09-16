import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[var(--shadow-glow)] hover:-translate-y-0.5 hover:bg-primary/90",
        secondary:
          "border border-metallic bg-transparent text-foreground hover:bg-foreground/8",
        ghost: "text-foreground hover:bg-foreground/8",
        outline: "border border-metallic bg-transparent text-foreground hover:bg-foreground/8",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "min-h-0 p-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "text-sm",
        sm: "min-h-10 px-4 text-xs",
        icon: "size-12 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return <Component ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        betterme: "bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-base uppercase tracking-wide rounded-full h-14 px-8 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
        emerald: "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-base uppercase tracking-wide rounded-full h-14 px-8 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
        premium: "bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-500 text-white font-bold text-base uppercase tracking-wide rounded-full h-14 px-8 shadow-[0_8px_32px_-8px_hsl(var(--emerald-500)/0.4),_0_4px_16px_-4px_hsl(var(--emerald-500)/0.3)] hover:shadow-[0_12px_40px_-12px_hsl(var(--emerald-500)/0.5),_0_6px_20px_-6px_hsl(var(--emerald-500)/0.4)] transform hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300",
        accent: "bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-base uppercase tracking-wide rounded-full h-14 px-8 shadow-[0_6px_24px_-6px_hsl(var(--primary)/0.3)] hover:shadow-[0_8px_32px_-8px_hsl(var(--primary)/0.4)] transform hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        betterme: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

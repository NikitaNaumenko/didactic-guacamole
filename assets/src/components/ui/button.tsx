import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 ring-teal-950/10 dark:ring-teal-950/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0 dark:ring-teal-300/10 dark:dark:ring-teal-300/20",
  {
    variants: {
      variant: {
        default:
          "bg-teal-900 text-teal-50 shadow-sm hover:bg-teal-900/90 dark:bg-teal-50 dark:text-teal-900 dark:hover:bg-teal-50/90",
        destructive:
          "bg-red-500 text-teal-50 shadow-xs hover:bg-red-500/90 dark:bg-red-900 dark:text-teal-50 dark:hover:bg-red-900/90",
        outline:
          "border border-teal-200 bg-white shadow-xs hover:bg-teal-100 hover:text-teal-900 dark:border-teal-800 dark:bg-teal-950 dark:hover:bg-teal-800 dark:hover:text-teal-50",
        secondary:
          "bg-teal-100 text-teal-900 shadow-xs hover:bg-teal-100/80 dark:bg-teal-800 dark:text-teal-50 dark:hover:bg-teal-800/80",
        ghost:
          "hover:bg-teal-100 hover:text-teal-900 dark:hover:bg-teal-800 dark:hover:text-teal-50",
        link: "text-teal-900 underline-offset-4 hover:underline dark:text-teal-50",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };

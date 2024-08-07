"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

export interface LabelsProps
  extends React.HTMLAttributes<HTMLSpanElement> {}

const Labels = React.forwardRef<
  HTMLSpanElement,
  LabelsProps & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Labels.displayName = "Labels";

export { Labels };

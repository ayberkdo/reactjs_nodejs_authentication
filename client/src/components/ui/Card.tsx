import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export const Card = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white text-gray-950 shadow-sm",
        className
      )}
      {...props}
    />
  );
};

export const CardHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
};

export const CardTitle = ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
};

export const CardDescription = ({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) => {
  return <p className={cn("text-sm text-gray-500", className)} {...props} />;
};

export const CardContent = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
};

export const CardFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
  );
};

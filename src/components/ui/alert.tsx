import React from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive';
  children: React.ReactNode;
}

export function Alert({ variant = 'default', className = '', children, ...props }: AlertProps) {
  const baseClasses = "relative w-full rounded-lg border p-4";
  const variantClasses = {
    default: "bg-background text-foreground border-slate-200",
    destructive: "border-red-500/50 text-red-700 bg-red-50"
  };

  return (
    <div
      role="alert"
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function AlertDescription({
  className = '',
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={`text-sm ${className}`}
      {...props}
    >
      {children}
    </p>
  );
}
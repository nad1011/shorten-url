import PropTypes from "prop-types";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

const Input = forwardRef(
  ({ className, type = "text", error, label, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        {label && (
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </label>
        )}
        <div className="relative">
          {error && (
            <div className="absolute left-0 -bottom-5 text-sm text-destructive">
              {error}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string,
};

export default Input;

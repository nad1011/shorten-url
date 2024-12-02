import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

const Avatar = ({ src, alt, size = "default", className }) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    default: "h-10 w-10",
    lg: "h-12 w-12",
    xl: "h-14 w-14",
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full",
        sizeClasses[size],
        className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-secondary">
          <span className="text-sm font-medium text-secondary-foreground">
            {alt?.charAt(0)?.toUpperCase() || "A"}
          </span>
        </div>
      )}
    </div>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.oneOf(["sm", "default", "lg"]),
  className: PropTypes.string,
};

export default Avatar;

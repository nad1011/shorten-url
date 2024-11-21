import * as Icons from "lucide-react";
import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

const Icon = ({ name, className, size = 24, ...props }) => {
  const LucideIcon = Icons[name];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <LucideIcon className={cn("", className)} size={size} {...props} />;
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.number,
};

export default Icon;

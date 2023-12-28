import { icons } from "lucide-react";

import PropTypes from "prop-types";

const Icon = ({ name, color, size, strokeWidth }) => {
  const LucideIcon = icons[name];

  return <LucideIcon color={color} size={size} strokeWidth={strokeWidth} />;
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
};

export default Icon;

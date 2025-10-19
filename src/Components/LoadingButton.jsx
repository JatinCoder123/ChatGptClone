import React from "react";

import { Helix } from "ldrs/react";
import "ldrs/react/Helix.css";

// Default values shown
const LoadingButton = () => {
  return (
    <div>
      <Helix size="35" speed="2.5" color="green" />
    </div>
  );
};

export default LoadingButton;

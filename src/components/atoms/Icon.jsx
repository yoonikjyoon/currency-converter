import React from "react";
import styled from "styled-components";
import { getIconProps } from "../../constants/icon";

const Icon = (key) => {
  const iconName = Object.values(key)[0];
  return <IconImg {...getIconProps(iconName)} />;
};
export default Icon;
const IconImg = styled.img``;

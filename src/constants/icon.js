export const ICON_LIST = {
  icon_fold: {
    src: require("../assets/images/icon_fold.png"),
    width: 18,
    height: 18,
  },
  icon_unfold: {
    src: require("../assets/images/icon_unfold.png"),
    width: 18,
    height: 18,
  },
};

export const getIconProps = (iconName) => {
  const icon = ICON_LIST[iconName];
  return {
    src: icon.src,
    style: { width: icon.width, height: icon.height },
  };
};

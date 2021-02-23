import './style.css';

import React, { useState } from 'react';

type onClickType =
  | ((event: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => void)
  | undefined;

interface BadgeProps {
  text?: string;
  color?: string;
  bgColor?: string;
  pressedText?: string;
  pressedColor?: string;
  pressedBgColor?: string;
  onClick?: onClickType;
}

const Badge: React.FC<BadgeProps> = ({
  text = "Default",
  color = "#fff",
  bgColor = "#333",
  pressedText = "Pressed",
  pressedColor = "#fff",
  pressedBgColor = "#43D200",
  onClick,
}) => {
  const [isPressed, setisPressed] = useState(false);

  const handleOnClick = (event: any) => {
    if (onClick) onClick(event);

    if (pressedText) {
      const timeout = 1000;
      setisPressed(true);
      setTimeout(() => {
        setisPressed(false);
      }, timeout);
    }
  };

  return (
    <span
      className="badge"
      onClick={handleOnClick}
      style={{
        color: isPressed ? pressedColor : color,
        backgroundColor: isPressed ? pressedBgColor : bgColor,
      }}
    >
      {isPressed ? pressedText : text}
    </span>
  );
};

export default Badge;

import { useState } from "react";
import "./dropdown.css";

export default function Dropdown({
  options,
  currentOption,
  onChange,
  color,
  fontSize,
  optionColor,
  optionFontSize,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const handleSelect = (e, option, index) => {
    e.stopPropagation();
    onChange(option);
    setSelectedIndex(index);
    setOpen(false);
  };

  const currentOptionStyle = {
    color,
    fontSize,
  };

  const optionStyle = {
    color: optionColor,
    fontSize: optionFontSize,
  };

  return (
    <div
      className="dropdown"
      tabIndex={0}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((prev) => !prev)}
    >
      <div style={currentOptionStyle} className="current-option">
        <span>
          {currentOption?.name
            ? currentOption.name
            : currentOption?.value
            ? currentOption.value
            : currentOption}
        </span>
        <div className={open ? "arrow active" : "arrow"}></div>
      </div>
      <div className={open ? "options active" : "options"}>
        {options.map((option, index) => (
          <div
            onClick={(e) => handleSelect(e, option, index)}
            key={index}
            className={selectedIndex == index ? "option selected" : "option"}
            style={optionStyle}
          >
            <>{option?.icon && option.icon}</>
            <span>
              {option?.name
                ? option.name
                : option?.value
                ? option.value
                : option}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

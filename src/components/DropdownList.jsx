import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../constants/colors";
import Icon from "./atoms/Icon";

export default function DropdownList({
  defaultLabel,
  selectedValue,
  list,
  onClick,
}) {
  const [isActive, setIsActive] = useState(false);

  const onSelected = (value, text) => {
    onClick(value, text);
    setIsActive(false);
  };
  const handleActive = (active) => {
    setIsActive(active);
  };
  return (
    <StyledDropdownContainer>
      <StyledDropdownButton onClick={() => handleActive(!isActive)}>
        {defaultLabel}
        <Icon iconName={isActive ? "icon_fold" : "icon_unfold"} />
      </StyledDropdownButton>
      {isActive && (
        <StyledModalView>
          {list.map((item) => {
            return (
              <StyledSelect
                key={item.code}
                onClick={() => onSelected(item.code, item.description)}
              >
                <StyledSelectText
                  style={{
                    color:
                      selectedValue === item.code
                        ? colors.coolGray
                        : colors.dark,
                  }}
                >
                  {item.description}
                  {/* {`${item.description}(${
                    item.description.lastIndexOf(" ") > 0 &&
                    item.description.substr(item.description.lastIndexOf(" "))
                  })`} */}
                </StyledSelectText>
              </StyledSelect>
            );
          })}
        </StyledModalView>
      )}
    </StyledDropdownContainer>
  );
}
const StyledDropdownContainer = styled.div`
  width: 100%;
  position: relative;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: ${colors.paleGray02};
`;
const StyledDropdownButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2rem;
  padding: 0px 10px;
`;
const StyledModalView = styled.div`
  width: calc(100% + 2px);
  height: 23vh;
  overflow: scroll;
  position: absolute;
  z-index: 100;
  border: 1px solid ${colors.coolGray};
  background-color: ${colors.white};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  left: -1px;
`;
const StyledSelect = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 8px;
  :hover {
    background-color: ${colors.paleGray01};
  }
`;
const StyledSelectText = styled.p`
  cursor: pointer;
  padding: 3px;
`;

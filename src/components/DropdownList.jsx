import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../constants/colors";
import Icon from "./atoms/Icon";
import { useQuery } from "@tanstack/react-query";
import { useApiContext } from "../context/ApiContext";

export default function DropdownList({ queryKey, defaultLabel }) {
  const [isActive, setIsActive] = useState(false);
  const { currency, value, setSymbol } = useApiContext();
  const { data: symbols } = useQuery(["symbols"], () => currency.getSymbols());

  const onSelected = (code, description) => {
    setSymbol(queryKey, code, description);
    setIsActive(false);
  };
  const handleActive = (active) => {
    setIsActive(active);
  };
  return (
    <>
      {symbols && (
        <StyledDropdownContainer>
          <StyledDropdownButton onClick={() => handleActive(!isActive)}>
            {defaultLabel}
            <Icon iconName={isActive ? "icon_fold" : "icon_unfold"} />
          </StyledDropdownButton>
          {isActive && (
            <StyledModalView>
              {symbols.map((item) => {
                return (
                  <StyledSelect
                    key={item.code}
                    selected={
                      (queryKey === "from"
                        ? value.from.code
                        : value.to.code) === item.code
                    }
                    onClick={() => onSelected(item.code, item.description)}
                  >
                    <StyledSelectText>
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
      )}
    </>
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
  background-color: ${(props) => (props.selected ? colors.paleGray03 : "")};
  :hover {
    background-color: ${(props) => (!props.selected ? colors.paleGray01 : "")};
  }
`;
const StyledSelectText = styled.p`
  cursor: pointer;
  padding: 3px;
`;

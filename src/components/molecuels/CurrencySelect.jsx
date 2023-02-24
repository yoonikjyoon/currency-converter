import React, { useEffect } from "react";
import styled from "styled-components";
import DropdownList from "./DropdownList";
import { onlyNumber } from "../../utils/number";
import { colors } from "../../constants/colors";
import { useApiContext } from "../../context/ApiContext";
import useDebounce from "../../hooks/useDebounce";

export default function CurrencySelect({ queryKey }) {
  const { currency, value, setAmount } = useApiContext();
  const title = queryKey.charAt(0).toUpperCase() + queryKey.slice(1);
  const debouncedNumber = useDebounce(
    queryKey === "from" ? value.from.amount : value.to.amount,
    100
  );
  useEffect(() => {
    if (queryKey === "from") {
      currency
        .getCurrency(value.from.code, value.to.code, value.from.amount)
        .then((res) => setAmount("to", res.result));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNumber, value.from.code, value.to.code]);

  return (
    <div>
      <p>{title}</p>
      <StyledSelectWrap>
        <DropdownList
          queryKey={queryKey}
          defaultLabel={
            queryKey === "from" ? value.from.description : value.to.description
          }
        />
        <StyledInputWrap>
          <StyledInput
            type="text"
            value={
              queryKey === "from" ? value.from.amount : value.to.amount || 0
            }
            maxLength={15}
            onChange={(e) => setAmount(queryKey, onlyNumber(e.target.value))}
            autoFocus={queryKey === "from"}
            disabled={queryKey === "to"}
          />
          <p>{queryKey === "from" ? value.from.code : value.to.code}</p>
        </StyledInputWrap>
      </StyledSelectWrap>
    </div>
  );
}
const StyledSelectWrap = styled.div`
  width: 100%;
  border: 1px solid ${colors.coolGray};
  border-radius: 5px;
  margin-top: 5px;
`;
const StyledInputWrap = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0px 10px;
  font-size: var(--font-base);
  & > p {
    color: gray;
  }
`;
const StyledInput = styled.input`
  width: 100%;
  text-align: end;
  margin-right: 3px;
  font-size: var(--font-base);
`;

import React, { useEffect } from "react";
import styled from "styled-components";
import DropdownList from "./DropdownList";
import { onlyNumber } from "../utils/number";
import { colors } from "../constants/colors";
import { useApiContext } from "../context/ApiContext";
import useDebounce from "../hooks/useDebounce";

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
    // if (queryKey === "to") {
    //   currency
    //     .getCurrency(value.to.code, value.from.code, value.to.amount)
    //     .then((res) => setAmount("from", res.result));
    // }
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
        <StyledInput
          type="text"
          value={queryKey === "from" ? value.from.amount : value.to.amount || 0}
          maxLength={15}
          onChange={(e) => setAmount(queryKey, onlyNumber(e.target.value))}
        />
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
const StyledInput = styled.input`
  width: inherit;
  height: 2rem;
  padding: 0px 10px;
`;

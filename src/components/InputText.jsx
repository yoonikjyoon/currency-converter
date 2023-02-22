import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getSymbols, getCurrency } from "../api/api";
import DropdownList from "./DropdownList";
import useDebounce from "../hooks/useDebounce";
import { onlyNumber } from "../utils/number";
import { colors } from "../constants/colors";

export default function InputText() {
  const { data: symbols } = useQuery(["symbols"], getSymbols);
  const [fromValue, setFromValue] = useState({
    code: "USD",
    description: "United States",
    amount: 1,
  });
  const [toValue, setToValue] = useState({
    code: "KRW",
    description: "South Korean",
    amount: null,
  });
  const debouncedNumber = useDebounce(fromValue.amount, 500);

  useEffect(() => {
    getCurrency(fromValue.code, toValue.code, fromValue.amount).then((res) => {
      setToValue({ ...toValue, amount: res.result });
      console.log(res);
    });
  }, [debouncedNumber, fromValue.code, toValue.code]);
  return (
    <>
      <Container>
        {symbols && (
          <>
            <StyledWrap>
              <p>From</p>
              <StyledSelectWrap>
                <DropdownList
                  defaultLabel={fromValue.description}
                  selectedValue={fromValue.code}
                  list={symbols}
                  onClick={(code, description) =>
                    setFromValue({
                      ...fromValue,
                      code: code,
                      description: description,
                    })
                  }
                />
                <StyledInput
                  type="text"
                  value={fromValue.amount || 1}
                  maxLength={15}
                  onChange={(e) => {
                    setFromValue({
                      ...fromValue,
                      amount: onlyNumber(e.target.value),
                    });
                  }}
                />
              </StyledSelectWrap>
            </StyledWrap>
            <StyledWrap>
              <p>To</p>
              <StyledSelectWrap>
                <DropdownList
                  defaultLabel={toValue.description}
                  selectedValue={toValue.code}
                  list={symbols}
                  onClick={(code, description) =>
                    setToValue({
                      ...toValue,
                      code: code,
                      description: description,
                    })
                  }
                />
                <StyledInput
                  type="text"
                  value={toValue.amount || 0}
                  maxLength={15}
                  onChange={(e) =>
                    setToValue({
                      ...toValue,
                      amount: onlyNumber(e.target.value),
                    })
                  }
                />
              </StyledSelectWrap>
            </StyledWrap>
          </>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  /* grid-auto-rows: minmax(133px, auto); */
  grid-template-rows: 1fr 1fr;
  grid-gap: 2rem;
`;
const StyledWrap = styled.div``;
const StyledSelectWrap = styled.div`
  width: 100%;
  border: 1px solid ${colors.coolGray};
  border-radius: 5px;
`;
const StyledInput = styled.input`
  width: inherit;
  height: 2rem;
  padding: 0px 10px;
`;

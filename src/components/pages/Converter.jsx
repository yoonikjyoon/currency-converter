import React from "react";
import styled from "styled-components";
import { colors } from "../../constants/colors";
import CurrencySelect from "../molecuels/CurrencySelect";

export default function Converter() {
  return (
    <>
      <Container>
        <StyledHeader> Foreign Exchange Rate</StyledHeader>
        <CurrencySelect queryKey="from" />
        <CurrencySelect queryKey="to" />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr 2fr;
  grid-gap: 1.5rem;
`;
const StyledHeader = styled.div`
  border-bottom: 2px solid ${colors.lightLavender};
  font-size: var(--font-large);
  font-weight: bold;
  color: ${colors.lavender};
  text-align: center;
`;

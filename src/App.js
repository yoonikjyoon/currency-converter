import Converter from "./components/pages/Converter";
import styled from "styled-components";
import { colors } from "./constants/colors";

function App() {
  return (
    <Container>
      <MainWrap>
        <Converter />
      </MainWrap>
    </Container>
  );
}

export default App;

const Container = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  background-color: ${colors.lavender};
`;
const MainWrap = styled.div`
  position: absolute;
  background-color: ${colors.white};
  width: 80vw;
  height: 50vh;
  max-width: 420px;
  min-width: 320px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  padding: 30px;
`;

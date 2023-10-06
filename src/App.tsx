import styled from "styled-components";
import { MainCanvas } from "./components/MainCanvas";
import { RecoilRoot } from "recoil";
import { FixedDOM } from "./components/dom/FixedDOM";

function App() {
  // gasp scrollTrigger를 사용하도록 설정
  return (
    <RecoilRoot>
      <Wrapper id="wrapper">
        <MainCanvas />
        <FixedDOM />
      </Wrapper>
    </RecoilRoot>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export default App;

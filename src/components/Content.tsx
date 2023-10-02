import styled from "styled-components";
import { MainCanvas } from "./MainCanvas";
import { useRecoilValue } from "recoil";
import { IsEnteredAtom } from "../stores";

export const Content = () => {
  const isEntered = useRecoilValue(IsEnteredAtom);
  return (
    <Wrapper id=".wrapper" isEntered={isEntered}>
      <MainCanvas />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isEntered: boolean }>`
  width: 100vw;
  height: ${(props) => (props.isEntered ? "1000vh" : "100vh")};
  overflow: hidden;
  canvas {
    position: fixed;
    top: 0;
    left: 0;
  }
`;

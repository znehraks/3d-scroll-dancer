import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import styled from "styled-components";

export const SrcollBackArticles = () => {
  const scroll = useScroll();
  const [opacityFirst, setOpacityFirst] = useState(0);
  const [opacitySecond, setOpacitySecond] = useState(0);
  const [opacityThird, setOpacityThird] = useState(0);
  const [opacityForuth, setOpacityForuth] = useState(0);
  const [opacityFifth, setOpacityFifth] = useState(0);

  useFrame(() => {
    setOpacityFirst(1 - scroll.range(0, 1 / 5));
    setOpacitySecond(scroll.curve(1 / 5, 1 / 5));
    setOpacityThird(scroll.curve(2 / 5, 1 / 5));
    setOpacityForuth(scroll.curve(3 / 5, 1 / 5));
    setOpacityFifth(scroll.range(4 / 5, 1 / 5));
  });

  return (
    <Scroll html>
      <ArticleWrapper opacity={opacityFirst}>크크 크크1</ArticleWrapper>
      <ArticleWrapper opacity={opacitySecond}>크크 크크2</ArticleWrapper>
      <ArticleWrapper opacity={opacityThird}>크크 크크3</ArticleWrapper>
      <ArticleWrapper opacity={opacityForuth}>크크 크크4</ArticleWrapper>
      <ArticleWrapper opacity={opacityFifth}>크크 크크5</ArticleWrapper>
    </Scroll>
  );
};

const ArticleWrapper = styled.div<{ opacity: number }>`
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  color: #000000;
  opacity: ${(props) => props.opacity};
`;

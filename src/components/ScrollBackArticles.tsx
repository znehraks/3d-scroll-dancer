import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IsEnteredAtom } from "../stores";

export const SrcollBackArticles = () => {
  const isEntered = useRecoilValue(IsEnteredAtom);
  const scroll = useScroll();
  const article01Ref = useRef<HTMLDivElement>(null);
  const article02Ref = useRef<HTMLDivElement>(null);
  const article03Ref = useRef<HTMLDivElement>(null);
  const article04Ref = useRef<HTMLDivElement>(null);
  const article05Ref = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (
      !isEntered ||
      !article01Ref.current ||
      !article02Ref.current ||
      !article03Ref.current ||
      !article04Ref.current ||
      !article05Ref.current
    )
      return;
    // setOpacity1(scroll.range(0, 1 / 5));
    // setOpacity2(scroll.curve(1 / 5, 1 / 5));
    // setOpacity3(scroll.curve(2 / 5, 1 / 5));
    // setOpacity4(scroll.curve(3 / 5, 1 / 5));
    // setOpacity5(scroll.range(4 / 5, 1 / 5));
    article01Ref.current.style.opacity = `${1 - scroll.range(0, 1 / 5)}`;
    article02Ref.current.style.opacity = `${scroll.curve(1 / 5, 1 / 5)}`;
    article03Ref.current.style.opacity = `${scroll.curve(2 / 5, 1 / 5)}`;
    article04Ref.current.style.opacity = `${scroll.curve(3 / 5, 1 / 5)}`;
    article05Ref.current.style.opacity = `${scroll.range(4 / 5, 1 / 5)}`;
  });

  return (
    <Scroll html>
      <ArticleWrapper className="left" ref={article01Ref}>
        크크 크크1
      </ArticleWrapper>
      <ArticleWrapper className="right" ref={article02Ref}>
        크크 크크2
      </ArticleWrapper>
      <ArticleWrapper className="left" ref={article03Ref}>
        크크 크크3
      </ArticleWrapper>
      <ArticleWrapper className="right" ref={article04Ref}>
        크크 크크4
      </ArticleWrapper>
      <ArticleWrapper ref={article05Ref}>크크 크크5</ArticleWrapper>
    </Scroll>
  );
};

const ArticleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  color: #ffffff;
  opacity: 0;
  font-size: 24px;
  &.left {
    justify-content: flex-start;
  }
  &.right {
    justify-content: flex-end;
  }
`;

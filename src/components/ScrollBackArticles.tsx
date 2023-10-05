import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IsEnteredAtom } from "../stores";

export const SrcollBackArticles = () => {
  const isEntered = useRecoilValue(IsEnteredAtom);
  const fixed = document.getElementById("fixed");
  const scroll = useScroll();
  const article01Ref = useRef<HTMLDivElement>(null);
  const article02Ref = useRef<HTMLDivElement>(null);
  const article03Ref = useRef<HTMLDivElement>(null);
  const article04Ref = useRef<HTMLDivElement>(null);
  const article05Ref = useRef<HTMLDivElement>(null);
  const article06Ref = useRef<HTMLDivElement>(null);
  const article07Ref = useRef<HTMLDivElement>(null);
  const article08Ref = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (
      !isEntered ||
      !fixed ||
      !article01Ref.current ||
      !article02Ref.current ||
      !article03Ref.current ||
      !article04Ref.current ||
      !article05Ref.current ||
      !article06Ref.current ||
      !article07Ref.current ||
      !article08Ref.current
    )
      return;

    // setOpacity1(scroll.range(0, 1 / 5));
    // setOpacity2(scroll.curve(1 / 5, 1 / 5));
    // setOpacity3(scroll.curve(2 / 5, 1 / 5));
    // setOpacity4(scroll.curve(3 / 5, 1 / 5));
    // setOpacity5(scroll.range(4 / 5, 1 / 5));
    article01Ref.current.style.opacity = `${1 - scroll.range(0, 1 / 8)}`;
    article02Ref.current.style.opacity = `${1 - scroll.range(1 / 8, 1 / 8)}`;
    article03Ref.current.style.opacity = `${scroll.curve(2 / 8, 1 / 8)}`;
    article04Ref.current.style.opacity = `${scroll.curve(3 / 8, 1 / 8)}`;
    article05Ref.current.style.opacity = `${scroll.curve(4 / 8, 1 / 8)}`;

    if (scroll.visible(4 / 8, 3 / 8)) {
      fixed.style.display = "flex";
      fixed.style.opacity = `${scroll.curve(4 / 8, 3 / 8)}`;
    } else {
      fixed.style.display = "none";
    }
    article08Ref.current.style.opacity = `${scroll.range(7 / 8, 1 / 8)}`;
  });
  if (!isEntered) return null;
  return (
    <Scroll html>
      <ArticleWrapper ref={article01Ref}>
        <LeftBox>
          <span>FastCampus InteracTive Web Lecture</span>
          <span>FastCampus iNteracTive Web Lecture</span>
          <span>FastCampus inTeracTive Web Lecture</span>
          <span>FastCampus iNtEracTive Web Lecture</span>
          <span>FastCampus iNteRacTive Web Lecture</span>
        </LeftBox>
      </ArticleWrapper>
      <ArticleWrapper ref={article02Ref}>
        <RightBox>
          <span>FastCampus InteracTive Web Lecture</span>
          <span>FastCampus iNteracTive Web Lecture</span>
          <span>FastCampus inTeracTive Web Lecture</span>
          <span>FastCampus iNtEracTive Web Lecture</span>
          <span>FastCampus iNteRacTive Web Lecture</span>
        </RightBox>
      </ArticleWrapper>
      <ArticleWrapper ref={article03Ref}>Over the Head</ArticleWrapper>
      <ArticleWrapper ref={article04Ref}>
        <RightBox className="fixed">
          <span>FastCampus InteracTive Web Lecture</span>
          <span>FastCampus iNteracTive Web Lecture</span>
          <span>FastCampus inTeracTive Web Lecture</span>
          <span>FastCampus iNtEracTive Web Lecture</span>
          <span>FastCampus iNteRacTive Web Lecture</span>
          4번
        </RightBox>
      </ArticleWrapper>
      <ArticleWrapper ref={article05Ref}>크크 크크5</ArticleWrapper>
      <ArticleWrapper ref={article06Ref}>크크 크크6</ArticleWrapper>
      <ArticleWrapper ref={article07Ref}>크크 크크7</ArticleWrapper>
      <ArticleWrapper ref={article08Ref}>크크 크크8</ArticleWrapper>
    </Scroll>
  );
};

const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  width: 100vw;
  height: 100vh;

  background-color: transparent;
  color: #ffffff;
  font-size: 24px;
  padding: 40px;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  min-width: fit-content;
  height: 400px;
  & > span:nth-of-type(1) {
    font-size: 32px;
  }
  & > span:nth-of-type(2) {
    font-size: 48px;
  }
  & > span:nth-of-type(3) {
    font-size: 16px;
  }
  & > span:nth-of-type(4) {
    font-size: 24px;
  }
  & > span:nth-of-type(5) {
    font-size: 28px;
  }
`;

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  min-width: fit-content;
  height: 400px;
  & > span:nth-of-type(1) {
    font-size: 32px;
    font-weight: 400;
  }
  & > span:nth-of-type(2) {
    font-size: 32px;
    font-weight: 500;
  }
  & > span:nth-of-type(3) {
    font-size: 32px;
    font-weight: 600;
  }
  & > span:nth-of-type(4) {
    font-size: 32px;
    font-weight: 700;
  }
  & > span:nth-of-type(5) {
    font-size: 32px;
    font-weight: 800;
  }
`;

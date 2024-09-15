import { Html } from '@react-three/drei';
import { useSetRecoilState } from 'recoil';
import styled, { keyframes } from 'styled-components';
import { IsEnteredAtom } from '../stores';
import { useEffect, useState } from 'react';

export const Loader = () => {
  const setIsEntered = useSetRecoilState(IsEnteredAtom);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <Html center>
      <BlurredBackground />
      <Container>
        <ProgressBar>{Math.round(progress)}%</ProgressBar>
        {progress === 100 && (
          <EnterBtn
            onClick={() => {
              setIsEntered(true);
            }}
          >
            Enter
          </EnterBtn>
        )}
      </Container>
    </Html>
  );
};

// ... (스타일 컴포넌트들은 그대로 유지)
const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const BlurredBackground = styled.div`
  width: 400px;
  height: 400px;
  background-color: red;
  border-radius: 50%;
  filter: blur(300px);
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;
const ProgressBar = styled.div`
  font-size: 24px;
  color: #ccc;
`;

const EnterBtn = styled.button`
  animation: ${blink} 1.5s infinite;
  transition-duration: 0.4s;
  font-size: 16px;
  outline: none;
  border: 0.5px solid #999;
  padding: 8px 18px;
  background-color: transparent;
  color: #ccc;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #ccc;
    color: #dc4f00;
  }
`;

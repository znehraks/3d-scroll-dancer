import { Canvas } from '@react-three/fiber';
import { Color } from 'three';
import { Suspense } from 'react';
import { Loader } from './Loader';
import { ScrollControls, useGLTF } from '@react-three/drei';
import { useRecoilValue } from 'recoil';
import { IsEnteredAtom } from '../stores';
import { Dancer } from './Dancer';
import { MovingDOM } from './dom/MovingDOM';

export const MainCanvas = () => {
  const isEntered = useRecoilValue(IsEnteredAtom);
  const aspectRatio = window.innerWidth / window.innerHeight;
  return (
    <Canvas
      id="canvas"
      gl={{ antialias: true }}
      shadows="soft"
      camera={{
        fov: 30,
        aspect: aspectRatio,
        near: 0.01,
        far: 1000,
        position: [0, 6, 12],
      }}
      scene={{ background: new Color(0x000000) }}
    >
      <Suspense fallback={<Loader />}>
        <GLTFLoader />
        {isEntered ? (
          <ScrollControls pages={8} damping={0.25}>
            <MovingDOM />
            <Dancer />
          </ScrollControls>
        ) : (
          <Loader />
        )}
      </Suspense>
    </Canvas>
  );
};

const GLTFLoader = () => {
  useGLTF('/models/dancer.glb');
  return null;
};

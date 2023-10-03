import { Canvas } from "@react-three/fiber";
import { Color } from "three";
import { Suspense } from "react";
import { Loader } from "./Loader";
import { ScrollControls } from "@react-three/drei";
import { useRecoilValue } from "recoil";
import { IsEnteredAtom } from "../stores";
import { Dancer } from "./Dancer";
import { SrcollBackArticles } from "./ScrollBackArticles";

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
      <ambientLight intensity={5} />
      <spotLight intensity={2} />
      <ScrollControls pages={isEntered ? 5 : 0} damping={0.25}>
        <Suspense fallback={<Loader />}>
          <SrcollBackArticles />
          <Dancer />
        </Suspense>
      </ScrollControls>
    </Canvas>
  );
};

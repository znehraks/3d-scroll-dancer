import { Canvas } from "@react-three/fiber";
import { Color } from "three";
import { CanvasObjects } from "./canvasObjects";
import { Suspense } from "react";
import { Loader } from "./Loader";

export const MainCanvas = () => {
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
        <CanvasObjects />
      </Suspense>
    </Canvas>
  );
};

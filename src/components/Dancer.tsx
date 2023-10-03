import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import * as THREE from "three";
import { IsEnteredAtom } from "../stores";
import { Loader } from "./Loader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// breakdance01
// breakdanceFootworkToIdle
// breakdancingEnd
// hiphop01
// hiphop02
// twerk
// uprock
// wave
// windmill
let timeline: GSAPTimeline;
const currentAnimation = "wave";
gsap.registerPlugin(ScrollTrigger);
export const Dancer = () => {
  const isEntered = useRecoilValue(IsEnteredAtom);
  const three = useThree();
  const scroll = useScroll();
  const { scene, animations } = useGLTF("/models/dancer.glb");
  const dancerRef = useRef<THREE.Mesh>(null);
  const { actions } = useAnimations(animations, dancerRef);
  console.log(actions);

  useFrame(() => {
    if (!isEntered) return;
    timeline.seek(scroll.offset * timeline.duration());
  });

  useEffect(() => {
    if (!isEntered) return;
    actions[currentAnimation]?.play();
    three.camera.lookAt(1, 2, 0);
    three.scene.background = new THREE.Color("#DC4F00");
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [actions, isEntered, scene, three.camera, three.scene]);

  useEffect(() => {
    if (!isEntered) return;
    if (!dancerRef.current) return;
    timeline = gsap.timeline();
    gsap.fromTo(
      three.camera.position,
      {
        x: -5,
        y: 5,
        z: 5,
      },
      {
        duration: 2,
        x: 0,
        y: 6,
        z: 12,
      }
    );
    gsap.fromTo(
      three.camera.rotation,
      {
        z: Math.PI,
      },
      {
        duration: 2,
        z: 0,
      }
    );

    timeline.to(dancerRef.current.rotation, {
      y: Math.PI * 2,
    });
  }, [isEntered, three.camera, three.camera.position]);

  if (isEntered)
    return <primitive ref={dancerRef} object={scene} scale={0.05} />;
  return <Loader />;
};

useGLTF.preload("/models/dancer.glb");

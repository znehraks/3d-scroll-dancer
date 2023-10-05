import {
  Box,
  Circle,
  Points,
  useAnimations,
  useGLTF,
  useScroll,
  useTexture,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
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
const params = {
  sceneColor: "#DC4F00",
  // currentAnimation: "wave",
};
gsap.registerPlugin(ScrollTrigger);
export const Dancer = () => {
  const isEntered = useRecoilValue(IsEnteredAtom);
  const three = useThree();
  const scroll = useScroll();
  const [currentAnimation, setCurrentAnimation] = useState("wave");
  const [rotateFinished, setRotateFinished] = useState(false);
  const { scene, animations } = useGLTF("/models/dancer.glb");
  const texture = useTexture("/textures/5.png");
  const dancerRef = useRef<THREE.Mesh>(null);
  const boxRef = useRef<THREE.Mesh>(null);
  const rectAreaLightRef = useRef<THREE.RectAreaLight>(null);
  const hemisphereLightRef = useRef<THREE.HemisphereLight>(null);
  const { actions } = useAnimations(animations, dancerRef);
  console.log(actions);

  useFrame(() => {
    if (!isEntered) return;
    if (!boxRef.current) return;
    timeline.seek(scroll.offset * timeline.duration());
    three.scene.background = new THREE.Color(params.sceneColor);
    (boxRef.current.material as THREE.MeshStandardMaterial).color =
      new THREE.Color(params.sceneColor);

    // if (scroll.offset * timeline.duration() >= 10) {
    if (rotateFinished) {
      setCurrentAnimation("breakdancingEnd");
    } else {
      setCurrentAnimation("wave");
    }
  });

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let timeout: any;
    if (currentAnimation === "wave") {
      actions[currentAnimation]?.reset().fadeIn(0.5).play();
    } else {
      actions[currentAnimation]
        ?.reset()
        .fadeIn(0.5)
        .play()
        .setLoop(THREE.LoopOnce, 1);

      timeout = setTimeout(() => {
        if (actions[currentAnimation]) {
          actions[currentAnimation]!.paused = true;
        }
      }, 8000);
    }
    return () => {
      clearTimeout(timeout);
      actions[currentAnimation]?.reset().fadeOut(0.5).stop();
    };
  }, [actions, currentAnimation, scroll.offset]);

  useEffect(() => {
    if (!isEntered) return;
    three.camera.lookAt(1, 2, 0);
    actions["wave"]?.play();
    three.scene.background = new THREE.Color(params.sceneColor);
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
    gsap.fromTo(
      three.camera.position,
      {
        x: -5,
        y: 5,
        z: 5,
      },
      {
        duration: 2.5,
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
        duration: 2.5,
        z: 0,
      }
    );

    // scene에 그대로 색 변경할 경우
    gsap.fromTo(
      params,
      { sceneColor: "#0C0400" },
      {
        duration: 2.5,
        sceneColor: "#DC4F00",
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEntered]);

  useEffect(() => {
    if (!dancerRef.current) return;
    const pivot = new THREE.Group();
    pivot.position.copy(dancerRef.current.position);
    pivot.add(three.camera);
    three.scene.add(pivot);
    timeline = gsap.timeline();
    timeline
      .from(
        dancerRef.current.rotation,
        {
          duration: 4,
          y: Math.PI,
        },
        0.5
      )
      .from(
        dancerRef.current.position,
        {
          duration: 4,
          x: 3,
        },
        "<"
      )
      .to(
        three.camera.position,
        {
          duration: 10,
          x: 2,
          z: 8,
        },
        "<"
      )
      .to(
        params,
        {
          duration: 10,
          sceneColor: "#0C0400",
        },

        "<"
      )
      .to(pivot.rotation, {
        duration: 10,
        y: Math.PI,
      })
      .to(
        three.camera.position,
        {
          duration: 10,
          x: -4,
          z: 12,
        },
        "<"
      )
      .to(three.camera.position, {
        duration: 10,
        x: 0,
        z: 6,
      })
      .to(three.camera.position, {
        duration: 10,
        x: 0,
        z: 16,
        onUpdate: () => {
          setRotateFinished(false);
        },
      })
      .to(hemisphereLightRef.current, {
        duration: 5,
        intensity: 30,
      })
      .to(
        pivot.rotation,
        {
          duration: 15,
          y: Math.PI * 4,
          onUpdate: () => {
            setRotateFinished(true);
          },
        },
        "<"
      )
      .to(
        params,
        {
          duration: 15,
          sceneColor: "#DC4F00",
        },
        "<"
      );

    return () => {
      three.scene.remove(pivot);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEntered]);

  const { positions } = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 25;
      // colors[i] = Math.random();
    }
    return { positions };
  }, []);

  if (isEntered)
    return (
      <>
        <ambientLight intensity={2} />
        <rectAreaLight
          ref={rectAreaLightRef}
          position={[0, 10, 0]}
          intensity={30}
        />

        <pointLight
          position={[0, 5, 0]}
          intensity={30}
          castShadow
          receiveShadow
        />

        <hemisphereLight
          ref={hemisphereLightRef}
          position={[0, 5, 0]}
          intensity={0}
          groundColor={"lime"}
          color={"blue"}
        />

        <Box ref={boxRef} position={[0, 0, 0]} args={[50, 50, 50]}>
          <meshStandardMaterial color={"#DC4F00"} side={THREE.DoubleSide} />
          <Circle
            castShadow
            receiveShadow
            args={[8, 32, 32]}
            rotation-x={-Math.PI / 2}
            position-y={-4.4}
          >
            <meshStandardMaterial color={"#DC4F00"} side={THREE.DoubleSide} />
          </Circle>
          {/* 셰이더 조작해서 반짝이도록 하는 효과 추가 */}
          <Points positions={positions}>
            <pointsMaterial
              size={0.5}
              color={new THREE.Color("#DC4F00")}
              sizeAttenuation
              depthWrite
              depthTest={false}
              alphaMap={texture}
              transparent
              alphaTest={0.001}
            />
          </Points>
          <primitive ref={dancerRef} object={scene} scale={0.05} />
        </Box>
      </>
    );
  return <Loader />;
};

useGLTF.preload("/models/dancer.glb");

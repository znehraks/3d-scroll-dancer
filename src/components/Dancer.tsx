import {
  Box,
  Circle,
  Points,
  PositionalAudio,
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
let timeline: GSAPTimeline;

const colors = {
  boxMaterialColor: "#DC4F00",
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
  const starGroupRef01 = useRef<THREE.PointsMaterial>(null);
  const starGroupRef02 = useRef<THREE.PointsMaterial>(null);
  const starGroupRef03 = useRef<THREE.PointsMaterial>(null);
  const rectAreaLightRef = useRef<THREE.RectAreaLight>(null);
  const hemisphereLightRef = useRef<THREE.HemisphereLight>(null);
  const { actions } = useAnimations(animations, dancerRef);
  console.log(actions);

  const { positions } = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 25;
    }
    return { positions };
  }, []);

  useFrame(() => {
    if (!isEntered) return;
    if (!boxRef.current) return;
    timeline.seek(scroll.offset * timeline.duration());
    (boxRef.current.material as THREE.MeshStandardMaterial).color =
      new THREE.Color(colors.boxMaterialColor);

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
    three.scene.background = new THREE.Color(colors.boxMaterialColor);
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
      colors,
      { boxMaterialColor: "#0C0400" },
      {
        duration: 2.5,
        boxMaterialColor: "#DC4F00",
      }
    );

    gsap.to(starGroupRef01.current, {
      yoyo: true,
      duration: 2,
      repeat: -1,
      ease: "linear",
      size: 0.05,
    });

    gsap.to(starGroupRef02.current, {
      yoyo: true,
      duration: 3,
      repeat: -1,
      // ease: "power1.inOut",

      ease: "linear",
      size: 0.05,
    });

    gsap.to(starGroupRef03.current, {
      yoyo: true,
      duration: 4,
      repeat: -1,
      // ease: "elastic.in",

      ease: "linear",
      size: 0.05,
    });
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
        colors,
        {
          duration: 10,
          boxMaterialColor: "#0C0400",
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
        colors,
        {
          duration: 15,
          boxMaterialColor: "#DC4F00",
        },
        "<"
      );

    return () => {
      three.scene.remove(pivot);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEntered]);

  if (isEntered)
    return (
      <>
        <primitive ref={dancerRef} object={scene} scale={0.05} />
        <ambientLight intensity={2} />
        <rectAreaLight
          ref={rectAreaLightRef}
          position={[0, 10, 0]}
          intensity={30}
        />
        <pointLight
          position={[0, 5, 0]}
          intensity={45}
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

        <Box ref={boxRef} position={[0, 0, 0]} args={[100, 100, 100]}>
          <meshStandardMaterial color={"#DC4F00"} side={THREE.DoubleSide} />
        </Box>

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
        <Points positions={positions.slice(0, positions.length / 3)}>
          <pointsMaterial
            ref={starGroupRef01}
            size={0.5}
            color={new THREE.Color("#DC4F00")}
            sizeAttenuation
            depthWrite
            alphaMap={texture}
            transparent
            alphaTest={0.001}
          />
        </Points>
        <Points
          positions={positions.slice(
            positions.length / 3,
            (positions.length * 2) / 3
          )}
        >
          <pointsMaterial
            ref={starGroupRef02}
            size={0.5}
            color={new THREE.Color("#DC4F00")}
            sizeAttenuation
            depthWrite
            alphaMap={texture}
            transparent
            alphaTest={0.001}
          />
        </Points>
        <Points positions={positions.slice((positions.length * 2) / 3)}>
          <pointsMaterial
            ref={starGroupRef03}
            size={0.5}
            color={new THREE.Color("#DC4F00")}
            sizeAttenuation
            depthWrite
            alphaMap={texture}
            transparent
            alphaTest={0.001}
          />
        </Points>
        {/* <Stars
          radius={10} // 범위
          depth={5} // 장면의 깊이로 이해하고, 일단은 숫자를 바꾸었을때 어떻게 변하는지 정도만 알아두면 됨
          count={500} // 개수
          speed={2} // 반짝이는 속도
          saturation={10}
          fade // 희미한 정도(좀더 주변이 뿌연 구체로 바뀜)
        /> */}
        <PositionalAudio
          position={[-24, 0, 0]}
          autoplay
          url="/audio/bgm.mp3"
          distance={50}
          loop
        />
      </>
    );
  return <Loader />;
};

useGLTF.preload("/models/dancer.glb");

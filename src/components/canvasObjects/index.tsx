import { ScrollControls } from "@react-three/drei";
import { Dancer } from "./Dancer";
import { Settings } from "./Settings";
import { useRecoilValue } from "recoil";
import { IsEnteredAtom } from "../../stores";

export const CanvasObjects = () => {
  const isEntered = useRecoilValue(IsEnteredAtom);

  return (
    <ScrollControls pages={isEntered ? 5 : 0} damping={0.25}>
      <Settings />
      <Dancer />
    </ScrollControls>
  );
};

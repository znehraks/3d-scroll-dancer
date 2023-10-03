import { useRecoilValue } from "recoil";
import { IsEnteredAtom } from "../stores";
import { useEffect, useRef } from "react";

export const Audio = () => {
  const isEntered = useRecoilValue(IsEnteredAtom);
  const ref = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (isEntered) {
      ref.current?.play();
    }
  }, [isEntered]);
  return null;
  return <audio ref={ref} src="/audio/bgm.mp3" loop={isEntered} />;
};

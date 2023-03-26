import React, { useMemo } from "react";

const Bgmusic = ({ music }) => {
  new Audio(music).play();
  //   const playing = useMemo(() => {
  //   }, [music]);

  return <>{}</>;
};

export default Bgmusic;

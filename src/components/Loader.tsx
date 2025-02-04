import Image from "next/image";
import React from "react";

export default function Loader() {
  return (
    <Image
      src="/loadingAnimation.gif"
      alt="Running Puppy"
      width={100}
      height={100}
      className="object-contain"
    />
  );
}

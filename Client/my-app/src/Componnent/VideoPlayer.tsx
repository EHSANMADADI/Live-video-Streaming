import React, { useEffect, useRef } from "react";

export default function VideoPlayer({ stream }: { stream: MediaStream }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  
  return (
    <div>
      <video ref={videoRef} autoPlay />
    </div>
  );
}

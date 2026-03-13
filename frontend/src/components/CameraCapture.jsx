import { useEffect } from "react";
import { useCamera } from "../hooks/useCamera";

const CameraCapture = ({ onCapture }) => {
  const { videoRef, stream, start, stop, capture } = useCamera();

  useEffect(() => {
    start();
    return () => stop();
  }, []);

  const handleCapture = () => {
    const dataUrl = capture();
    if (dataUrl) {
      stop();
      onCapture(dataUrl);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full max-w-lg rounded-lg bg-black"
      />
      {stream && (
        <button
          onClick={handleCapture}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Capture
        </button>
      )}
    </div>
  );
};

export default CameraCapture;

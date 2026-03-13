import { useSignaturePad } from "../hooks/useSignaturePad";

const SignaturePad = ({ photo, onDone }) => {
  const { canvasRef, clear, isEmpty } = useSignaturePad();

  const handleDone = () => {
    if (isEmpty()) return;
    onDone(canvasRef.current);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative inline-block">
        <img src={photo} alt="captured" className="w-full max-w-lg rounded-lg" />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          className="absolute inset-0 w-full h-full cursor-crosshair"
          style={{ touchAction: "none" }}
        />
      </div>
      <div className="flex gap-3">
        <button
          onClick={clear}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
        >
          Clear
        </button>
        <button
          onClick={handleDone}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default SignaturePad;

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CameraCapture from "../components/CameraCapture";
import SignaturePad from "../components/SignaturePad";
import { mergeImage } from "../utils/mergeImage";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [mergedImage, setMergedImage] = useState(null);

  const handleCapture = (dataUrl) => {
    setPhoto(dataUrl);
  };

  const handleSign = async (signatureCanvas) => {
    const result = await mergeImage(photo, signatureCanvas);
    setMergedImage(result);
    localStorage.setItem(`audit-image-${id}`, result);
  };

  const handleViewAnalytics = () => {
    navigate(`/analytics/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <h1 className="text-xl font-semibold">Employee #{id}</h1>
        <button
          onClick={() => navigate("/list")}
          className="px-4 py-1.5 text-sm bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Back
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        {!photo && <CameraCapture onCapture={handleCapture} />}
        {photo && !mergedImage && <SignaturePad photo={photo} onDone={handleSign} />}
        {mergedImage && (
          <div className="flex flex-col items-center gap-4">
            <img src={mergedImage} alt="merged" className="w-full max-w-lg rounded-lg" />
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setPhoto(null);
                  setMergedImage(null);
                }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
              >
                Retake
              </button>
              <button
                onClick={handleViewAnalytics}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                View Analytics
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Details;

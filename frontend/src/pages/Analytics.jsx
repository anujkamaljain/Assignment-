import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEmployees } from "../services/api";
import { aggregateSalaryByCity } from "../utils/chartData";
import SalaryChart from "../components/SalaryChart";
import CityMap from "../components/CityMap";

const Analytics = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [mergedImage, setMergedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const employees = await fetchEmployees();
        const aggregated = aggregateSalaryByCity(employees);
        setChartData(aggregated);
        
        const stored = localStorage.getItem(`audit-image-${id}`);
        if (stored) {
          setMergedImage(stored);
        }
      } catch (error) {
        console.error("Failed to load analytics data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <h1 className="text-xl font-semibold">Analytics Dashboard</h1>
        <button
          onClick={() => navigate("/list")}
          className="px-4 py-1.5 text-sm bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Back to List
        </button>
      </div>

      <div className="p-6 space-y-6">
        {mergedImage && (
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">
              Audit Image - Employee #{id}
            </h2>
            <img
              src={mergedImage}
              alt="Audit"
              className="max-w-md mx-auto rounded-lg border border-gray-700"
            />
          </div>
        )}

        {chartData.length > 0 && (
          <>
            <SalaryChart data={chartData} />
            <CityMap data={chartData} />
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;

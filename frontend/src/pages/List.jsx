import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchEmployees } from "../services/api";
import { useVirtualization } from "../hooks/useVirtualization";
import GridRow from "../components/GridRow";

const ROW_HEIGHT = 32;
const HEADER_HEIGHT = 48;

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [containerHeight, setContainerHeight] = useState(600);

  const scrollContainerRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees()
      .then((data) => {
        setEmployees(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setError("Failed to load data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      if (scrollContainerRef.current) {
        setContainerHeight(scrollContainerRef.current.clientHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const { totalHeight, startIndex, endIndex, offsetY, onScroll } =
    useVirtualization({
      totalItems: employees.length,
      rowHeight: ROW_HEIGHT,
      containerHeight,
      bufferCount: 10,
    });

  const visibleEmployees = employees.slice(startIndex, endIndex);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-950 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
        <h1 className="text-xl font-semibold text-white">Employees</h1>

        <button
          onClick={handleLogout}
          className="px-4 py-1.5 text-sm bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
        >
          Logout
        </button>
      </div>

      <div
        className="grid grid-cols-5 px-4 items-center border-b border-gray-700 text-sm font-medium text-gray-400 flex-shrink-0"
        style={{ height: HEADER_HEIGHT }}
      >
        <span>Name</span>
        <span>Position</span>
        <span>City</span>
        <span>Start Date</span>
        <span>Salary</span>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={onScroll}
        className="flex-1 overflow-y-auto overflow-x-hidden"
      >
        <div
          style={{
            height: totalHeight,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: offsetY,
              left: 0,
              right: 0,
            }}
          >
            {visibleEmployees.map((emp, i) => (
              <GridRow
                key={`${emp.name}-${startIndex + i}`}
                employee={emp}
                style={{ height: ROW_HEIGHT }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
const SalaryChart = ({ data }) => {
  const width = 800;
  const height = 400;
  const padding = { top: 40, right: 40, bottom: 80, left: 80 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxSalary = Math.max(...data.map((d) => d.average));
  const barWidth = chartWidth / data.length - 10;

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-white mb-4">
        Average Salary by City
      </h2>
      <svg width={width} height={height} className="mx-auto">
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {data.map((item, index) => {
            const barHeight = (item.average / maxSalary) * chartHeight;
            const x = index * (chartWidth / data.length) + 5;
            const y = chartHeight - barHeight;

            return (
              <g key={item.city}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill="#3b82f6"
                  className="hover:fill-blue-400 transition-colors"
                />
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 20}
                  textAnchor="middle"
                  fill="#9ca3af"
                  fontSize="12"
                  transform={`rotate(-45, ${x + barWidth / 2}, ${chartHeight + 20})`}
                >
                  {item.city}
                </text>
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  fill="#e5e7eb"
                  fontSize="11"
                >
                  ${Math.round(item.average / 1000)}k
                </text>
              </g>
            );
          })}
          <line
            x1="0"
            y1={chartHeight}
            x2={chartWidth}
            y2={chartHeight}
            stroke="#4b5563"
            strokeWidth="2"
          />
          <line
            x1="0"
            y1="0"
            x2="0"
            y2={chartHeight}
            stroke="#4b5563"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
};

export default SalaryChart;

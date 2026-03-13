const GridRow = ({ employee, style }) => (
  <div
    style={style}
    className="grid grid-cols-5 px-4 items-center border-b border-gray-800 text-sm text-gray-300 hover:bg-gray-800/50 transition-colors"
  >
    <span>{employee.name}</span>
    <span>{employee.position}</span>
    <span>{employee.city}</span>
    <span>{employee.startDate}</span>
    <span>{employee.salary}</span>
  </div>
);

export default GridRow;

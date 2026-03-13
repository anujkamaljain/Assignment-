import { Link } from "react-router-dom";

const GridRow = ({ employee, style }) => (
  <Link to={`/details/${employee.id}`} style={style}>
    <div className="grid grid-cols-5 px-4 items-center border-b border-gray-800 text-sm text-gray-300 hover:bg-gray-800/50 transition-colors h-full">
      <span>{employee.name}</span>
      <span>{employee.position}</span>
      <span>{employee.city}</span>
      <span>{employee.startDate}</span>
      <span>{employee.salary}</span>
    </div>
  </Link>
);

export default GridRow;

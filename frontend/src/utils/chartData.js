export const aggregateSalaryByCity = (employees) => {
  const cityData = {};
  
  employees.forEach((emp) => {
    const city = emp.city || "Unknown";
    const salary = parseFloat(emp.salary?.replace(/[^0-9.-]+/g, "") || 0);
    
    if (!cityData[city]) {
      cityData[city] = { total: 0, count: 0 };
    }
    
    cityData[city].total += salary;
    cityData[city].count += 1;
  });
  
  return Object.entries(cityData).map(([city, data]) => ({
    city,
    average: data.total / data.count,
    count: data.count,
  }));
};

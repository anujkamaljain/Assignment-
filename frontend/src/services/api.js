const API_URL = "https://backend.jotish.in/backend_dev/gettabledata.php";

const mapRow = (row) => ({
  name: row[0],
  position: row[1],
  city: row[2],
  id: row[3],
  startDate: row[4],
  salary: row[5],
});

const fetchEmployees = async () => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "test", password: "123456" }),
  });

  if (!res.ok) throw new Error("Failed to fetch employees");

  const json = await res.json();
  const rows = json?.TABLE_DATA?.data || [];

  return rows.map(mapRow);
};

export { fetchEmployees };

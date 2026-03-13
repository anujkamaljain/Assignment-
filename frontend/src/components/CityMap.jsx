import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getCoordinates } from "../utils/cityCoordinates";
import { createCustomIcon } from "../utils/leafletSetup";
import "leaflet/dist/leaflet.css";

const CityMap = ({ data }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-xl font-semibold text-white mb-4">
        Employee Distribution by City
      </h2>
      <div className="h-96 rounded-lg overflow-hidden">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {data.map((item) => {
            const coords = getCoordinates(item.city);
            return (
              <Marker
                key={item.city}
                position={[coords.lat, coords.lng]}
                icon={createCustomIcon(item.count)}
              >
                <Popup>
                  <div className="text-center">
                    <div className="font-semibold">{item.city}</div>
                    <div className="text-sm text-gray-600">
                      {item.count} {item.count === 1 ? "employee" : "employees"}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default CityMap;

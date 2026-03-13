# Employee Insights Dashboard

## Intentional Bug Documentation

### Bug Type: Memory Leak in Camera Hook

**Description:** The  stop  function in the  useCamera  hook has a stale closure issue. The stream variable is captured in the useCallback dependency array, but when the cleanup function runs, it may reference an outdated stream object, potentially causing the camera to not properly release in certain edge cases.

**Location:**  frontend/src/hooks/useCamera.js 

**Why This Bug:** This demonstrates understanding of React's closure behavior and the importance of proper dependency management in hooks. In real-world scenarios, this could lead to the camera remaining active even after component unmount, draining battery and causing privacy concerns.

**Impact:** Medium - Camera may not release properly on component unmount in rapid navigation scenarios.

## Custom Virtualization Math

### Implementation:  frontend/src/hooks/useVirtualization.js 

The virtualization system calculates which rows to render based on scroll position:

1. **Scroll Offset Calculation:**
   -  scrollTop  is obtained from the scroll event
   -  startIndex = Math.floor(scrollTop / rowHeight) - bufferCount 
   -  endIndex = Math.ceil((scrollTop + containerHeight) / rowHeight) + bufferCount 

2. **Visible Range:**
   - Only rows within  [startIndex, endIndex]  are rendered
   - Buffer rows above and below viewport prevent white flashes during scroll

3. **Positioning:**
   -  totalHeight = totalItems * rowHeight  creates the scrollable area
   -  offsetY = startIndex * rowHeight  positions the visible window
   - Absolute positioning maintains scroll behavior while rendering minimal DOM nodes


## Setup

### Backend
cd backend
npm install
npm start
   

### Frontend
cd frontend
npm install
npm run dev
   

## Login Credentials

- Username:  testuser 
- Password:  Test123 
   

## Geospatial Mapping

### Implementation: Leaflet + React

The employee distribution map uses **react-leaflet** to display cities on a real-world map:

**City-to-Coordinate Mapping:**
- Each city name is mapped to its actual latitude/longitude in `cityCoordinates.js`
- Example: `"New York": { lat: 40.7128, lng: -74.0060 }`
- The `getCoordinates()` function looks up coordinates by city name

**Map Rendering Process:**
1. MapContainer initializes with center `[20, 0]` (global view) and zoom level 2
2. TileLayer loads OpenStreetMap tiles for the base map
3. For each city in the data:
   - Look up coordinates using `getCoordinates(city)`
   - Create a Marker at `[lat, lng]` position
   - Attach a Popup showing city name and employee count
4. User clicks marker → popup displays city details

**Technical Details:**
- Uses OpenStreetMap tiles (free, no API key required)
- Markers use default Leaflet icons with CDN fallback
- Map is responsive and contained in dashboard card
- Real geographic positioning (not projected/scaled coordinates)


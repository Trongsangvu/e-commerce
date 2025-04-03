import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Kích thước bản đồ
const containerStyle = {
  width: "100%",
  height: "500px",
};

// Toạ độ trung tâm bản đồ (VD: Hồ Chí Minh)
const center = {
  lat: 10.7769,
  lng: 106.7009,
};

// Dark Mode Styles
const darkModeStyles = [
  { elementType: "geometry", stylers: [{ color: "#212121" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#383838" }] },
];

const apiKey = import.meta.env.GOOGLE_API_KEY;

export const GoogleMapComponent: React.FC = () => {
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        options={{ styles: darkModeStyles }}
      >
        {/* Thêm marker tại vị trí trung tâm */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};


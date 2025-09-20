import React, { useState, useEffect } from "react";

const App = () => {
  const [userDetails, setUserDetails] = useState({
    ip: "Loading...",
    browser: "Loading...",
    os: "Loading...",
    screen: "Loading...",
    language: "Loading...",
    location: "Loading...",
    city: "Loading...",
    region: "Loading...",
    country: "Loading...",
    timezone: "Loading...",
    isp: "Loading...",
  });

  useEffect(() => {
    // Browser & device info
    const browser = navigator.userAgent;
    const os = navigator.platform;
    const screenSize = `${window.screen.width} x ${window.screen.height}`;
    const language = navigator.language;

    // Get IP + location from API (you can use ipinfo.io or ipapi.co)
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        setUserDetails((prev) => ({
          ...prev,
          ip: data.ip,
          browser,
          os,
          screen: screenSize,
          language,
          city: data.city,
          region: data.region,
          country: data.country_name,
          timezone: data.timezone,
          isp: data.org,
          location: `Latitude: ${data.latitude}, Longitude: ${data.longitude}`,
        }));
      })
      .catch((error) => {
        console.error("Error fetching IP/location:", error);
        setUserDetails((prev) => ({
          ...prev,
          ip: "Unable to fetch",
          location: "Unable to fetch",
        }));
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Current Visitor Details</h1>
      <p>
        <strong>IP Address:</strong> {userDetails.ip}
      </p>
      <p>
        <strong>Browser:</strong> {userDetails.browser}
      </p>
      <p>
        <strong>Operating System:</strong> {userDetails.os}
      </p>
      <p>
        <strong>Screen Size:</strong> {userDetails.screen}
      </p>
      <p>
        <strong>Language:</strong> {userDetails.language}
      </p>
      <p>
        <strong>City:</strong> {userDetails.city}
      </p>
      <p>
        <strong>Region:</strong> {userDetails.region}
      </p>
      <p>
        <strong>Country:</strong> {userDetails.country}
      </p>
      <p>
        <strong>Timezone:</strong> {userDetails.timezone}
      </p>
      <p>
        <strong>ISP:</strong> {userDetails.isp}
      </p>
      <p>
        <strong>Coordinates:</strong> {userDetails.location}
      </p>
    </div>
  );
};

export default App;

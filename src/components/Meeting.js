import React, { useEffect } from "react";

function Meeting() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []); 

  return (
    <div className = "body2">
      <div className = "overlay">
      <h2>Meeting Page</h2>
        <p>Let's schedule a meeting!</p>
        <div
          className="calendly-inline-widget"
          data-url="https://calendly.com/lani-isley10/45min"
          style={{ minWidth: "800px", height: "500px" }}
        >
        </div>
      </div>
    </div>
  );
}

export default Meeting;

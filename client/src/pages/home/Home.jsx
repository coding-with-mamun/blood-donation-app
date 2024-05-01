import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const inspectHandler = () => {
      // Calculate the time difference between page load and inspect tool open
      const timeSinceLoad =
        new Date().getTime() - performance.timing.navigationStart;

      // Set a threshold time (e.g., 5 seconds)
      const thresholdTime = 5000;

      // Show alert if the inspect tool is open for more than the threshold time
      if (timeSinceLoad > thresholdTime) {
        alert("Please close the Inspect tool for a better user experience.");
      }
    };

    // Attach the inspectHandler to the 'resize' event (fires when the Inspect tool is opened/closed)
    window.addEventListener("resize", inspectHandler);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", inspectHandler);
    };
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return <div>ghjghj</div>;
};

export default Home;

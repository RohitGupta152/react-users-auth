import { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    return () => setShow(false);
  }, []);

  return (
    <div className={`loading-screen ${show ? 'show' : ''}`}>
      <div className="loading-content">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen; 
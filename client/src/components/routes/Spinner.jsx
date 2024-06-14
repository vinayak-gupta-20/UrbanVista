import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Spinner = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
        navigate("/login", {
            state: location.pathname,
        });
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <div>Loading...</div>
  );
}

export default Spinner;

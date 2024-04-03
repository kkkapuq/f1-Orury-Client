/* eslint-disable no-console */
/* eslint-disable lines-around-directive */
'use client';
import { useEffect, useState } from 'react';

export default function Location() {
  const [location, setLocation] = useState<
    { lat: number; lng: number } | string
  >('');

  const success = (position: GeolocationPosition) => {
    setLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
  };

  const handleError = () => {
    setLocation({
      lat: 37.483034,
      lng: 126.902435,
    });
    console.log('Failed to retrieve location');
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, handleError);
    } else {
      handleError(); // geolocation이 없을때 에러처리
    }
  }, []);

  return location;
}

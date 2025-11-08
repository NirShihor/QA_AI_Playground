import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import airplaneImage from '../assets/images/airplane.png';
import bicycleImage from '../assets/images/bicycle.png';
import busImage from '../assets/images/bus.png';
import taxiImage from '../assets/images/taxi.png';
import trainImage from '../assets/images/train.png';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const images = [airplaneImage, bicycleImage, busImage, taxiImage, trainImage];
  const [currentImageIndex, setCurrentImageIndex] = useState(() => {
    return Math.floor(Math.random() * images.length);
  });
  const currentImage = images[currentImageIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const getImageAlt = () => {
    if (currentImage === airplaneImage) return 'Airplane';
    if (currentImage === bicycleImage) return 'Bicycle';
    if (currentImage === busImage) return 'Bus';
    if (currentImage === taxiImage) return 'Taxi';
    if (currentImage === trainImage) return 'Train';
    return 'Transport';
  };

  const handleButtonClick = (image: typeof airplaneImage) => {
    if (image === taxiImage) {
      return;
    }
    if (currentImage === image) {
      navigate('/page1');
    }
  };

  return (
    <div className="page">
      <h1>Home Page</h1>
      <div className="imageContainer">
        <img src={currentImage} alt={getImageAlt()} />
      </div>
      <div className="buttonContainer">
        <button onClick={() => handleButtonClick(airplaneImage)}>Airplane</button>
        <button onClick={() => handleButtonClick(bicycleImage)}>Bicycle</button>
        <button onClick={() => handleButtonClick(busImage)}>Bus</button>
        <button onClick={() => handleButtonClick(taxiImage)}>Taxi</button>
        <button onClick={() => handleButtonClick(trainImage)}>Train</button>
      </div>
    </div>
  );
};

export default HomePage;


import React from 'react';
import './CatImageDisplay.scss';

interface CatImageDisplayProps {
  imageUrl: string;
}

const CatImageDisplay: React.FC<CatImageDisplayProps> = ({ imageUrl }) => {
  return <img src={imageUrl} alt="Cat" />;
};

export default CatImageDisplay;
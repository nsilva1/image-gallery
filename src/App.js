import React, { useState, useEffect, useCallback } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  const getPhotos = useCallback(async () => {
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXAYBAY_KEY}&q=${term}&image_type=photo&pretty=true`
      );
      const data = await response.json();
      setImages(data.hits);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [term]);

  useEffect(() => {
    getPhotos();
  }, [getPhotos]);

  return (
    <div className="container mx-auto">
      <ImageSearch setText={(text) => setTerm(text)} />

      {!isLoading && images.length === 0 && (
        <h1 className="text-4xl text-bold text-center mx-auto mt-32">
          No Images Found.
        </h1>
      )}

      {isLoading ? (
        <h1 className="text-6xl text-bold text-center mx-auto mt-32">
          Loading...
        </h1>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;

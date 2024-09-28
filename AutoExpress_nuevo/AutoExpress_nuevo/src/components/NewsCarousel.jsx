import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../estilos/NewsCarousel.css';

const NewsCarousel = () => {
  const [newsData, setNewsData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=cars&language=es&apiKey=2075433e8d704057a489b45f92f315ab`
        );
        const data = await response.json();
        if (data.articles) {
          const filteredNews = data.articles.filter(article => article.urlToImage);
          setNewsData(filteredNews);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === newsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [newsData]);

  return (
    <div className="container my-5">
      <div className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {newsData.length > 0 ? (
            newsData.map((news, index) => (
              <div key={index} className={`carousel-item ${index === currentIndex ? 'active' : ''}`}>
                <img src={news.urlToImage} className="d-block w-100" alt={news.title} />
                <div className="carousel-caption d-none d-md-block">
                  <h5>{news.title}</h5>
                  <p>{news.description}</p>
                  <a href={news.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Leer más
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="carousel-item active">
              <p>Cargando noticias...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCarousel;

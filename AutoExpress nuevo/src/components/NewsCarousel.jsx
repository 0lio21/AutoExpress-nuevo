import React, { useEffect, useState } from 'react';
import '../estilos/NewsCarousel.css'; // Asegúrate de crear este archivo CSS

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
                    // Filtra solo las noticias que tienen una imagen y guarda en el estado
                    const filteredNews = data.articles.filter(article => article.urlToImage);
                    setNewsData(filteredNews);
                }
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        };

        fetchNews();
    }, []);

    // Cambia de noticia cada 5 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex === newsData.length - 1 ? 0 : prevIndex + 1
            );
        }, 10000);

        return () => clearInterval(interval);
    }, [newsData]);

    return (
        <div className="news-carousel">
            {newsData.length > 0 ? (
                <div className="news-item">
                    <img src={newsData[currentIndex].urlToImage} alt={newsData[currentIndex].title} />
                    <div className="news-content">
                        <h3>{newsData[currentIndex].title}</h3>
                        <p>{newsData[currentIndex].description}</p>
                        <a href={newsData[currentIndex].url} target="_blank" rel="noopener noreferrer">
                            Leer más
                        </a>
                    </div>
                </div>
            ) : (
                <p>Cargando noticias...</p>
            )}
        </div>
    );
};

export default NewsCarousel;

import React from 'react';
import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import img4 from './images/4.jpg';
import './AboutAd.css'
function AboutAd() {
    const images = [
        img1, img2, img3, img4
    ];

    return (
        <>
            {/* Инлайновые стили для карусели */}
            <style>{`
                .carousel-control-prev,
                .carousel-control-next {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 2;
                    width: 50px;
                    height: 50px;
                    background-color: rgba(0, 0, 0, 0.3);
                    border-radius: 50%;
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }
            `}</style>

            <div className="carousel-container">
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    {/* Индикаторы (точки) */}
                    <div className="carousel-indicators">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to={index}
                                className={index === 0 ? 'active' : ''}
                                aria-current={index === 0 ? 'true' : undefined}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>

                    {/* Слайды */}
                    <div className="carousel-inner">
                        {images.map((img, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <img src={img} className="d-block carousel-image" alt={`Slide ${index + 1}`}/>
                            </div>
                        ))}
                    </div>

                    {/* Кнопки навигации */}
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="carousel-text">
                <h2>Детальное описание</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Phasellus malesuada tortor ut dui aliquet, ac tincidunt enim pharetra. Etiam suscipit, risus nec
                    dictum sollicitudin, nunc elit egestas nisi, eu varius libero risus at mauris. Sed venenatis, orci
                    sed luctus scelerisque, nunc risus facilisis tortor, vel posuere orci libero eget ipsum.</p>
                <p>Fusce ac ante sapien. Ut vel neque ut ipsum pretium aliquam. Nullam vestibulum bibendum tincidunt.
                    Integer ac ex magna. Suspendisse ut erat auctor, ullamcorper lorem ac, suscipit eros. Curabitur
                    scelerisque urna id erat volutpat, a tristique nulla rhoncus.</p>
            </div>
        </>
    );
}

export default AboutAd;

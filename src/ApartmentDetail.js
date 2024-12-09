import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './AboutAd.css';

function ApartmentDetail() {
    const { id } = useParams(); // Получаем id квартиры из URL
    const [apartment, setApartment] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApartment = async () => {
            try {
                console.log("ID квартиры:", id);  // Логируем ID для отладки

                if (!id) {
                    setError("ID квартиры не найден");
                    return;
                }

                console.log("Запрос к API для квартиры с id:", id);

                const response = await axios.get(`http://localhost:5165/api/ApartmentRent/byId/${id}`);
                console.log("Данные квартиры:", response.data); // Логируем ответ от API

                // Проверим структуру данных, если нет изображений, покажем заглушку
                const images = response.data.photosPath?.$values || [];  // Массив изображений

                setApartment({
                    ...response.data,
                    images: images.length > 0 ? images : ["https://mir-oboev.ua/image/cache/catalog/oboi/3793-13-540x540.jpg"]  // Используем заглушку, если нет изображений
                });
            } catch (err) {
                console.error("Ошибка при получении данных:", err);
                setError(err.response ? err.response.data : "Ошибка при загрузке информации");
            }
        };

        fetchApartment(); // Запросить данные квартиры при монтировании компонента
    }, [id]); // Перезапускать запрос при изменении id

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!apartment) {
        return <div>Загрузка...</div>;
    }

    return (
        <>
            <style>{
                `.carousel-control-prev,
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
                }`
            }</style>
            <div className="carousel-container">
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    {/* Индикаторы (точки) */}
                    <div className="carousel-indicators">
                        {apartment.images.length > 0 ? apartment.images.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#carouselExampleIndicators"
                                data-bs-slide-to={index}
                                className={index === 0 ? 'active' : ''}
                                aria-current={index === 0 ? 'true' : undefined}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        )) : (
                            <button type="button" disabled className="active"></button>
                        )}
                    </div>

                    {/* Слайды */}
                    <div className="carousel-inner">
                        {apartment.images.length > 0 && apartment.images[0] !=="" ? apartment.images.map((img, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <img src={img} className="d-block carousel-image" alt={`Slide ${index + 1}`}/>
                            </div>
                        )) : (
                            <div className="carousel-item active">
                                <img  className="d-block carousel-image"  src="https://mir-oboev.ua/image/cache/catalog/oboi/3793-13-540x540.jpg" alt=""/>
                            </div>
                        )}
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

            <div className="carousel-text container mt-4">
                <h2 className="text-center mb-4">Детальное описание</h2>
                <div className="row">
                    <div className="col-md-6">
                        <p><strong>{apartment.name}</strong></p>
                        <p><strong>Краткое описание:</strong> {apartment.aboutSmall}</p>
                        <p><strong>Полное описание:</strong> {apartment.about}</p>
                        <p><strong>Цена:</strong> {apartment.price} руб.</p>
                        <p><strong>Адрес:</strong> {apartment.address}</p>
                        <p><strong>Комнаты:</strong> {apartment.countOfRooms}</p>
                        <p><strong>Площадь:</strong> {apartment.square} м²</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Этаж:</strong> {apartment.floor} из {apartment.totalFloor}</p>
                        <p><strong>Балкон:</strong> {apartment.balcony ? 'Есть' : 'Нет'}</p>
                        <p><strong>Совмещённый санузел:</strong> {apartment.bathroomIsShared ? 'Да' : 'Нет'}</p>
                        <p><strong>Количество санузлов:</strong> {apartment.countOfBathrooms}</p>
                        <p><strong>Тип ремонта:</strong> {apartment.typeOfRepair}</p>
                        <p><strong>Мебель:</strong> {apartment.furniture}</p>
                        <p><strong>Техника:</strong> {apartment.technique}</p>
                        <p><strong>Интернет и ТВ:</strong> {apartment.internetTv ? 'Есть' : 'Нет'}</p>
                        <p><strong>Объявление актуально:</strong> {apartment.isValid ? 'Да' : 'Нет'}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ApartmentDetail;

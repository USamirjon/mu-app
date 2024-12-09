import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

function Home() {
    const [apartments, setApartments] = useState([]);
    const [error, setError] = useState("");
    const [userRole, setUserRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Функция для получения роли пользователя
        const fetchUserRole = () => {
            const authToken = Cookies.get("AuthToken");

            if (authToken) {
                try {
                    const decodedToken = jwt_decode(authToken);
                    const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                    setUserRole(role);
                } catch (err) {
                    console.error("Ошибка при декодировании токена:", err);
                    setError("Ошибка при проверке роли пользователя");
                }
            } else {
                setUserRole(null);  // Если токен не найден, роль остается null
            }
        };

        // Получаем роль пользователя
        fetchUserRole();

        // Запрос всех квартир
        const fetchApartments = async () => {
            try {
                const [rentResponse, sellResponse] = await Promise.all([
                    axios.get("http://localhost:5165/api/ApartmentRent/all"),
                    axios.get("http://localhost:5165/api/ApartmentSell/all"),
                ]);

                const allApartments = [
                    ...rentResponse.data.$values,
                    ...sellResponse.data.$values,
                ];

                setApartments(allApartments);
                setLoading(false);
            } catch (err) {
                console.error("Ошибка при получении данных:", err);
                setError("Ошибка при загрузке квартир");
                setLoading(false);
            }
        };

        fetchApartments();
    }, []);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (loading) {
        return <div className="alert alert-info">Загрузка...</div>;
    }

    return (
        <div className="container">
            <br />
            {/* Кнопка для добавления нового объявления доступна только для агента */}
            {userRole === "agent" && (
                <div className="mb-4">
                    <Link to="/CreateApartment" className="btn btn-primary">
                        Добавить объявление
                    </Link>
                </div>
            )}

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {apartments.length === 0 ? (
                    <div className="col-12">
                        <div className="alert alert-info">Нет доступных квартир</div>
                    </div>
                ) : (
                    apartments.map((apartment, index) => {
                        const apartmentImage = apartment.photosPath?.$values?.[0] || "https://mir-oboev.ua/image/cache/catalog/oboi/3793-13-540x540.jpg";  // Первая фотография или заглушка
                        return (
                            <div className="col" key={`${apartment.id}-${index}`}>
                                <div className="card shadow-sm d-flex flex-column" style={{ height: '100%' }}>
                                    <img src={apartmentImage} className="bd-placeholder-img card-img-top" width="100%" height="225" alt="Фото квартиры" />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{apartment.name}</h5>
                                        <p className="card-text text-start">
                                            <strong>Стоимость:</strong> {apartment.price} руб.<br />
                                            <strong>Комнаты:</strong> {apartment.countOfRooms}<br />
                                            <strong>Площадь:</strong> {apartment.square} м²
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center mt-auto">
                                            <div className="btn-group">
                                                <Link to={`/apartment/${apartment.id}`} className="btn btn-large btn-outline-success btn-animate">
                                                    Подробнее
                                                </Link>
                                            </div>
                                            {userRole === "agent" && (
                                                <div className="btn-group ms-2">
                                                    <Link to={`/edit-apartment/${apartment.id}`} className="btn btn-warning">
                                                        Редактировать
                                                    </Link>
                                                </div>
                                            )}
                                            <div className={`badge ${apartment.isValid ? "bg-success" : "bg-danger"}`}>
                                                {apartment.isValid ? "Доступно" : "Не доступно"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default Home;

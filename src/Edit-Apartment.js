import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './AboutAd.css';

function EditApartment() {
    const { id } = useParams(); // Получаем id квартиры из URL
    const [apartment, setApartment] = useState(null);
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

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

                // Проверяем структуру данных
                const images = response.data.photosPath?.$values || [];  // Массив изображений

                setApartment({
                    ...response.data,
                    photoPaths: images.length > 0 ? images : []  // Присваиваем photoPaths пустой массив, если данных нет
                });
            } catch (err) {
                console.error("Ошибка при получении данных:", err);
                setError(err.response ? err.response.data : "Ошибка при загрузке информации");
            }
        };

        fetchApartment(); // Запросить данные квартиры при монтировании компонента
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Преобразуем данные для отправки
        const formattedApartment = {
            ...apartment,
            photosPath: {
                "$id": "2", // Уникальный ID для photosPath, как указано в ответе
                "$values": apartment.photoPaths || [] // Преобразуем в массив
            }
        };

        try {
            // Отправка данных на сервер
            const response = await axios.put(
                `http://localhost:5165/api/ApartmentRent/update/${id}`,
                formattedApartment
            );
            console.log("Квартира обновлена:", response.data);
            navigate(`/apartment/${id}`);
        } catch (err) {
            console.error("Ошибка при обновлении квартиры:", err);
            setError('Ошибка при обновлении квартиры');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!apartment) {
        return <div>Загрузка...</div>;
    }

    return (
        <>
            <style>{
                `.form-group {
                    margin-bottom: 1rem;
                }

                label {
                    font-weight: bold;
                }

                input, textarea {
                    width: 100%;
                    padding: 0.5rem;
                    font-size: 1rem;
                    margin-top: 0.3rem;
                    border-radius: 5px;
                    border: 1px solid #ccc;
                }

                button {
                    padding: 0.5rem 1rem;
                    font-size: 1rem;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 1rem;
                }

                button:disabled {
                    background-color: #ccc;
                    cursor: not-allowed;
                }

                .form-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 2rem;
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }`
            }</style>

            <h2 className="text-center mb-4">Редактировать квартиру</h2>

            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    {/* Поля для редактирования квартиры */}
                    <div className="form-group">
                        <label>Название квартиры:</label>
                        <input
                            type="text"
                            value={apartment.name}
                            onChange={(e) => setApartment({...apartment, name: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label>Краткое описание:</label>
                        <textarea
                            value={apartment.aboutSmall}
                            onChange={(e) => setApartment({...apartment, aboutSmall: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label>Полное описание:</label>
                        <textarea
                            value={apartment.about}
                            onChange={(e) => setApartment({...apartment, about: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label>Цена:</label>
                        <input
                            type="number"
                            value={apartment.price}
                            onChange={(e) => setApartment({...apartment, price: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label>Адрес:</label>
                        <input
                            type="text"
                            value={apartment.address}
                            onChange={(e) => setApartment({...apartment, address: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label>Количество комнат:</label>
                        <input
                            type="number"
                            value={apartment.countOfRooms}
                            onChange={(e) => setApartment({...apartment, countOfRooms: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label>Площадь (м²):</label>
                        <input
                            type="number"
                            value={apartment.square}
                            onChange={(e) => setApartment({...apartment, square: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label>Этаж:</label>
                        <input
                            type="number"
                            value={apartment.floor}
                            onChange={(e) => setApartment({...apartment, floor: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label>Количество этажей в доме:</label>
                        <input
                            type="number"
                            value={apartment.totalFloors}
                            onChange={(e) => setApartment({...apartment, totalFloors: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label>Балкон:</label>
                        <select
                            value={apartment.balcony ? 'yes' : 'no'}
                            onChange={(e) => setApartment({...apartment, balcony: e.target.value === 'yes'})}
                        >
                            <option value="yes">Есть</option>
                            <option value="no">Нет</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Совмещенный санузел:</label>
                        <select
                            value={apartment.isCombinedBathroom ? 'yes' : 'no'}
                            onChange={(e) => setApartment({...apartment, isCombinedBathroom: e.target.value === 'yes'})}
                        >
                            <option value="yes">Да</option>
                            <option value="no">Нет</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Количество санузлов:</label>
                        <input
                            type="number"
                            value={apartment.bathroomsCount}
                            onChange={(e) => setApartment({...apartment, bathroomsCount: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label>Тип ремонта:</label>
                        <input
                            type="text"
                            value={apartment.repairType}
                            onChange={(e) => setApartment({...apartment, repairType: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label>Мебель:</label>
                        <input
                            type="text"
                            value={apartment.furniture}
                            onChange={(e) => setApartment({...apartment, furniture: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label>Техника:</label>
                        <input
                            type="text"
                            value={apartment.appliances}
                            onChange={(e) => setApartment({...apartment, appliances: e.target.value})}
                        />
                    </div>

                    <div className="form-group">
                        <label>Интернет и ТВ:</label>
                        <select
                            value={apartment.internetTv ? 'yes' : 'no'}
                            onChange={(e) => setApartment({...apartment, internetTv: e.target.value === 'yes'})}
                        >
                            <option value="yes">Есть</option>
                            <option value="no">Нет</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Объявление актуально:</label>
                        <select
                            value={apartment.isValid ? 'yes' : 'no'}
                            onChange={(e) => setApartment({...apartment, isValid: e.target.value === 'yes'})}
                        >
                            <option value="yes">Да</option>
                            <option value="no">Нет</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Фото:</label>
                        <input
                            type="text"
                            value={apartment.photoPaths.join(', ')}
                            onChange={(e) => setApartment({...apartment, photoPaths: e.target.value.split(', ')})}
                        />
                    </div>
                    {/* Кнопка отправки */}
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Сохраняю...' : 'Сохранить'}
                    </button>
                </form>

            </div>
        </>
    );
}

export default EditApartment;

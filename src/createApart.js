import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateApartment() {
    const [apartment, setApartment] = useState({
        name: '',
        aboutSmall: '',
        about: '',
        price: 0,
        photoPaths: [],
        address: '',
        countOfRooms: 0,
        square: 0,
        floor: 0,
        totalFloors: 0,
        balcony: false,
        bathroomIsShared: false,
        countOfBathrooms: 1,
        typeOfRepair: '',
        furniture: '',
        technique: '',
        internetTv: false,
        countOfPeople: 1,
        typeOfTransaction: '',
        limitations: false,
        isValid: true,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleAddPhoto = () => {
        const newPhoto = prompt("Введите ссылку на фото:");
        if (newPhoto && newPhoto.trim() !== '') {
            setApartment({
                ...apartment,
                photoPaths: [...apartment.photoPaths, newPhoto],
            });
        }
    };

    const handleRemovePhoto = (index) => {
        const updatedPhotos = apartment.photoPaths.filter((_, i) => i !== index);
        setApartment({ ...apartment, photoPaths: updatedPhotos });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const apartmentData = {
            name: apartment.name,
            aboutSmall: apartment.aboutSmall,
            about: apartment.about,
            price: apartment.price,
            photosPath: apartment.photoPaths,
            address: apartment.address,
            countOfRooms: apartment.countOfRooms,
            square: apartment.square,
            floor: apartment.floor,
            totalFloor: apartment.totalFloors,
            balcony: apartment.balcony,
            bathroomIsShared: apartment.isCombinedBathroom,
            countOfBathrooms: apartment.bathroomsCount,
            typeOfRepair: apartment.repairType,
            furniture: apartment.furniture,
            technique: apartment.appliances,
            internetTv: apartment.internetTv,
            countOfPeople: apartment.countOfPeople,
            typeOfTransaction: apartment.typeOfTransaction,
            limitations: apartment.isValid,
            isValid: apartment.isValid,
        };

        try {
            const response = await axios.post("http://localhost:5165/api/ApartmentRent/create", apartmentData);
            if (response.status === 200 && response.data) {
                navigate(`/`);
            } else {
                setError(`Ошибка: Неверный ответ от сервера. Статус: ${response.status}`);
            }
        } catch (err) {
            setError(err.response ? err.response.data : 'Ошибка при создании объявления');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                .form-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 2rem;
                    background-color: #f9f9f9;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }`
            }</style>
            <h2 className="mb-4 text-center">Создать объявление</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="container bg-white p-5 shadow-sm rounded">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Название квартиры:</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control custom-input"
                            value={apartment.name}
                            onChange={(e) => setApartment({...apartment, name: e.target.value})}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="aboutSmall" className="form-label">Краткое описание:</label>
                        <textarea
                            id="aboutSmall"
                            className="form-control custom-input"
                            value={apartment.aboutSmall}
                            onChange={(e) => setApartment({...apartment, aboutSmall: e.target.value})}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="about" className="form-label">Полное описание:</label>
                        <textarea
                            id="about"
                            className="form-control custom-input"
                            value={apartment.about}
                            onChange={(e) => setApartment({...apartment, about: e.target.value})}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Цена:</label>
                        <input
                            type="number"
                            id="price"
                            className="form-control custom-input"
                            value={apartment.price}
                            onChange={(e) => setApartment({...apartment, price: parseFloat(e.target.value)})}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Адрес:</label>
                        <input
                            type="text"
                            id="address"
                            className="form-control custom-input"
                            value={apartment.address}
                            onChange={(e) => setApartment({...apartment, address: e.target.value})}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="countOfRooms" className="form-label">Количество комнат:</label>
                        <input
                            type="number"
                            id="countOfRooms"
                            className="form-control custom-input"
                            value={apartment.countOfRooms}
                            onChange={(e) => setApartment({...apartment, countOfRooms: parseInt(e.target.value)})}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="square" className="form-label">Площадь (м²):</label>
                        <input
                            type="number"
                            id="square"
                            className="form-control custom-input"
                            value={apartment.square}
                            onChange={(e) => setApartment({...apartment, square: parseFloat(e.target.value)})}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="floor" className="form-label">Этаж:</label>
                        <input
                            type="number"
                            id="floor"
                            className="form-control custom-input"
                            value={apartment.floor}
                            onChange={(e) => setApartment({...apartment, floor: parseInt(e.target.value)})}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="totalFloors" className="form-label">Количество этажей в доме:</label>
                        <input
                            type="number"
                            id="totalFloors"
                            className="form-control custom-input"
                            value={apartment.totalFloors}
                            onChange={(e) => setApartment({...apartment, totalFloors: parseInt(e.target.value)})}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="balcony" className="form-label">Балкон:</label>
                        <select
                            id="balcony"
                            className="form-select custom-input"
                            value={apartment.balcony ? 'yes' : 'no'}
                            onChange={(e) => setApartment({...apartment, balcony: e.target.value === 'yes'})}
                        >
                            <option value="yes">Есть</option>
                            <option value="no">Нет</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="bathroomIsShared" className="form-label">Совмещенный санузел:</label>
                        <select
                            id="bathroomIsShared"
                            className="form-select custom-input"
                            value={apartment.bathroomIsShared ? 'yes' : 'no'}
                            onChange={(e) => setApartment({...apartment, bathroomIsShared: e.target.value === 'yes'})}
                        >
                            <option value="yes">Да</option>
                            <option value="no">Нет</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="countOfBathrooms" className="form-label">Количество санузлов:</label>
                        <input
                            type="number"
                            id="countOfBathrooms"
                            className="form-control custom-input"
                            value={apartment.countOfBathrooms}
                            onChange={(e) => setApartment({...apartment, countOfBathrooms: parseInt(e.target.value)})}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="typeOfRepair" className="form-label">Тип ремонта:</label>
                        <input
                            type="text"
                            id="typeOfRepair"
                            className="form-control custom-input"
                            value={apartment.typeOfRepair}
                            onChange={(e) => setApartment({...apartment, typeOfRepair: e.target.value})}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="furniture" className="form-label">Мебель:</label>
                        <input
                            type="text"
                            id="furniture"
                            className="form-control custom-input"
                            value={apartment.furniture}
                            onChange={(e) => setApartment({...apartment, furniture: e.target.value})}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="technique" className="form-label">Техника:</label>
                        <input
                            type="text"
                            id="technique"
                            className="form-control custom-input"
                            value={apartment.technique}
                            onChange={(e) => setApartment({...apartment, technique: e.target.value})}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="internetTv" className="form-label">Интернет и ТВ:</label>
                        <select
                            id="internetTv"
                            className="form-select custom-input"
                            value={apartment.internetTv ? 'yes' : 'no'}
                            onChange={(e) => setApartment({...apartment, internetTv: e.target.value === 'yes'})}
                        >
                            <option value="yes">Есть</option>
                            <option value="no">Нет</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="isValid" className="form-label">Объявление актуально:</label>
                        <select
                            id="isValid"
                            className="form-select custom-input"
                            value={apartment.isValid ? 'yes' : 'no'}
                            onChange={(e) => setApartment({...apartment, isValid: e.target.value === 'yes'})}
                        >
                            <option value="yes">Да</option>
                            <option value="no">Нет</option>
                        </select>
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Отправка...' : 'Создать'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateApartment;

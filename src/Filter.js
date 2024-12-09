import axios from "axios";
import { useState } from "react";

function Filter() {
    const [filters, setFilters] = useState({
        priceMin: "",
        priceMax: "",
        countOfRoomsMin: "",
        countOfRoomsMax: "",
        squareMin: "",
        squareMax: "",
        floorMin: "",
        floorMax: "",
        isBalcony: false,
        totalFloorMin: "",
        totalFloorMax: "",
        bathroomIsShared: false,
        countOfBathroomsMin: "",
        countOfBathroomsMax: "",
        internetTv: false,
        utilitiesIncluded: false,
        withKids: false,
        withPets: false,
        smoke: false,
        isValid: false,
        type: "rent", // По умолчанию - аренда
    });

    const [apartments, setApartments] = useState([]);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const fetchFilteredApartments = async () => {
        const endpoint =
            filters.type === "rent"
                ? "http://localhost:5165/api/ApartmentRent/filtered"
                : "http://localhost:5165/api/ApartmentSell/filtered";

        // Очищаем фильтры с пустыми значениями, если они не обязательны
        const params = Object.keys(filters).reduce((acc, key) => {
            if (filters[key] !== "" && filters[key] !== false) {
                acc[key] = filters[key];
            }
            return acc;
        }, {});

        try {
            console.log("Отправка запроса с фильтрами:", params); // Логируем параметры запроса
            const response = await axios.get(endpoint, {
                params: params,
                withCredentials: true,
            });

            console.log("API Response:", response.data); // Логируем ответ от API

            const apartmentsData = response.data.$values || [];
            setApartments(apartmentsData);
        } catch (err) {
            console.error("Ошибка при получении данных:", err);
            setError(err.message || "Ошибка при получении данных");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Фильтр поиска квартир</h1>
            <div className="row g-3">
                {/* Тип квартиры */}
                <div className="col-md-4">
                    <div className="form-group">
                        <select
                            id="type"
                            name="type"
                            className="form-select"
                            value={filters.type}
                            onChange={handleInputChange}
                        >
                            <option value="rent">Аренда</option>
                            <option value="sell">Продажа</option>
                        </select>
                    </div>
                </div>

                {/* Фильтры */}
                <div className="col-md-4">
                    <input
                        type="number"
                        className="form-control"
                        name="priceMin"
                        placeholder="Минимальная цена"
                        value={filters.priceMin}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="number"
                        className="form-control"
                        name="priceMax"
                        placeholder="Максимальная цена"
                        value={filters.priceMax}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="number"
                        className="form-control"
                        name="countOfRoomsMin"
                        placeholder="Мин. кол-во комнат"
                        value={filters.countOfRoomsMin}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="number"
                        className="form-control"
                        name="countOfRoomsMax"
                        placeholder="Макс. кол-во комнат"
                        value={filters.countOfRoomsMax}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="number"
                        className="form-control"
                        name="squareMin"
                        placeholder="Мин. площадь (м²)"
                        value={filters.squareMin}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="number"
                        className="form-control"
                        name="squareMax"
                        placeholder="Макс. площадь (м²)"
                        value={filters.squareMax}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="number"
                        className="form-control"
                        name="floorMin"
                        placeholder="Мин. этаж"
                        value={filters.floorMin}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <input
                        type="number"
                        className="form-control"
                        name="floorMax"
                        placeholder="Макс. этаж"
                        value={filters.floorMax}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-4">
                    <div className="form-check d-flex align-items-center justify-content-between">
                        <label className="form-check-label mb-0">Балкон</label>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="isBalcony"
                            checked={filters.isBalcony}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-check d-flex align-items-center justify-content-between">
                        <label className="form-check-label mb-0">Общий санузел</label>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="bathroomIsShared"
                            checked={filters.bathroomIsShared}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="form-check d-flex align-items-center justify-content-between">
                        <label className="form-check-label mb-0">Интернет/ТВ</label>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="internetTv"
                            checked={filters.internetTv}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>

            {/* Кнопка для поиска */}
            <button
                className="btn btn-primary mt-4 w-100"
                onClick={fetchFilteredApartments}
            >
                Найти квартиры
            </button>

            {/* Отображение ошибок */}
            {error && <div className="alert alert-danger mt-4">{error}</div>}

            {/* Список квартир */}
            <ApartmentList apartments={apartments} />
        </div>
    );
}

function ApartmentList({ apartments }) {
    if (!Array.isArray(apartments) || apartments.length === 0) {
        return <div className="mt-4 alert alert-info">Нет доступных квартир</div>;
    }

    return (
        <div className="container">
            <br />
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {apartments.length === 0 ? (
                    <div className="col-12">
                        <div className="alert alert-info">Нет доступных квартир</div>
                    </div>
                ) : (
                    apartments.map((apartment, index) => (
                        <div className="col" key={apartment.id}>
                            <div className="card shadow-sm">
                                {/* Для примера используем плейсхолдер для изображения */}
                                <svg className="bd-placeholder-img card-img-top" width="100%" height="225"
                                     xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail"
                                     preserveAspectRatio="xMidYMid slice" focusable="false">
                                    <title>Placeholder</title>
                                    <rect width="100%" height="100%" fill="#55595c"></rect>
                                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">Фото</text>
                                </svg>
                                <div className="card-body">
                                    <h5 className="card-title">{apartment.name}</h5>
                                    <p className="card-text">
                                        <strong>Цена:</strong> {apartment.price} руб.<br />
                                        <strong>Комнаты:</strong> {apartment.countOfRooms}<br />
                                        <strong>Площадь:</strong> {apartment.square} м²
                                    </p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="btn-group">
                                            <a href={`/apartment/${apartment.id}`} className="btn btn-large btn-outline-secondary">
                                                Подробнее
                                            </a>
                                        </div>
                                        <small className="text-body-secondary">{apartment.isValid ? "Доступно" : "Не доступно"}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <br />
        </div>
    );
}

export default Filter;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

function Profile() {
    const [profile, setProfile] = useState(null);
    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(null);  // Состояние для хранения ID
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const authToken = Cookies.get("AuthToken");

            if (authToken) {
                try {
                    // Декодируем JWT токен
                    const decodedToken = jwt_decode(authToken);

                    // Извлекаем роль из токена
                    const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
                    setRole(userRole); // Устанавливаем роль

                    // В зависимости от роли, извлекаем соответствующий ID
                    let userId = null;

                    if (userRole === "agent") {
                        userId = decodedToken["agentId"];  // Получаем ID агента
                    } else if (userRole === "client") {
                        userId = decodedToken["clientId"];  // Получаем ID клиента
                    }

                    setUserId(userId);  // Устанавливаем userId
                    console.log('Роль:', userRole, 'ID:', userId);  // Лог для проверки

                    // После того, как роль и ID извлечены, запрашиваем профиль
                    let url;
                    if (userRole === 'client') {
                        url = `http://localhost:5165/api/Auth/Client/${userId}`;
                    } else if (userRole === 'agent') {
                        url = `http://localhost:5165/api/Auth/Agent/${userId}`;
                    } else {
                        setError("Неизвестная роль");
                        return;
                    }

                    const response = await axios.get(url);
                    setProfile(response.data);
                } catch (err) {
                    console.error("Ошибка при декодировании токена:", err);
                    setError("Ошибка при проверке данных пользователя");
                }
            } else {
                setError("Токен не найден");
            }
        };

        fetchProfile(); // Запросить профиль при наличии токена

    }, []); // Выполняем один раз при монтировании компонента

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!profile) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Профиль {role === 'client' ? 'Клиента' : 'Агента'}</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="profile-photo">
                        {profile.photoPath ? (
                            <img src={profile.photoPath} alt="Profile" className="img-fluid rounded-circle" />
                        ) : (
                            <div className="no-photo text-center">Фото нет</div>
                        )}
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="profile-info">
                        <p><strong>Имя:</strong> {profile.name}</p>
                        <p><strong>Фамилия:</strong> {profile.surname}</p>
                        <p><strong>Отчество:</strong> {profile.patronymic}</p>
                        <p><strong>Телефон:</strong> {profile.phone}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Рейтинг:</strong> {profile.rating}</p>
                        <p><strong>Агентство:</strong> {profile.agencyId || 'Не указано'}</p>

                        {/* Выводим список агентов (если есть) */}
                        <div>
                            <strong>Агенты:</strong>
                            {profile.agents && profile.agents.$values.length > 0 ? (
                                <ul className="list-group">
                                    {profile.agents.$values.map((agent, index) => (
                                        <li key={index} className="list-group-item">{agent.name}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Агенты отсутствуют</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;

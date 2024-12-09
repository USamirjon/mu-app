import axios from "axios";
import { useState, useEffect } from "react";  // Импортируем useState
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export function handleLogout() {
    Cookies.remove("AuthToken");
    Cookies.remove("isLoggedIn");
    window.location.href = "/";
}

// Хук для проверки авторизации
export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authToken = Cookies.get("AuthToken");
        setIsAuthenticated(!!authToken); // Установить true, если токен есть
    }, []);

    return isAuthenticated;
}
// Компонент для регистрации
export function Signup() {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        surname: "",
        password: "",
        userType: "client",  // Добавляем состояние для типа пользователя
    });
    const [passwordError, setPasswordError] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Для ошибок
    const [formError, setFormError] = useState(""); // Для отображения ошибки, если поле пустое
    const navigate = useNavigate();

    // Регулярное выражение для проверки пароля
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*.,])[A-Za-z\d!@#$%^&*.,]{6,}$/;

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // Обработчик выбора типа пользователя
    const handleUserTypeChange = (e) => {
        setFormData({ ...formData, userType: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверка на пустые поля
        if (!formData.email || !formData.password || (!formData.name || !formData.surname)) {
            setFormError("Пожалуйста, заполните все поля.");
            return;
        } else {
            setFormError("");
        }

        // Проверка пароля
        if (!passwordRegex.test(formData.password)) {
            setPasswordError(
                "Пароль должен содержать не менее 6 символов, хотя бы одну цифру, одну заглавную букву, одну строчную букву и спецсимвол (например, @, #, $, .)"
            );
            return;
        } else {
            setPasswordError("");
        }

        try {
            // Определяем URL в зависимости от выбранного типа пользователя
            const url = formData.userType === "client"
                ? "http://localhost:5165/api/Auth/Client"
                : "http://localhost:5165/api/Auth/Agent";  // Если выбран "агент"

            // Отправка запроса на регистрацию
            const response = await axios.post(
                url,
                {
                    email: formData.email,
                    name: formData.name,
                    surname: formData.surname,
                    password: formData.password,
                },
                {
                    withCredentials: true,
                }
            );
            console.log("Регистрация успешна", response.data);

            // После успешной регистрации, авторизуем пользователя
            const loginResponse = await axios.post(
                "http://localhost:5165/api/Auth/login",
                {
                    email: formData.email,
                    password: formData.password,
                },
                {
                    withCredentials: true,
                }
            );
            console.log("Авторизация успешна", loginResponse.data);

            // Сохранение токена и статуса авторизации в cookies
            Cookies.set("AuthToken", loginResponse.data.token);
            Cookies.set("isLoggedIn", true);

            // Перезагрузка страницы после успешной авторизации
            window.location.href = "/"; // Это вызовет перезагрузку страницы
        } catch (error) {
            console.error("Ошибка регистрации", error.response?.data || error.message);
            setErrorMessage("Произошла ошибка при регистрации. Попробуйте позже.");
        }
    };

    return (
        <div>
            <br />
            <main className="container w-25 m-auto">
                <form className="form-signup" onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Регистрация</h1>

                    {formError && <div className="alert alert-warning">{formError}</div>}
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="name@example.com"
                            onChange={handleChange}
                        />
                        <label htmlFor="email">Адрес электронной почты</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="surname"
                            placeholder="Фамилия"
                            onChange={handleChange}
                        />
                        <label htmlFor="surname">Фамилия</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Имя"
                            onChange={handleChange}
                        />
                        <label htmlFor="name">Имя</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Пароль"
                            onChange={handleChange}
                        />
                        <label htmlFor="password">Пароль</label>
                        <small className="form-text text-muted">
                            Пароль должен содержать не менее 6 символов, хотя бы одну цифру, одну заглавную букву, одну строчную букву и спецсимвол (например, @, #, $, .)
                        </small>
                    </div>

                    {passwordError && <div className="alert alert-warning">{passwordError}</div>}

                    {/* Выпадающее меню для выбора типа пользователя */}
                    <div className="form-floating mb-3">
                        <select
                            className="form-control"
                            id="userType"
                            onChange={handleUserTypeChange}
                            value={formData.userType}
                        >
                            <option value="client">Клиент</option>
                            <option value="agent">Агент</option>
                        </select>
                        <label htmlFor="userType">Тип пользователя</label>
                    </div>

                    <button className="btn btn-primary w-100 py-2" type="submit">
                        Зарегистрироваться
                    </button>
                    <p className="mt-5 mb-3 text-body-secondary">© жизнь прекрасна))</p>
                </form>
            </main>
        </div>
    );
}

// Компонент для входа
export function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Отправляем запрос на сервер для авторизации
            const response = await axios.post("http://localhost:5165/api/Auth/login", {
                email: formData.email,
                password: formData.password,
            },{
                withCredentials: true, // Важно для передачи cookies
            });

            console.log("Вход успешен:", response.data);

            // Извлекаем токен из ответа
            const token = response.data.token; // Токен находится в response.data.token
            if (!token) {
                throw new Error("Токен отсутствует в ответе от сервера");
            }

            // Сохранение токена и статуса авторизации в cookies
            Cookies.set("AuthToken", token);
            Cookies.set("isLoggedIn", true);

            // Перенаправление на главную страницу после успешного входа
            window.location.href = "/";
        } catch (error) {
            // Логирование ошибки для отладки
            console.error("Ошибка входа:", error.response?.data || error.message);

            // Можно добавить отображение сообщения об ошибке для пользователя
            alert("Ошибка при входе. Пожалуйста, попробуйте еще раз.");
        }
    };

    return (
        <div>
            <br />
            <main className="container w-25 m-auto">
                <form className="form-signup" onSubmit={handleSubmit}>
                    <h1 className="h3 mb-3 fw-normal">Пожалуйста, войдите</h1>

                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="name@example.com"
                            onChange={handleChange}
                        />
                        <label htmlFor="email">Адрес электронной почты</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Пароль"
                            onChange={handleChange}
                        />
                        <label htmlFor="password">Пароль</label>
                    </div>

                    <button className="btn btn-primary w-100 py-2" type="submit">
                        Войти
                    </button>
                    <p className="mt-5 mb-3 text-body-secondary">© наверное</p>
                </form>
            </main>
        </div>
    );
}

export function Signup() {
    return (
        <div>
            <br />
            <main className="container w-25 m-auto">

                <form className="form-signup">
                    <h1 className="h3 mb-3 fw-normal">Регистрация</h1>

                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                        <label htmlFor="floatingInput">Адрес электронной почты</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                        <label htmlFor="floatingInput">Фамилия</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                        <label htmlFor="floatingInput">Имя</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Пароль"/>
                        <label htmlFor="floatingPassword">Пароль</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Пароль"/>
                        <label htmlFor="floatingPassword">Повторите пароль</label>
                    </div>


                    <button className="btn btn-primary w-100 py-2" type="submit">Зарегестрироваться</button>
                    <p className="mt-5 mb-3 text-body-secondary">© жизнь прекрасна))</p>
                </form>
            </main>
        </div>
    );
}

export function Login() {
    return (
        <div>
            <br/>
            <main className="container w-25 m-auto">

                <form className="form-signup">
                    <h1 className="h3 mb-3 fw-normal">Пожалуйста, войдите</h1>

                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                        <label htmlFor="floatingInput">Адрес электронной почты</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Пароль"/>
                        <label htmlFor="floatingPassword">Пароль</label>
                    </div>

                    <div className="form-check text-start my-3">
                        <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Запомнить меня
                        </label>
                    </div>
                    <button className="btn btn-primary w-100 py-2" type="submit">Войти</button>
                    <p className="mt-5 mb-3 text-body-secondary">© наверное</p>
                </form>
            </main>
        </div>
    );
}

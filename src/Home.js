import React from 'react';


function Home() {
    const items = ['Apple', 'Banana', 'Orange','Apple'];
    return (
        <div className="container">
            <br/>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                {items.map((item, index) => (
                    <div className="col">
                        <div className="card shadow-sm">
                            <svg className="bd-placeholder-img card-img-top" width="100%" height="225"
                                 xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail"
                                 preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
                                <rect width="100%" height="100%" fill="#55595c"></rect>
                                <text x="50%" y="50%" fill="#eceeef" dy=".3em">{item}</text>
                            </svg>
                            <div className="card-body">
                                <p className="card-text">This is a wider card {index} with supporting text below as a
                                    natural
                                    lead-in to additional content. This content is a little bit longer.</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <a href="AboutAd" className="btn btn-large btn-outline-secondary">View</a>
                                    </div>
                                    <small className="text-body-secondary">9 mins</small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <br/>
        </div>

    );
}

export default Home;
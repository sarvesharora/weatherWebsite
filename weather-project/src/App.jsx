import { useState, useEffect } from "react";
import "./App.css";

function App() {
    const [location, setLocation] = useState("Delhi");
    const [weatherData, setWeatherData] = useState(undefined);
    const [weathercode, setWeatherCode] = useState(800);
    const fetchdata = async () => {
        try {
            let URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${
                import.meta.env.VITE_API_KEY
            }&units=metric`;
            console.log(URL);
            let res = await fetch(URL);
            let jss = await res.json();
            setWeatherData(jss);
            const code = parseInt(parseInt(jss?.weather[0]?.id) / 100) * 100;
            console.log(code);
            setWeatherCode(code);
            console.log(jss?.main?.temp);
        } catch (err) {
            console.error(err);
            setWeatherData(undefined);
        }
    };
    useEffect(() => {
        console.log("calling useeffect");
        fetchdata();
    }, []);

    const videolinks = {
        800: "https://videos.pond5.com/white-clouds-flying-blue-sky-footage-105291868_main_xxl.mp4",
        600: "https://videos.pond5.com/beautiful-snowflakes-are-falling-blue-footage-074853278_main_xxl.mp4",
        500: "https://videos.pond5.com/water-drops-sliding-down-misted-footage-107414826_main_xxl.mp4",
        200: "https://videos.pond5.com/thunderstorms-clouds-thunder-and-lightning-footage-043969406_main_xxl.mp4",
        700: "https://videos.pond5.com/sun-and-rays-move-through-footage-000378455_main_xxl.mp4",
    };
    return (
        <>
            <reactLogo />
            <video
                className="background-video"
                autoPlay
                loop
                muted
                src={videolinks[weathercode]}
            />

            <div className="weather-display">
                <h1 className="location">{weatherData?.name}</h1>
                <div>
                    <input
                        type="text"
                        value={location}
                        onChange={(event) => {
                            setLocation(event.target.value);
                        }}
                    />

                    <button
                        onClick={() => {
                            fetchdata();
                        }}
                    >
                        submit
                    </button>
                </div>
                {weatherData ? (
                    <div className="weather-data">
                        <img
                            src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`}
                            className="weather-image"
                        ></img>
                        <h1 className="temprature">
                            {weatherData?.main?.temp} °c
                        </h1>
                        <h2>
                            {weatherData?.weather[0]?.description}{" "}
                            &nbsp;&nbsp;&nbsp;
                            {weatherData?.main?.temp_max}°/
                            {weatherData?.main?.temp_min}°
                        </h2>
                    </div>
                ) : (
                    <h1>loading... </h1>
                )}
            </div>
            {/* <Weather /> */}
        </>
    );
}

export default App;

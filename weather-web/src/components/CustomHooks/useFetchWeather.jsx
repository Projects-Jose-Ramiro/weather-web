import useSWR from "swr";

const APIkey = "aeaf7cf564ad8ca31f5c487b4cf0faf4"

const fetcher = url => fetch(url).then( response => response.json())

export function useFetchWeather(cityName) {

    const { data, error} = useSWR(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`,
        fetcher)

    return { data, error, loading: !data && !error }
}
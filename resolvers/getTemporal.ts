export const getTemporal = async (capital:string): Promise<string> =>{
    const URL_BASE = "http://api.weatherapi.com/v1/current.json";
    const API_KEY = "42dd204836ee487d8dd161930230311";
    const url = `${URL_BASE}?key=${API_KEY}&q=${capital}`;

    const data = await fetch(url);
    const json = await data.json();

    return json.current.condition.text;

}
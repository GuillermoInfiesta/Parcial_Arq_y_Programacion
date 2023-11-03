export const getHora = async(nomContinente: string, nomCapital: string): Promise<string>  => {
    const URL_BASE = "http://worldtimeapi.org/api/timezone/"
    const url = `${URL_BASE}${nomContinente}/${nomCapital}`;
    const data = await fetch(url);
    const json = await data.json();

    return json.datetime;
}
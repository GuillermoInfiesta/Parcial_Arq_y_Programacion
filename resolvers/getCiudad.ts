export const getCiudad = async (codPostal: string, codIso: string): Promise<string> => {
    const URL_BASE = "https://zip-api.eu/api/v1/info/"
    const url = `${URL_BASE}${codIso}-${codPostal}`;

    const data = await fetch(url);

    if(data.status !== 200){
        throw new Error("El iso y codigo postal no coinciden");
    }

    const json = await data.json();

    return json.place_name;
}
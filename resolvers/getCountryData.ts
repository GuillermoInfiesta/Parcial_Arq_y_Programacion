
type Pais = {
    nomPais: string,
    nomContinente: string;
}
export const getCountryData = async (codIso: string):Promise<Pais> => {
    const URL_BASE = "https://restcountries.com/v3.1/alpha/";
    const url = `${URL_BASE}${codIso}`

    const data = await fetch(url);
    if(data.status !== 200){
        throw new Error("El codigo ISO no existe");
    }

    const json = await data.json();

    return {
        nomPais: json[0].name.common,
        nomContinente: json[0].region,
    }
}
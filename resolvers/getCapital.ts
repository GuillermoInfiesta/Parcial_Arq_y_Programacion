export const getCapital = async(codIso: string):Promise<string> => {
    
    const URL_BASE = "https://restcountries.com/v3.1/alpha/";
    const url = `${URL_BASE}${codIso}`

    const data = await fetch(url);
    if(data.status !== 200){
        throw new Error("El codigo ISO no existe");
    }

    const json = await data.json();

    return json[0].capital;
} 
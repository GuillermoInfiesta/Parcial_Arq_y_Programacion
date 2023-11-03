
export const checkIdLength = (id: string): void => {
    
    if(id.length != 24){
        throw new Error(`Longitud del id ${id} incorrecta`)
    }
}
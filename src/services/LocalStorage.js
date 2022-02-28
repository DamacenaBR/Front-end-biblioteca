
export default class LocalStorageService{

    static addItem(chave, valor){
        localStorage.setItem(chave,valor)
    }

    static getItem(chave){
        return localStorage.getItem(chave)
    }

    static removeItem(chave){
        localStorage.removeItem(chave)
    }
}
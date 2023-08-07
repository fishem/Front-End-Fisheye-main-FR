class ContentsFactory{
    constructor(data, type, pageId = null) {
        // Si le type correspond à l'ancienne API, alors retourne moi l'ancien formattage
        if (type === 'photo') {
            return new Photographers(data)
        // Sinon retourne moi le nouveau formattage
        } else if (type === 'media') {
            return new Media(data)
        // Une bonne pratique est de throw une erreur si le format n'est pas reconnu
        } else {
            throw 'Unknown type format'
        }
    }
}

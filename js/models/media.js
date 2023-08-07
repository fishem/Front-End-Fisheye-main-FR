class Media{
    constructor(media){
        this._id = media.id
        this._photographerId = media.photographerId
        this._title = media.title
        this._image = media.image
        this._likes = media.likes
        this._date = media.date
        this._price = media.price
        this._video = media.video
    }

    get mediaId(){
        return this._id 
    }

    get photographerId(){
        return this._photographerId
    }
    
    get title(){
        return this._title
    }

    get likes(){
        return this._likes
    }

    get date(){
        return this._date
    }
    get price(){
        return this._price
    }

    get path(){
        return `assets/photos/${this._photographerId}/${this._image}`;
    }

    get type(){
        if(this._image){
            return 'image';
        }else if(this._video){
            return 'video';
        }
    }
}
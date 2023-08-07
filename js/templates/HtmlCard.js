class Card {
    constructor(photographers, media, id, type) {
        this._photographers = photographers
        this._media = media
        this._id = id
        this._type = type
    }

    createIndexCard() {
        const $wrapper = document.createElement('div')
        $wrapper.classList.add('photographer-card-wrapper')

        const indexCard = `
        <article>
            <a id="${this._photographers.id}" href="./photographer.html?id=${this._photographers.id}">
                <img src="${this._photographers.picture}" alt="Profile picture of ${this._photographers.name}">
                <h2>${this._photographers.name}</h2>
            </a>
            <div>
                <h3>${this._photographers.location}</h3>
                <p>${this._photographers.tagline}</p>
                <p class="rate">${this._photographers.rate}</p>
            </div>
        </article>
        `
        $wrapper.innerHTML = indexCard
        return $wrapper

    }

    createProfilCard() {
        const $wrapper = document.createElement('div')
        $wrapper.classList.add('block-profil')

        const profilCard = `
        <div class="photographer_info">
            <h1>${this._photographers.name}</h1>
            <h2>${this._photographers.location}</h3>
            <p>${this._photographers.tagline}</p>
        </div>
        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
        <img src="assets/photographers/Photographers ID Photos/${this._photographers.portrait}" alt="Profil picture of ${this._photographers.name}"></img>
        `

        $wrapper.innerHTML = profilCard

        return $wrapper
    }

    createContentCard() {

        const $wrapper = document.createElement('div')
        $wrapper.classList.add('content')

        let mediaElement;

        if (this._type === 'image') {
            mediaElement = `<a href="assets/photographers/${this._id}/${this._media._image}" >
                                <img class="content__media thumb-img" src="assets/photographers/${this._id}/${this._media._image}" alt="${this._media.title}" data-date="${this._media._date}"/>
                            </a>`
        } else if (this._type === 'video') {
            mediaElement = `<a href="assets/photographers/${this._id}/${this._media._video}">
                                <video class="thumb-img" controls preload="metadata" title="${this._media.title}" data-date="${this._media._date}">
                                    <source src="assets/photographers/${this._id}/${this._media._video}"  type="video/mp4"/>
                                    Your browser does not support the video element.
                                </video>
                            </a>`;
        }

        const contentCard = ` <div class="thumb-imgfull">
        <div class="thumb-img">
            ${mediaElement}
        </div>
        <div class="thumb-info">
            <h3 class="image_title">${this._media.title}</h3>
            <div class="likes">
                <span id="numbersOfLikes">${this._media.likes}</span>
                <i id="likeImage" class="fa-solid fa-heart"></i>
            </div>
        </div>
    </div>`
        $wrapper.innerHTML = contentCard

        return $wrapper
    }

}


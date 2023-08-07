
import { enableBodyScroll, disableBodyScroll } from './body-scroll-lock.js'

class Lightbox {
    static init() {
        setTimeout(() => {
            const thumbsImg = document.querySelectorAll('.thumb-img')

            thumbsImg.forEach(thumbImg => {
                thumbImg.addEventListener('click', e => {
                    e.preventDefault()
                    // https://stackoverflow.com/questions/22119673/find-the-closest-ancestor-element-that-has-a-specific-class
                    // Retrieve the ancestor for the title
                    const content = thumbImg.closest(".content")
                    const titleImage = content.querySelector('.image_title').textContent

                    const url = thumbImg.querySelector('a').getAttribute('href') // To check w/ Rudy why error when we use thumbImg.getAttribute('href')
                    const links = Array.from(document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]'))
                    const imagesGallery = links.map(link => link.getAttribute('href'))

                    const h3s = Array.from(document.querySelectorAll('.image_title'));
                    const titleGallery = h3s.map(h3 => h3.textContent);

                    new Lightbox(url, imagesGallery, titleImage, titleGallery)
                })
            })
        }, 300)
    }
    constructor(url, imagesGallery, titleImage, titleGallery) {
        this.url = url
        this.titleImage = titleImage
        this.images = imagesGallery
        this.titleGallery = titleGallery
        this.element = this.buildDOM()
        this.loadImage(url, titleImage)
        // debugger

        this.onKeyUp = this.onKeyUp.bind(this)
        document.body.appendChild(this.element)
        disableBodyScroll(this.element)
        document.addEventListener('keyup', this.onKeyUp)
    }
    loadImage(url, titleImage) {
        this.url = null
        this.titleImage = null
        const mediaType = url.split(".")[1]
        const image = new Image()
        const container = this.element.querySelector('.lightbox__container')
        container.innerHTML = ''

        if (mediaType === 'jpg') {
            image.onload = () => {
                container.appendChild(image)
                this.url = url
                this.titleImage = titleImage
                container.append(this.titleImage)
            }

            image.src = url

        } else {
            this.url = url
            this.titleImage = titleImage
            container.innerHTML = `<video controls preload="metadata"> <source src="${url}"  type="video/mp4"/></video>`
            container.append(this.titleImage)
        }
    }


    onKeyUp(e) {
        if (e.key === 'Escape') {
            this.close(e)
        } if (e.key === 'ArrowLeft') {
            this.prev(e)
        } if (e.key === 'ArrowRight') {
            this.next(e)
        }
    }

    close(e) {
        e.preventDefault()
        this.element.classList.add('fadeOut')
        enableBodyScroll(this.element)
        window.setTimeout(() => {
            this.element.parentElement.removeChild(this.element)
        }, 500)
        document.removeEventListener('keyup', this.onKeyUp)
    }

    prev(e) {
        e.preventDefault()
        let position = this.images.findIndex(image => image === this.url)
        let titlePosition = this.titleGallery.findIndex(title => title === this.titleImage)

        if (position == 0 && titlePosition == 0) {
            position = this.images.length
            titlePosition = this.titleGallery.length

        }
        this.loadImage(this.images[position - 1], this.titleGallery[titlePosition - 1])
        // debugger
    }



    next(e) {
        e.preventDefault()
        let position = this.images.findIndex(image => image === this.url)
        let titlePosition = this.titleGallery.findIndex(title => title === this.titleImage)
        if (position == this.images.length - 1 && titlePosition == this.titleGallery.length - 1) {
            position = -1
            titlePosition = -1
        }
        this.loadImage(this.images[position + 1], this.titleGallery[titlePosition + 1])
    }



    buildDOM() {
        const $wrapper = document.createElement('div')
        $wrapper.classList.add('lightbox')
        $wrapper.role = "dialog"
        $wrapper.innerHTML = `<button class="lightbox__close">
            <i class="fa-solid fa-xmark"></i>
         </button>
         <button class="lightbox__next">
           <i class="fa-solid fa-chevron-right"></i>
         </button>
       
         <button class="lightbox__prev">
           <i class="fa-solid fa-chevron-left"></i>
         </button>
         <div class="lightbox__container">
              <div class="lightbox__loader"></div>
         </div>`
        $wrapper.querySelector('.lightbox__close').addEventListener('click', this.close.bind(this))
        $wrapper.querySelector('.lightbox__next').addEventListener('click', this.next.bind(this))
        $wrapper.querySelector('.lightbox__prev').addEventListener('click', this.prev.bind(this))
        return $wrapper
    }

}



Lightbox.init()
class App {
    constructor(){
        this.$photographersWrapper = document.querySelector(".photographer_section");
        this.photographersApi = new PhotographersApi('/data/photographers.json')
    }

    async main(){
        // fetch data from API
        const photographersData = await this.photographersApi.get()
        console.log("tty", photographersData)

        // Add data transformation by type (photo or media)
        const photographers = photographersData.photographers.map(content => new ContentsFactory(content, 'photo'))
        const media = photographersData.media.map(content => new ContentsFactory(content, 'media'))


        photographers.forEach(element => {
            const Template = new Card(element)
            this.$photographersWrapper.appendChild(
                Template.createIndexCard()
            )
        });
    }
}

const app = new App()
app.main()
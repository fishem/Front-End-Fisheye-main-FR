class App {
  constructor() {
    this._queryString = window.location.search;
    this.$photographersWrapper = document.querySelector(".photographer_header");
    this.$contentWrapper = document.querySelector(".picture_section");
    this.photographersApi = new PhotographersApi('data/photographers.json');

    this.dataMedia = []; // Initialize as empty arrays or appropriate initial values
    this.photograph = null;
    this.pageId = this.PageId; // Initialize pageId using the getter

  }

  get PageId() {
    const urlParams = new URLSearchParams(this._queryString);
    return urlParams.get("id");
  }


  async main() {
    const photographersData = await this.photographersApi.get();
    const media = photographersData.media.map(content => new ContentsFactory(content, 'media'));
    
    this.photograph = new Photographers(photographersData.photographers.find(obj => obj.id === +this.pageId));
    this.dataMedia = media.filter(obj => obj.photographerId === +this.pageId);
    
    const formTitle = document.querySelector('#formName')
    formTitle.innerHTML = 'Contactez-moi '+ '<br />' + this.photograph._name

    this.renderProfilCard(this.photograph);
    this.renderContentCards(this.dataMedia, this.photograph, this.pageId);
    this.renderIndexCards(this.photograph);
  }



  showDropdown() {
    const dropdown = document.querySelector('.dropdown ');
    const button = document.getElementById("dropdownButton");
    const select = Array.from(document.querySelectorAll('.select'))
    const listOfLi = select.map(elem => elem.getAttribute('data-value'))
    const dropdownMenu = document.querySelector('.dropdown-options')
    const dropdownMenuItems = dropdownMenu.children



    
    dropdown.onclick = function () {
      dropdown.classList.toggle('activate');
      listOfLi.forEach(value => {
        const li = document.querySelector(`li[data-value="${value}"]`);
        if (value === button.getAttribute('data-value')) {
          li.style.display = 'none';
        } else {
          li.style.display = 'block';
        }
      });


    };

    let active = -1
    document.addEventListener('keydown', function(e){
      if(e.key==='ArrowDown'){
        if(active<dropdownMenuItems.length-1){
          active++
          dropdownMenuItems[active].querySelector('a').focus()

        }
      }else if (e.key==='ArrowUp'){
        if(active>-1){
          active--
          dropdownMenuItems[active].querySelector('a').focus()

        }
        
      }
    })

  }


  selectOption(liElement) {
    const selectedValue = liElement.getAttribute("data-value");
    const button = document.getElementById("dropdownButton");
    button.innerText = selectedValue;
    button.dataset.value = selectedValue

    this.photoFilter(selectedValue, this.dataMedia, this.photograph, this.pageId);
    setTimeout(()=>{Lightbox.init()},300)

  }

  renderProfilCard(photographer) {
    const template = new Card(photographer);
    this.$photographersWrapper.appendChild(template.createProfilCard());
  }

  renderContentCards(dataMedia, photographer, pageId) {
    dataMedia.forEach(element => {
      const templateMedia = new Card(photographer, element, pageId, element.type);
      this.$contentWrapper.appendChild(templateMedia.createContentCard());
    });
  }

  sortAndRenderContentCards(dataMedia, photographer, pageId, sortFunction) {
    const dataMediaCopy = dataMedia.slice();
    const sortedMedia = dataMediaCopy.sort(sortFunction);
    this.renderContentCards(sortedMedia, photographer, pageId);
  }

  renderIndexCards(photograph) {

    const likeDivs = document.querySelectorAll('.likes')
    let originCountLikes = Array.from(document.querySelectorAll('#numbersOfLikes')).map(like => parseInt(like.innerHTML))
    originCountLikes = originCountLikes.reduce((acc, curr) => acc + curr, 0)
    document.querySelector('.sum_likes').innerHTML = originCountLikes
    const ratePlaceholder = document.getElementById('rate_placeholder');
    ratePlaceholder.innerHTML = photograph.rate;


    likeDivs.forEach(likeDiv => {
      let numberOfClick = 0

      likeDiv.addEventListener('click', function (e) {
        e.preventDefault()
        numberOfClick += 1

        if (numberOfClick === 1) {
          const spanNumberOfLikes = likeDiv.querySelector('#numbersOfLikes')
          const valueAdded = parseInt(spanNumberOfLikes.innerHTML) + 1
          spanNumberOfLikes.innerHTML = valueAdded
          document.querySelector('.sum_likes').innerHTML = originCountLikes += 1;

        }

      })
    })
  }

  photoFilter(selectValue, dataMedia, photograph, pageId) {
    this.$contentWrapper.innerHTML = '';
    if (selectValue === 'Popularité') {
      this.sortAndRenderContentCards(dataMedia, photograph, pageId, (a, b) => b.likes - a.likes);
    } else if (selectValue === 'Date') {
      this.sortAndRenderContentCards(dataMedia, photograph, pageId, (a, b) => a.date.localeCompare(b.date));
    } else if (selectValue === 'Titre') {
      this.sortAndRenderContentCards(dataMedia, photograph, pageId, (a, b) => a.title.localeCompare(b.title));
    } else {
    }
  }

}

const app = new App();
app.main();


window.showDropdown = app.showDropdown.bind(app);

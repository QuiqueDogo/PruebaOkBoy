let movieRender;

const searchMovies = () => {
    const titleName = document.getElementById('title').value;
    const url = `https://www.omdbapi.com/?t=${titleName}=&apikey=4502efc4`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        (data.Response != "False") ? renderMovieList(data) : alert(data?.Error)
    } );

}
const renderMovieList = (movies) => {
    movieRender = movies;
    let filterMovies = [];
    let element = document.querySelector(".inf");
    while (element.firstChild) {
    element.removeChild(element.firstChild);
    }

    let cards = document.querySelector(".allcard");
    while (cards.firstChild) {
    cards.removeChild(cards.firstChild);
    }
    let getMovies = JSON.parse(localStorage.getItem("movies"))
    

    if (getMovies !== null) {   
         filterMovies = getMovies.filter(element => element.Title == movieRender.Title)
    }
    document.querySelector('.card').style.display = 'block';
    document.getElementById('movie_img').setAttribute('src',movies?.Poster)
    let info = document.querySelector('.inf')
    let title = document.createElement('h2')
    title.innerHTML = `${movies.Title}`
    let genre = document.createElement('p')
    genre.innerHTML = `Genero: ${movies.Genre}`
    let description = document.createElement('p')
    description.innerHTML = `Descripcion ${movies.Plot}`
    let btnAdd = document.createElement('button')
    btnAdd.innerHTML = "Agregar Fav"
    btnAdd.setAttribute('onclick','addToFavorites()')
    
    info.append(title)
    info.append(genre)
    info.append(description)
    info.append(btnAdd)
    if(filterMovies.length !== 0  ){
        
        let btnRem = document.createElement('button')
        btnRem.innerHTML = "Quitar Fav"
        btnRem.setAttribute('onclick','removeFromFavorites()')
        info.append(btnRem)
    }
    renderFavoritesList()
}

const addToFavorites = () => {
    let movies;
    if (localStorage.getItem("movies") === null ) {
        movies = [];
    }else{
        movies = JSON.parse(localStorage.getItem("movies"));
    }
    let filterMovies = movies.filter(element => element?.Title == movieRender.Title)
    if(filterMovies.length == 0  ){
        movies.push(movieRender)
        localStorage.setItem("movies", JSON.stringify(movies))
        alert('Pelicula agregada')
        renderFavoritesList()
    }else{
        alert('Ya Esta agregada')
    }
}


const removeFromFavorites = () => {
    let getMovies = JSON.parse(localStorage.getItem("movies"))
    let filterMovies = getMovies.filter(element => element.Title !== movieRender.Title)
    localStorage.setItem("movies", JSON.stringify(filterMovies))
    alert('Pelicula Eliminada')
    renderFavoritesList()

} 
const renderFavoritesList = () => {
    
    let allcards = document.querySelector(".allcard");
    while (allcards.firstChild) {
    allcards.removeChild(allcards.firstChild);
    }
    let cards = document.querySelector('.allcard')
    let getMovies = JSON.parse(localStorage.getItem("movies"))
    if (getMovies == null) {
       
    }else{

        
        getMovies.forEach((element,index) => {
            let div = document.createElement('div')
            div.classList.add('subcard')
            
            let img = document.createElement('img')
            img.setAttribute('alt', `movie_${index}`)
            img.setAttribute('src', element.Poster)
            img.setAttribute('height',"400")
            img.setAttribute('width','100%')
            
            div.appendChild(img)
            
            let info = document.createElement('div')
            info.classList.add('subinf')
            let title = document.createElement('h2')
            title.innerHTML = `${element.Title}`
            let genre = document.createElement('p')
            genre.innerHTML = `Genero: ${element.Genre}`
            let description = document.createElement('p')
            description.innerHTML = `Descripcion ${element.Plot}`
            
            info.appendChild(title)
            info.appendChild(genre)
            info.appendChild(description)
            
            div.appendChild(info)
            cards.appendChild(div)  
        })
        
    }
        
    }
    
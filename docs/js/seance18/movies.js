//*************************************************************************
//Infos d'accès à l'API
//*************************************************************************
const url = 'https://streaming-availability.p.rapidapi.com/v2/';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'fA38srGBKkmsh37RZkhPJs1c1nTJp1A9yW8jsnjrCDBx5adbYo',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
    }
};
//*************************************************************************
//Variables globales
//*************************************************************************
let movies= [];

const $=(id)=>document.getElementById(id);

const genresColors = {
    'Action': 'bg-danger',
    'Adventure': 'bg-warning',
    'Animation': 'bg-success',
    'Biography': 'bg-primary',
    'Comedy': 'bg-secondary',
    'Crime': 'bg-dark',
    'Documentary': 'bg-info',
    'Drama': 'bg-light',
    'Family': 'bg-danger',
    'Fantasy': 'bg-warning',
    'Film-Noir': 'bg-success',
    'Game-Show': 'bg-primary',
    'History': 'bg-secondary',
    'Horror': 'bg-dark',
    'Music': 'bg-info',
    'Musical': 'bg-light',
    'Mystery': 'bg-danger',
    'News': 'bg-warning',
    'Reality-TV': 'bg-success',
    'Romance': 'bg-primary',
    'Sci-Fi': 'bg-secondary',
    'Short': 'bg-dark',
    'Sport': 'bg-info',
    'Talk-Show': 'bg-light',
    'Thriller': 'bg-danger',
    'War': 'bg-warning',
    'Western': 'bg-success'
};

//*************************************************************************
//Gestion du localStorage
//*************************************************************************
function setLocalStorageParam(key,value){
    const params = JSON.parse(localStorage.getItem("params"));
    params[key]=value;
    localStorage.setItem("params", JSON.stringify(params));
}

function getLocalStorageParam(key){
    const params = JSON.parse(localStorage.getItem("params")||'{}');
    return params[key];
}

function getViewedMoviesKey(){
    const service=$('services').value;
    const genre=$('genres').value;
    return 'viewedMovies_'+service+'_'+genre;
}
function addViewedMovie(movie){
    const viewedMovies = getViewedMovies();
    viewedMovies[movie.imdbId]=movie;
    localStorage.setItem(getViewedMoviesKey(), JSON.stringify(viewedMovies));
}

function removeViewedMovie(movie){
    const viewedMovies = getViewedMovies();
    delete viewedMovies[movie.imdbId];
    localStorage.setItem(getViewedMoviesKey(), JSON.stringify(viewedMovies));
}

function getViewedMovies(){
    const genre=$('genres').value;
    if(genre!=='') {
        const key = getViewedMoviesKey();
        return JSON.parse(localStorage.getItem(key) || '{}');
    } else {
        const keys= Object.keys(localStorage);
        const viewedMovies={};
        keys.forEach((key)=>{
            if(key.startsWith('viewedMovies_')){
                Object.assign(viewedMovies, JSON.parse(localStorage.getItem(key)));
            }
        });
        return viewedMovies;
    }
}
//*************************************************************************
//Gestion des éléments du DOM
//*************************************************************************
function isVisible(element) {
    const computedStyle = window.getComputedStyle(element);
    return computedStyle.display !== 'none';
}

function setToElementsByClassName(className, value){
    Array.from(document.getElementsByClassName(className)).forEach((element)=>element.innerText=value);
}

function doOnElementsByClassName(className, func){
    Array.from(document.getElementsByClassName(className)).forEach((element)=>func(element));
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

//*************************************************************************
//Affichages & manipulations des éléments du DOM
//*************************************************************************
function displayViewedCount(){
    const table = $('movies');
    debugger;
    const checkboxes = table.querySelectorAll('input[type=checkbox]._vu');
    let viewedMoviesCount = Array.from(checkboxes).reduce(function(total, checkbox) {
        let parent = checkbox.parentElement;
        while (parent && parent !== document.body) {
            if (!isVisible(parent)) {
                return total;
            }
            parent = parent.parentElement;
        }
        return checkbox.checked ? total + 1 : total;
    }, 0);

    $('count-bottom-info').style.display=viewedMoviesCount===0?'none':'flex';
    setToElementsByClassName('_viewedCount', viewedMoviesCount);
}

function createBsCheckbox(label, value,checked=false){
    const div = document.createElement('div');
    div.classList.add('form-check', 'form-check-inline');

    const input = document.createElement('input');
    input.classList.add('form-check-input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('id', value);
    input.setAttribute('value', value);
    input.classList.add('_vu');
    input.checked=checked?true:false;

    const inputLabel = document.createElement('label');
    inputLabel.classList.add('form-check-label');
    inputLabel.setAttribute('for', value);
    inputLabel.innerText = label;

    div.appendChild(input);
    div.appendChild(inputLabel);

    return div;
}

function addOptionInSelect(select, value, text){
    const option = document.createElement('option');
    option.setAttribute('value', value);
    option.innerText = text;
    select.appendChild(option);
}

function addMovieInTable(movie,viewedMovies = {}){
    const tbody = $('movies');
    const tr = document.createElement('tr');
    const tdVuCheckbox = document.createElement('td');
    const tdTitle = document.createElement('td');
    const tdYear = document.createElement('td');
    const tdGenres = document.createElement('td');
    const tdAge = document.createElement('td');
    const tdType = document.createElement('td');

    tdTitle.innerText = movie.title;
    tdYear.innerText = movie.year||movie.firstAirYear;
    tdAge.innerText = movie.advisedMinimumAudienceAge||'';
    tdType.innerText = movie.type==='movie'?'Film':'Série';
    movie.genres.forEach((genre)=>{
        const spanGenre = document.createElement('span');
        spanGenre.classList.add('badge','rounded-pill','text-'+genresColors[genre.name]);
        spanGenre.innerText = genre.name;
        tdGenres.appendChild(spanGenre);
    });
    movies.push(movie);
    const divBsCheckbox = createBsCheckbox('', movies.length-1, viewedMovies[movie.imdbId]);
    tdVuCheckbox.appendChild(divBsCheckbox);

    tr.appendChild(tdVuCheckbox);
    tr.appendChild(tdTitle);
    tr.appendChild(tdYear);
    tr.appendChild(tdGenres);
    tr.appendChild(tdAge);
    tr.appendChild(tdType);

    tbody.appendChild(tr);
}

function toggleTheme() {
    const html = document.documentElement;
    const lightIcon = document.getElementById("lightIcon");
    const darkIcon = document.getElementById("darkIcon");

    if (html.hasAttribute("data-bs-theme")) {
        html.removeAttribute("data-bs-theme");
        lightIcon.style.display = "inline-block";
        darkIcon.style.display = "none";
    } else {
        html.setAttribute("data-bs-theme", "dark");
        lightIcon.style.display = "none";
        darkIcon.style.display = "inline-block";
    }
}

//*************************************************************************
//Manipulation des données
//*************************************************************************
async function fetchDataWithCache(url,options) {
    const cachedData = localStorage.getItem(url);
    if (cachedData) {
        return JSON.parse(cachedData);
    } else {
        const response = await fetch(url,options);
        const data = await response.json();
        localStorage.setItem(url, JSON.stringify(data));
        return data;
    }
}
function getMoviesURL(){
    const service=$('services').value;
    const genre=$('genres').value;
    const show_type=document.querySelector('input[name="show_type"]:checked').value;
    let result= url+'search/basic?country=fr&services='+service+'&output_language=fr&show_type='+show_type+'&genre='+genre;
    if(getLocalStorageParam('nextCursor')){
        result+='&cursor='+getLocalStorageParam('nextCursor');
    }
    setLocalStorageParam('service', service);
    setLocalStorageParam('genre', genre);
    setLocalStorageParam('show_type', show_type);
    return result;
}
async function loadMore() {
    const movies = await fetchDataWithCache(getMoviesURL(), options);
    const viewedMovies = getViewedMovies();
    Object.keys(movies.result).forEach((movie) => {
        addMovieInTable(movies.result[movie], viewedMovies);
    });
    setLocalStorageParam('nextCursor', encodeURI(movies.nextCursor));
    setLocalStorageParam('hasMore', movies.hasMore);
    setToElementsByClassName('_count', $('movies').getElementsByTagName('tr').length);
    displayViewedCount();
}
$('search').addEventListener('click', async function () {
    const tbody=$('movies');
    tbody.innerHTML='';
    doOnElementsByClassName('_filter-info', (element)=>element.style.display='none');
    setLocalStorageParam('nextCursor', null);
    setLocalStorageParam('hasMore', true);
    let load;
    do{
        load=await checkAndLoadMoreData();
    } while(load);
});

async function checkAndLoadMoreData() {
    const table = $('movies');
    const rows = table.getElementsByTagName('tr');

    const lastRow = rows[rows.length - 1];
    if ((!lastRow || isInViewport(lastRow)) && getLocalStorageParam('hasMore')) {
        await loadMore();
        return true;
    }
    return false;
}
function filterTable(filter){
    const rows=$('movies').getElementsByTagName('tr');
    let filteredCount=0;
    if(filter) {
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const title = row.getElementsByTagName('td')[1].innerText;
            if (title.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
                row.style.display = '';
                filteredCount++;
            } else {
                row.style.display = 'none';
            }
        }
    } else {
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            row.style.display = '';
        }
        filteredCount=rows.length;
    }
    if(filteredCount===rows.length){
        doOnElementsByClassName('_filter-info', (element)=>element.style.display='none');
    }else{
        doOnElementsByClassName('_filter-info', (element)=>element.style.display='');
        setToElementsByClassName('_filtered-count', filteredCount);
    }
    displayViewedCount();
}
Array.from(document.getElementsByClassName('_filter')).forEach((element)=>element.addEventListener('keypress', function(event){
    if(event.key==='Enter'){
        filterTable(event.target.value);
    }
}));

//*************************************************************************
//Gestion des événements
//*************************************************************************
window.addEventListener('scroll', checkAndLoadMoreData);

$('movies').addEventListener('click', function (event) {
    if(event.target.classList.contains('_vu')){
        const checkbox=event.target;
        if(checkbox.checked){
            addViewedMovie(movies[checkbox.value]);
        }else{
            removeViewedMovie(movies[checkbox.value]);
        }
    }
    displayViewedCount();
});

$('ck-vu').addEventListener('click', function (event) {
    const tbody=$('movies');
    const viewedMovies = getViewedMovies();
    if(event.target.checked){
        tbody.innerHTML='';
        setLocalStorageParam('nextCursor', null);
        setLocalStorageParam('hasMore', false);
        movies=Object.values(viewedMovies);
        movies.forEach((movie)=>{
            addMovieInTable(movie, viewedMovies);
        });
    displayViewedCount();
    }
});

document.addEventListener("DOMContentLoaded", async function () {
    const toggleButton = $("toggleTheme");
    toggleButton.addEventListener("click", toggleTheme);

    const services=await fetchDataWithCache(url+'services', options);
    const servicesList=$('services');
    Object.keys(services.result).forEach((service)=>{
        if(services.result[service].countries['fr']) {
            addOptionInSelect(servicesList, service, service);
        }
    });
    const genres=await fetchDataWithCache(url+'genres', options);
    const genresList=$('genres');
    Object.keys(genres.result).forEach((genre)=>{
        addOptionInSelect(genresList, genre, genres.result[genre]);
    });
    if(localStorage.getItem("params")){
        const params = JSON.parse(localStorage.getItem("params"));
        $('services').value=params.service;
        $('genres').value=params.genre;
        document.querySelector('input[name="show_type"][value="'+params.show_type+'"]').checked=true;
    }
});

window.addEventListener('load', () => {
    series = JSON.parse(localStorage.getItem('series')) || [];
    const newSeriesForm = document.querySelector('#new-series-form');
    const modal = document.getElementById('modal')
    newSeriesForm.addEventListener('submit', e => {
        e.preventDefault();

        const newSeries = {
            title: e.target.elements.title.value,
            season: e.target.elements.season.value,
            episode: e.target.elements.episode.value,
            s2day: e.target.elements.s2day.value,
            myFlixer: e.target.elements.myFlixer.value,
            comment: e.target.elements.comment.value,
            watched: false,
            dateWatched: logDate()
        }
        series.push(newSeries)
        localStorage.setItem('series', JSON.stringify(series));
        e.target.reset();
        displaySeries();
        modal.classList.add('hideModal')
        modal.classList.remove('showModal')
    })
    // console.log(series)
    displaySeries();
})

    // const today = new Date()
    // const week = today.toLocaleString('en-us', {  weekday: 'long' });
    // const month= today.toLocaleString('default', {  month: 'long' });
    // const day = today.getDate()
    // const current_time = today.getHours()+":"+today.getMinutes();
    // const currentDate = `${week}, ${month} ${day} @${current_time}`

const btn = document.querySelector('#modal-button');
btn.addEventListener('click', e => {
    modal.classList.add('showModal');
})

const closeBtn = document.querySelector('.close');
closeBtn.addEventListener('click', e => {
    modal.classList.remove('showModal')
    modal.classList.add('hideModal')
})



function logDate() {
    const today = new Date()
    const week = today.toLocaleString('en-us', {  weekday: 'long' });
    const month= today.toLocaleString('default', {  month: 'long' });
    const day = today.getDate()
    const current_time = today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const currentDate = `${week}, <br> ${month} ${day} | ${current_time}`
    return currentDate
}

console.log(logDate())
function displaySeries() {
    const seriesList = document.querySelector('#series-list');
    seriesList.innerHTML = '';
    series.forEach(newSeries => {
        const seriesItem = document.createElement('tr');
        const dateWatched = document.createElement('td');
        const seriesTitle = document.createElement('td');
        const seriesSeason = document.createElement('td');
        const seriesEpisode = document.createElement('td')
        const seriesLinks = document.createElement('td')
        const seriesComments = document.createElement('td')
        const seriesActions = document.createElement('td')
        const editButton = document.createElement('button')
        const deleteButton = document.createElement('button')

        seriesItem.classList.add('series-data');
        dateWatched.classList.add('date-watched');
        seriesTitle.classList.add('series-title');
        seriesSeason.classList.add('season');
        seriesEpisode.classList.add('episode');
        seriesLinks.classList.add('links');
        seriesComments.classList.add('comments');
        seriesActions.classList.add('actions');
        dateWatched.innerHTML = `<h3>${newSeries.dateWatched}</h3>`;
        seriesTitle.innerHTML = `<h2>${newSeries.title}</h2>`;
        seriesSeason.innerHTML = `<input id="inputSeason" type="number" readonly value="${newSeries.season}"></input>`;
        seriesEpisode.innerHTML = `<input id="inputEpisode" type="number" readonly value="${newSeries.episode}"></input>`;
        seriesLinks.innerHTML = `<a href="${newSeries.s2day}" target="_blank">SOAP2DAY</a>
                                <a href="${newSeries.myFlixer}" target="_blank">MyFlixer</a>`;
        seriesComments.innerHTML = `<input id="inputComment" type="text" readonly value="${newSeries.comment}"></input>`;
        editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
        deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        seriesActions.appendChild(editButton);
        seriesActions.appendChild(deleteButton);

        seriesList.appendChild(seriesItem);
        seriesItem.appendChild(dateWatched);
        seriesItem.appendChild(seriesTitle);
        seriesItem.appendChild(seriesSeason);
        seriesItem.appendChild(seriesEpisode);
        seriesItem.appendChild(seriesLinks);
        seriesItem.appendChild(seriesComments);
        seriesItem.appendChild(seriesActions);

        editButton.addEventListener('click', e => {
            const inputSeason = seriesSeason.querySelector('input');
            const inputEpisode = seriesEpisode.querySelector('input');
            const inputComment = seriesComments.querySelector('input')
            inputSeason.removeAttribute('readonly');
            inputEpisode.removeAttribute('readonly');
            inputComment.removeAttribute('readonly');
            
            seriesItem.classList.add('editable')
            editButton.addEventListener('click', e => {
                e.preventDefault()
                inputSeason.setAttribute('readonly', true);
                inputEpisode.setAttribute('readonly', true);
                inputComment.setAttribute('readonly', true)
                newSeries.season = inputSeason.value;
                newSeries.episode = inputEpisode.value;
                newSeries.comment = inputComment.value;
                newSeries.dateWatched = logDate();
                seriesItem.classList.remove('editable');
                const index = series.indexOf(newSeries)
                if (index > -1) {
                    series.splice(index, 1)
                }
                dateWatched.innerHTML = logDate();

                series.push(newSeries)
                localStorage.setItem('series', JSON.stringify(series));
                displaySeries();
            })
        })
        const seriesCount = document.querySelector('.intro');
        seriesCount.innerHTML = `<p>You have ${series.length} series on your watch list</p>`  

        deleteButton.addEventListener('click', e => {
            e.preventDefault()
            series = series.filter(n => n != newSeries);
            localStorage.setItem('series', JSON.stringify(series));
            displaySeries();
        })
        new Sortable(seriesList, {
            animation: 300,
            filter: ".table-header",
            cancel: ".table-header",
            onEnd: function(e) {
                series.splice(e.newIndex, 0, series.splice(e.oldIndex, 1)[0])
                localStorage.setItem('series', JSON.stringify(series));
            }
        });
    })
}
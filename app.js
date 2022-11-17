window.addEventListener('load', () => {
    series = JSON.parse(localStorage.getItem('series')) || [];
    const newSeriesForm = document.querySelector('#new-series-form');

    newSeriesForm.addEventListener('submit', e => {
        e.preventDefault();

        const newSeries = {
            title: e.target.elements.title.value,
            season: e.target.elements.season.value,
            episode: e.target.elements.episode.value,
            ended: false,
            createdAt: new Date().getTime()
        }

        series.push(newSeries)
        localStorage.setItem('series', JSON.stringify(series));

        e.target.reset();

        displaySeries();
    })
    displaySeries();
    console.log(series)
})

function displaySeries() {
    const seriesList = document.querySelector('#series-list')
    seriesList.innerHTML = '';

    series.forEach(newSeries => {
        const seriesItem = document.createElement('div')
        seriesItem.classList.add('series-item')

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = newSeries.ended;
        span.classList.add('bubble');

        content.classList.add('series-content');
        actions.classList.add('actions')
        edit.classList.add('edit')
        deleteButton.classList.add('delete')

        content.innerHTML = `<input type="text" value="${newSeries.title}" readonly id="title"/>
                            <input type="text" value="${newSeries.season}" readonly id="season"/>
                            <input type="text" value="${newSeries.episode}" readonly id="episode"/>
        `;
        edit.innerHTML = 'Edit'
        deleteButton.innerHTML = 'Delete'

        // label.appendChild(input)
        // label.appendChild(span)
        actions.appendChild(edit)
        actions.appendChild(deleteButton)
        seriesItem.appendChild(label)
        seriesItem.appendChild(content)
        seriesItem.appendChild(actions)

        seriesList.appendChild(seriesItem)



        // input.addEventListener('click', e=> {
        //     newSeries.ended = e.target.checked;
        //     series.push(series.shift());
        //     localStorage.setItem('series', JSON.stringify(series));
        //     displaySeries();
        // }) 
        // if (newSeries.ended) {
        //     seriesItem.classList.add('done')
        //     input.setAttribute('disabled', true)
        // } else {
        //     input.removeAttribute('disabled')
        // }

        edit.addEventListener('click', e => {
            const inputTitle = content.querySelector('#title');
            const inputSeason = content.querySelector('#season');
            const inputEpisode = content.querySelector('#episode');
            edit.innerHTML = 'SAVE'
            // const input = content.getElementsByClassName('input')
            inputTitle.removeAttribute('readonly');
            inputSeason.removeAttribute('readonly');
            inputEpisode.removeAttribute('readonly');
            // input.removeAttribute('disabled');
            // input.checked = false;
            seriesItem.classList.remove('done');
            edit.addEventListener('click', e => {
                e.preventDefault()
                inputTitle.setAttribute('readonly', true);
                inputSeason.setAttribute('readonly', true);
                inputEpisode.setAttribute('readonly', true);
                newSeries.title = inputTitle.value;
                newSeries.season = inputSeason.value;
                newSeries.episode = inputEpisode.value;
                series.push(series.shift());
                localStorage.setItem('series', JSON.stringify(series));
                displaySeries();
            })
        })

        deleteButton.addEventListener('click', e => {
            e.preventDefault()
            series = series.filter(n => n != newSeries);
            localStorage.setItem('series', JSON.stringify(series));
            displaySeries();
        })
    })
}


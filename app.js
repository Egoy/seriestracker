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

        content.innerHTML = `<input type="text" value="${newSeries.title}" readonly />
                            <input type="text" value="${newSeries.season}" readonly />
                            <input type="text" value="${newSeries.episode}" readonly />
        `;
        edit.innerHTML = 'Edit'
        deleteButton.innerHTML = 'Delete'

        label.appendChild(input)
        label.appendChild(span)
        actions.appendChild(edit)
        actions.appendChild(deleteButton)
        seriesItem.appendChild(content)
        seriesItem.appendChild(actions)

        seriesList.appendChild(seriesItem)

        if (newSeries.ended) {
            seriesItem.classList.add('done')
        }

        input.addEventListener('click', e=> {
            newSeries.ended = e.target.checked;
            localStorage.setItem('series', JSON.stringify(series));

            if (newSeries.ended) {
                seriesItem.classList.add('done')
            } else {
                seriesItem.classList.remove('done')
            }

            displaySeries();
        }) 

        edit.addEventListener('click', e => {
            // const inputTitle = content.getElementbyID('title');
            // const inputSeason = content.getElementbyID('season');
            // const inputEpisode = content.getElementbyID('episode');
            const input = content.querySelectorAll('input')
            input.removeAttribute('readonly');
            input.focus()
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                newSeries.content = e.target.value;
                localStorage.setItem('series', JSON.stringify(series));
                displaySeries();
            })
        })
    })
}
let newSeriesTitle = document.getElementById('seriesTitle')
let newSeriesEpisode = document.getElementById('seriesEpisode')
let newSeriesSeason = document.getElementById('seriesSeason')
const submitBtn = document.getElementById('submit')

let series = {
    title: "",
    season: 0,
    episode: 0
}

submitBtn.addEventListener('click', () => {
    series.title = newSeriesTitle.value
    series.season = parseInt(newSeriesSeason.value)
    series.episode = parseInt(newSeriesEpisode.value)
})

function newSeries() {
    
}
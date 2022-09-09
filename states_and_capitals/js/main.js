const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

// search states.json file and filter
const searchStates = async searchText => {
    const res = await fetch('data/states.json');
    const states = await res.json();
    
    
    // pull in matches to the current text field input
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regex) || state.abbr.match(regex);
    });
    
    // condition to clear an empty text/input field
    if (searchText.length === 0) {
        matches = [];
        matchList.innerHTML = '';
    }
    
    outputHtml(matches);
};

// display results in HTML
const outputHtml = matches => {
    if (matches.length > 0) {
        // map through matches array
        const html = matches.map(match => `
            <div class="card card-body mb-1">
                <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
                <small>Lat: ${match.lat} / Long: ${match.long}</small>
            </div>
        `
        )
        .join('');
        
        matchList.innerHTML = html;
    }
};

search.addEventListener('input', () => searchStates(search.value));
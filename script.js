async function fetchCountries(name) {
    const url = `https://restcountries.com/v3.1/name/${name}`;
    
    try {
        // Fetch data from the API
        const response = await fetch(url);
        
        // Handle the case where the country isn't found or the request fails
        if (!response.ok) {
            throw new Error(`Country not found: ${name}`);
        }
        
        const json = await response.json();
        let mainCountry = json[0];

        // Clear previous content
        document.getElementById('capital').innerText = 'Capital: ';
        document.getElementById('population').innerText = 'Population: ';
        document.getElementById('region').innerText = 'Region: ';
        document.getElementById('flag').innerHTML = ''; // Clear any previous flag
        
        // Display country information
        let capital = mainCountry.capital ? mainCountry.capital[0] : "Not available";
        document.getElementById('capital').innerText = `Capital: ${capital}`;
        document.getElementById('region').innerText = `Region: ${mainCountry.region}`;
        document.getElementById('population').innerText = `Population: ${mainCountry.population}`;

        // Display flag
        let flagImg = document.createElement('img');
        flagImg.src = mainCountry.flags.svg;
        flagImg.alt = `${mainCountry.name.common} flag`;
        document.getElementById('flag').appendChild(flagImg);
        
        // Clear any existing neighboring countries list
        document.getElementById('countries').innerHTML = '';

        // Handle neighboring countries (borders)
        let neighbours = mainCountry.borders || [];
        
        for (let neighbour of neighbours) {
            const neighbourUrl = `https://restcountries.com/v3.1/alpha/${neighbour}`;
            const neighbourResponse = await fetch(neighbourUrl);
            const neighbourData = await neighbourResponse.json();
            let neighbourCountry = neighbourData[0];

            // Create elements for each neighboring country
            let listItem = document.createElement('li');
            listItem.innerText = neighbourCountry.name.common;

            let flagImg2 = document.createElement('img');
            flagImg2.src = neighbourCountry.flags.svg;
            flagImg2.alt = `${neighbourCountry.name.common} flag`;

            // Append to the list of neighboring countries
            document.getElementById('countries').appendChild(listItem);
            document.getElementById('countries').appendChild(flagImg2);
        }
    } catch (error) {
        console.error(error.message);
        alert("There was an error fetching the country data. Please try again.");
    }
}

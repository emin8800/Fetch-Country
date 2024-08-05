document.getElementById('dark').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

document.addEventListener("DOMContentLoaded", async function() {
    
    let response = await fetch("https://restcountries.com/v3.1/all");
    let data = await response.json();
    
   
    let flagPage = document.getElementById("flag-page");
    let searchInput = document.getElementById("search");

    function displayCountries(countries) {
        flagPage.innerHTML = ''; 

        countries.forEach(country => {
            let flagDiv = document.createElement("div");
            flagDiv.classList.add("flag");
            flagDiv.innerHTML = `
                <img src="${country.flags.png}" alt="${country.name.official} Flag">
                <h2>${country.name.official}</h2>
                <div class="info">
                    <h3>Population: <p>${country.population.toLocaleString()}</p></h3>
                    <h3>Region: <p>${country.region}</p></h3>
                    <h3>Subregion: <p>${country.subregion || 'N/A'}</p></h3>
                    <h3>Capital: <p>${country.capital ? country.capital[0] : 'N/A'}</p></h3>
                </div>
            `;
            flagDiv.addEventListener("click", function() {
               
                window.location.href = `flag_detal.html?name=${encodeURIComponent(country.name.official)}`;
            });
            flagPage.appendChild(flagDiv);
        });
    }

   
    displayCountries(data);

   
    searchInput.addEventListener("input", function() {
        let searchTerm = searchInput.value.toLowerCase();
        let filteredCountries = data.filter(country => 
            country.name.official.toLowerCase().includes(searchTerm)
        );
        displayCountries(filteredCountries);
    });
});



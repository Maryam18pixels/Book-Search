document.getElementById('searchForm').addEventListener('submit', function(e){
    e.preventDefault();
    let searchTerm = document.getElementById('searchInput').value.trim();
    if(searchTerm !== ''){
        fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                let searchResults = document.getElementById('searchResults');
                searchResults.innerHTML = '';
                if(data.items){
                    data.items.forEach(item => {
                        let bookCard = `
                            <div class="book-card">
                                <img src="${item.volumeInfo.imageLinks?.thumbnail}" alt="Book Cover" class="book-img">
                                <div class="book-info">
                                    <h3 class="book-title">${item.volumeInfo.title}</h3>
                                    <p class="book-author">${item.volumeInfo.authors?.join(', ')}</p>
                                    <a href="${item.volumeInfo.infoLink}" class="book-link" target="_blank">View Details</a>
                                </div>
                            </div>
                        `;
                        searchResults.innerHTML += bookCard;
                    });
                } else {
                    searchResults.innerHTML = '<p>No results found</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                let searchResults = document.getElementById('searchResults');
                searchResults.innerHTML = '<p>Error fetching data</p>';
            });
    }
});
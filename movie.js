$(document).ready(function() {
    // Array to store movie objects {title, rating}
    let movies = [];

    // Function to render movies in the DOM
    function renderMovies() {
        $('#moviesContainer').empty();
        movies.forEach(function(movie, index) {
            let movieElement = $('<div class="movie">').text(movie.title + ' - ' + movie.rating);
            let removeButton = $('<button>').text('Remove');
            removeButton.click(function() {
                movies.splice(index, 1);
                renderMovies();
            });
            movieElement.append(removeButton);
            $('#moviesContainer').append(movieElement);
        });
    }

    // Form submit event handler
    $('#movieForm').submit(function(event) {
        event.preventDefault();
        
        // Get values from form inputs
        let title = $('#title').val().trim();
        let rating = parseFloat($('#rating').val().trim());

        // Validate inputs
        if (title.length < 2) {
            alert('Title must have at least 2 characters.');
            return;
        }
        if (isNaN(rating) || rating < 0 || rating > 10) {
            alert('Rating must be a number between 0 and 10.');
            return;
        }

        // Add movie to array
        movies.push({ title: title, rating: rating });

        // Clear form inputs
        $('#title').val('');
        $('#rating').val('');

        // Render movies
        renderMovies();
    });

    // Function to sort movies by title
    $('#sortTitle').click(function() {
        movies.sort(function(a, b) {
            return a.title.localeCompare(b.title);
        });
        renderMovies();
    });

    // Function to sort movies by rating (lowest to highest)
    $('#sortRating').click(function() {
        movies.sort(function(a, b) {
            return a.rating - b.rating;
        });
        renderMovies();
    });

    // Initial render
    renderMovies();
});

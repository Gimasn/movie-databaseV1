// Event klik tombol cari
$('.search-button').on('click', function () {
    const keyword = $('.input-keyword').val();
  
    $.ajax({
      url: 'https://www.omdbapi.com/?apikey=146f153e&s=' + $('.input-keyword').val(),
      success: results => {
        const movies = results.Search;
        const cards = generateAllMovieCards(movies);
        $('.movie-container').html(cards);
        attachDetailButtonEvent();
      },
      error: err => {
        console.error(err.responseText);
      }
    });
  });
  
  
  // Buat semua kartu film dari array movie
  function generateAllMovieCards(movies) {
    return movies.map(movie => createMovieCard(movie)).join('');
  }
  
  // Fungsi pembuat 1 kartu film
  function createMovieCard(m) {
    return `
      <div class="col-md-4 my-3">
        <div class="card">
          <img src="${m.Poster}" class="card-img-top" alt="${m.Title}">
          <div class="card-body">
            <h5 class="card-title">${m.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
            <a href="#" class="btn btn-primary modal-detail-button" 
               data-bs-toggle="modal" 
               data-bs-target="#movieDetailModal" 
               data-imdbid="${m.imdbID}">
               Show Details
            </a>
          </div>
        </div>
      </div>`;
  }
  
  // Fungsi pembuat detail movie dalam modal
  function createMovieDetail(m) {
    return `
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-4">
            <img src="${m.Poster}" class="img-fluid" alt="${m.Title}">
          </div>
          <div class="col-md-8">
            <ul class="list-group">
              <li class="list-group-item"><h4>${m.Title}</h4></li>
              <li class="list-group-item"><strong>Genre:</strong> ${m.Genre}</li>
              <li class="list-group-item"><strong>Director:</strong> ${m.Director}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${m.Actors}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${m.Writer}</li>
              <li class="list-group-item"><strong>Plot:</strong><br>${m.Plot}</li>
            </ul>
          </div>
        </div>
      </div>`;
  }
  
  // Event click tombol detail
  function attachDetailButtonEvent() {
    $('.modal-detail-button').on('click', function () {
      const imdbID = $(this).data('imdbid');
  
      $.ajax({
        url: `https://www.omdbapi.com/?apikey=146f153e&i=${imdbID}`,
        success: m => {
          const detailHTML = createMovieDetail(m);
          $('.modal-body').html(detailHTML);
        },
        error: err => {
          console.error(err.responseText);
        }
      });
    });
  }
  

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS Bootstrap

function MovieComponent() {
  // State untuk menyimpan hasil pencarian film
  const [movies, setMovies] = useState([]); 
  // State untuk status loading
  const [loading, setLoading] = useState(false); 
  // State untuk menyimpan query pencarian
  const [query, setQuery] = useState(''); 
  // State untuk melacak apakah pencarian sudah dilakukan
  const [hasSearched, setHasSearched] = useState(false); 

  // Fungsi untuk fetch data saat tombol pencarian ditekan
  const fetchData = async () => {
    if (!query) return; // Tidak melakukan fetch jika query kosong
    setLoading(true); // Set loading true sebelum fetch
    setHasSearched(true); // Tandai bahwa pencarian telah dilakukan
    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=e3a6bb4348aaf5f95dd918151fa88fde`);
      const data = await response.json();
      setMovies(data.results); // Simpan hasil pencarian di state movies
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading false setelah fetch selesai
    }
  };

  // Fungsi untuk menangani perubahan input di search box
  const handleSearchChange = (e) => {
    setQuery(e.target.value); // Set query berdasarkan input pengguna
  };

  // Fungsi untuk menangani pencarian saat tombol ditekan
  const handleSearch = () => {
    fetchData(); // Panggil fungsi fetchData saat tombol diclick
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Movie Search</h2>

      {/* Search box untuk pencarian */}
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search for a movie..."
            value={query}
            onChange={handleSearchChange} // Menangani perubahan input
          />
          <button className="btn btn-primary mt-2" onClick={handleSearch}>Search</button> {/* Tombol pencarian */}
        </div>
      </div>

      {/* Menampilkan status loading */}
      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
          <p className="mt-2">Loading movies, please wait...</p>
        </div>
      ) : (
        <div className="row">
          {hasSearched && movies.length > 0 ? ( // Tampilkan hasil hanya jika sudah melakukan pencarian
            movies.map((movie) => (
              <div key={movie.id} className="col-md-4 mb-4">
                <div className="card h-100">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    className="card-img-top"
                    alt={movie.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movie.title}</h5>
                    <p className="card-text">
                      {movie.overview ? movie.overview.slice(0, 100) + "..." : "No description available"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            hasSearched && ( // Tampilkan pesan hanya jika sudah mencari dan tidak ada film ditemukan
              <div className="col-md-12">
                <p className="alert alert-warning">No movies found</p>
              </div>
            )
          )}
        </div>
      )}

      {/* Footer proyek */}
      <footer className="mt-5 text-center">
        <p>Project by Mahesa. Supported by TMDB API.</p>
      </footer>
    </div>
  );
}

export default MovieComponent;

function getFavoritos() {
  const fav = localStorage.getItem('favoritos');
  const filtroFavoritos = document.getElementById('filtroFavoritos').checked;

  return fav ? JSON.parse(fav) : [];
}

function setFavoritos(favoritos) {
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

function toggleFavorito(idFilme) {
  let favoritos = getFavoritos();
  if (favoritos.includes(idFilme)) {
    favoritos = favoritos.filter(favId => favId !== idFilme);
    alert('Filme removido dos favoritos!');
  } else {
    favoritos.push(idFilme);
    alert('Filme adicionado aos favoritos!');
  }
  setFavoritos(favoritos);
}

function isFavorito(idFilme) {
  const favoritos = getFavoritos();
  return favoritos.includes(idFilme);
}

window.getFavoritos = getFavoritos;
window.setFavoritos = setFavoritos;
window.toggleFavorito = toggleFavorito;
window.isFavorito = isFavorito;
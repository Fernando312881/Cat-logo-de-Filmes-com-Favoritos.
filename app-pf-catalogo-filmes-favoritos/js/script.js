const filmes = [
  {
    id: '1',
    titulo: 'vingadores: guerra infinita',
    descricao: 'Os heróis se unem para enfrentar Thanos.',
    imagem: 'filmes/vingadores.jpg',
    genero: 'ação',
    lancamento: '2018-04-25',
    nota: 8.5,
  },
  {
    id: '2',
    titulo: 'parasita',
    descricao: 'Família pobre tenta se infiltrar em família rica.',
    imagem: 'filmes/parasita.jpg',
    genero: 'drama',
    lancamento: '2019-05-30',
    nota: 8.6,
  },
  {
    id: '3',
    titulo: 'todo mundo em pânico',
    descricao: 'Comédia que satiriza filmes de terror.',
    imagem: 'filmes/panico.jpg',
    genero: 'comédia',
    lancamento: '2000-07-07',
    nota: 6.2,
  },
  {
    id: '4',
    titulo: 'corra!',
    descricao: 'Jovem negro visita a família de sua namorada branca.',
    imagem: 'filmes/korra.jpg',
    genero: 'terror',
    lancamento: '2017-02-24',
    nota: 7.7,
  },
];

// Funções de formatação
function formatarTitulo(titulo) {
  return titulo
    .split(' ')
    .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join(' ');
}


function formatarData(dataStr) {
  const data = new Date(dataStr);
  return data.toLocaleDateString('pt-BR');
}

function formatarNota(nota) {
  return nota.toFixed(1) + '/10';
}

function renderizarFilmes() {
  const container = document.getElementById('lista-filmes');
  const busca = document.getElementById('busca').value.trim().toLowerCase();
  const filtroGenero = document.getElementById('filtroGenero').value;

  // Validação simples para campo de busca
  if (busca !== '' && !/^[a-z0-9\s]+$/i.test(busca)) {
    alert('A busca contém caracteres inválidos.');
    return;
  }

  let filmesFiltrados = filmes.filter(filme => {
    const nomeOk = filme.titulo.toLowerCase().includes(busca);
    const generoOk = filtroGenero === '' || filme.genero === filtroGenero;
    return nomeOk && generoOk;
  });

  container.innerHTML = '';

  if (filmesFiltrados.length === 0) {
    container.innerHTML = '<p>Nenhum filme encontrado.</p>';
    return;
  }

  filmesFiltrados.forEach(filme => {
    const card = document.createElement('div');
    card.className = 'card-filme';

    card.innerHTML = `
      <img src="${filme.imagem}" alt="${filme.titulo}" />
      <button class="btn-favorito ${isFavorito(filme.id) ? 'favorito' : ''}" title="Favoritar">&#10084;</button>
      <div class="info">
        <h3 class="titulo">${formatarTitulo(filme.titulo)}</h3>
        <p class="descricao">${filme.descricao}</p>
        <p><strong>Gênero:</strong> ${filme.genero}</p>
        <p><strong>Lançamento:</strong> ${formatarData(filme.lancamento)}</p>
        <p><strong>Avaliação:</strong> ${formatarNota(filme.nota)}</p>
      </div>
    `;

    const btnFav = card.querySelector('.btn-favorito');
    btnFav.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorito(filme.id);
      renderizarFilmes();
    });

    card.addEventListener('click', () => {
      alert(`Abrir detalhes do filme: ${formatarTitulo(filme.titulo)} (detalhes.html a implementar)`);
      // Exemplo: window.location.href = `detalhes.html?id=${filme.id}`
    });

    container.appendChild(card);
  });
}

document.getElementById('busca').addEventListener('input', renderizarFilmes);
document.getElementById('filtroGenero').addEventListener('change', renderizarFilmes);

renderizarFilmes();

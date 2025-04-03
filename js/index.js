function expandTile(tile) {
    document.querySelectorAll('.tile').forEach(t => t.classList.remove('active'));
    tile.classList.add('active');
  }
  
  document.querySelectorAll('.tile').forEach(tile => {
    tile.addEventListener('click', () => expandTile(tile));
  });
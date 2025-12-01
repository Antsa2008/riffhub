const transition = document.getElementById('pageTransition');
const TRANSITION_DURATION = 600;

// Alusta fade-in uusille sivuille
document.body.classList.add('fade-in');
window.addEventListener('load', () => {
  setTimeout(() => {
    document.body.classList.add('show');
  }, 50); // pieni delay, jotta fade-in toimii
});

// Linkkien klikkaus
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', e => {
    const url = link.getAttribute('href');
    if (!url || url.startsWith('#') || url.startsWith('javascript:')) return;

    e.preventDefault();

    // Näytä overlay fade-out
    transition.classList.add('active');

    // Poista fade-in näkyvistä
    document.body.classList.remove('show');

    // Merkitään seuraavalle sivulle
    sessionStorage.setItem('transitionActive', 'true');

    // Siirry sivulle animaation jälkeen
    setTimeout(() => {
      window.location = url;
    }, TRANSITION_DURATION);
  });
});

// Kun uusi sivu on ladattu ja overlay on päällä
window.addEventListener('load', () => {
  if (sessionStorage.getItem('transitionActive')) {
    sessionStorage.removeItem('transitionActive');

    // Poista overlay fade-outilla
    transition.classList.remove('active');

    // Näytä uusi sivu fade-in
    setTimeout(() => {
      document.body.classList.add('show');
    }, 50);
  }
});

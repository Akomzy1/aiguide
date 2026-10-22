const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton?.setAttribute('aria-expanded', 'false');
  navigation?.classList.remove('is-open');
}
if (menuButton && navigation) {
  menuButton.hidden = false;
  navigation.classList.add('enhanced');
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
  matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);
}

const dialog = document.querySelector('#sample-dialog');
if (dialog && typeof dialog.showModal === 'function') {
  let opener;
  document.querySelectorAll('[data-sample]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      dialog.querySelector('img').src = link.href;
      dialog.querySelector('img').alt = link.querySelector('img').alt;
      dialog.querySelector('#sample-title').textContent = link.dataset.title;
      dialog.querySelector('.sample-original').href = link.href;
      dialog.showModal();
      document.documentElement.classList.add('modal-open');
    });
  });
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('modal-open');
    opener?.focus({ preventScroll: true });
  });
}

'use strict';

const themeButton = document.querySelector('.theme-toggle');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
function currentTheme() {
  return document.documentElement.dataset.theme || (systemTheme.matches ? 'dark' : 'light');
}
function updateThemeLabel() {
  themeButton.setAttribute('aria-label', `Switch to ${currentTheme() === 'dark' ? 'light' : 'dark'} theme`);
}
themeButton.hidden = false;
updateThemeLabel();
systemTheme.addEventListener('change', updateThemeLabel);
themeButton.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('helga-theme', next); } catch { /* Theme still works without storage. */ }
  updateThemeLabel();
});

const sides = {
  tough: {
    label: 'A force to be reckoned with',
    title: 'Pink dress. Zero permission needed.',
    description: 'She plays baseball with the boys, speaks her mind, and refuses to squeeze into anyone’s idea of a “good girl.” That confidence is part of what makes her unforgettable.'
  },
  soft: {
    label: 'Underneath it all',
    title: 'A poet hiding in plain sight.',
    description: 'Well-read, emotional, and quietly caring, Helga has a gift for dramatic soliloquies. From Edward Hopper to George Orwell, her references reveal a rich inner world she rarely lets anyone see.'
  }
};
const sidePicker = document.querySelector('.side-picker');
sidePicker.hidden = false;
sidePicker.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-side]');
  if (!button) return;
  const side = sides[button.dataset.side];
  sidePicker.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('#side-label').textContent = side.label;
  document.querySelector('#side-title').textContent = side.title;
  document.querySelector('#side-description').textContent = side.description;
});

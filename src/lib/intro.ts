// The intro preloader runs once per browser session. An inline script in the
// root layout decides before hydration and marks <html data-intro="1">, so
// hero animations can wait for the curtain to lift.
export const INTRO_SECONDS = 1.25;

export const introScript = `(function(){try{
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (location.pathname.indexOf('/admin') === 0) return;
  if (sessionStorage.getItem('agix-intro')) return;
  sessionStorage.setItem('agix-intro','1');
  document.documentElement.dataset.intro='1';
}catch(e){}})();`;

export function introOffset() {
  if (typeof document === 'undefined') return 0;
  return document.documentElement.dataset.intro === '1' ? INTRO_SECONDS : 0;
}

'use strict';
document.querySelectorAll('.chapter').forEach(chapter => {
  const details = Array.from(chapter.querySelectorAll('details'));
  details.forEach(detail => detail.addEventListener('toggle', () => {
    if (!detail.open) return;
    details.forEach(other => { if (other !== detail) other.open = false; });
  }));
});

const heroFollow = document.getElementById('hero-follow');
const closingFollow = document.getElementById('closing-follow');
const followDock = document.querySelector('.follow-dock');
const header = document.querySelector('.site-header');

if (heroFollow && closingFollow && followDock && 'IntersectionObserver' in window) {
  document.body.classList.add('has-follow-dock');
  const updateFollowDock = () => {
    const headerBottom = header.getBoundingClientRect().bottom;
    const heroPassed = heroFollow.getBoundingClientRect().bottom <= headerBottom;
    const closing = closingFollow.getBoundingClientRect();
    const closingVisible = closing.top < window.innerHeight && closing.bottom > headerBottom;
    followDock.hidden = !heroPassed || closingVisible;
  };
  const observer = new IntersectionObserver(updateFollowDock, {
    rootMargin: `-${header.offsetHeight}px 0px 0px 0px`,
    threshold: [0, 1]
  });
  observer.observe(heroFollow);
  observer.observe(closingFollow);
  window.addEventListener('resize', updateFollowDock, { passive: true });
  window.addEventListener('pageshow', updateFollowDock);
  updateFollowDock();
}

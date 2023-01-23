export function createFooter() {
  const footer = <Element>document.querySelector('.footer');
  footer.classList.remove('no-display');
  footer.innerHTML = `<div class="wrapper">
        <div class="footer__content">
          <div class="year">
            2023
          </div>
          <div class="github">
            <a href="https://github.com/Shama8nchez" class="gh__link">
              <img src="./assets/svg/github.svg" alt="github" class="gh">
              <span>Shama8nchez</span>
            </a>
            <span>, </span>
            <a href="https://github.com/kkolite" class="gh__link">
              <img src="./assets/svg/github.svg" alt="github" class="gh">
              <span>kkolite</span>
            </a>
          </div>
          <div class="rss">
            <a href="https://rs.school/js/">
              <img src="https://rs.school/images/rs_school_js.svg" alt="rss" class="rsschool">
            </a>
          </div>
        </div>
      </div>`;
}

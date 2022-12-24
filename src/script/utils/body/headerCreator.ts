import { headerInfo, headerListener } from './header';

export function createHeader() {
  const header = <Element>document.querySelector('.header');
  header.classList.remove('no-display');
  header.innerHTML = `<div class="wrapper">
        <div class="header__content">
          <div class="header__logo">
            <h1 class="header__title">Online-store</h1>
          </div>
          <div class="header__search">
            <form action="" class="header__form">
              <input type="text" placeholder="Search..." id="search" name="searchPhone" value="" autofocus autocomplete="off">
              <img src="./assets/svg/cancel.svg" alt="cancel" class="cancel">
            </form>
          </div>
          <p class="header__money">In Cart: $<span class="money">0</span></p>
          <div class="header__cart">
            <img src="./assets/svg/cart-arrow-down-solid.svg" alt="cart" class="header__cart-img">
            <div class="count">0</div>
          </div>
        </div>
      </div>`;
  headerListener();
  headerInfo();
}

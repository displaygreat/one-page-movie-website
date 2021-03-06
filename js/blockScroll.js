export const disableScroll = (bodyElem, isActive) => {
  if (isActive) {
    const scrollWidth = window.innerWidth - bodyElem.offsetWidth;
    bodyElem.dataset.scrollY = window.scrollY;

    bodyElem.style.cssText = `
        overflow: hidden;
        position: fixed;
        top: -${window.scrollY}px;
        left: 0;
        padding-right: ${scrollWidth}px;
        width: 100%;
        height: 100vh + ${window.scrollY}px;
      `;

    const appElem = bodyElem.firstElementChild;

    const appChildren = appElem.children;

    for (let i = 0; i < appChildren.length; i++) {
      if (appChildren[i].classList.contains("lock-padding")) {
        appChildren[i].style.paddingRight = `${scrollWidth}px`;
      }
    }
  }
};

export const enableScroll = (bodyElem) => {
  bodyElem.style.cssText = "";

  const appElem = bodyElem.firstElementChild;

  const appChildren = appElem.children;

  for (let i = 0; i < appChildren.length; i++) {
    if (appChildren[i].classList.contains("lock-padding")) {
      appChildren[i].style.paddingRight = "0px";
    }
  }

  window.scroll({
    top: bodyElem.dataset.scrollY,
  });
};

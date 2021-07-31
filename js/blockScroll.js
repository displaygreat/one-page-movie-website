const disableScroll = (bodyTag) => {
  const scrollWidth = window.innerWidth - bodyTag.offsetWidth;

  bodyTag.dataset.scrollY = window.scrollY;

  bodyTag.style.cssText = `
    overflow: hidden;
    position: fixed;
    top: -${window.scrollY}px;
    left: 0;
    padding-right: ${scrollWidth}px;
    width: 100%;
  `;

  const bodyChildren = bodyTag.children;

  for (let i = 0; i < bodyChildren.length; i++) {
    let appChildren = bodyChildren[i].children;

    for (let j = 0; j < appChildren.length; j++) {
      if (appChildren[j].classList.contains("lock-padding")) {
        appChildren[j].style.paddingRight = `${scrollWidth}px`;
      }
    }
  }
};

const enableScroll = (bodyTag) => {
  bodyTag.style.cssText = "";

  const bodyChildren = bodyTag.children;

  for (let i = 0; i < bodyChildren.length; i++) {
    let appChildren = bodyChildren[i].children;

    for (let j = 0; j < appChildren.length; j++) {
      if (appChildren[j].classList.contains("lock-padding")) {
        appChildren[j].style.paddingRight = "0px";
      }
    }
  }

  window.scroll({
    top: bodyTag.dataset.scrollY,
  });
};

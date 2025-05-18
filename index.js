tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: "#ff6b35",
        secondary: "#ffa69e",
        dark: "#252525",
      },
      fontFamily: {
        marck: ["Shadows Into Light Two", "cursive"],
      },
    },
  },
};

document.getElementById("menu-btn").addEventListener("click", () => {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("hidden");
});

document.getElementById("menu-btn").addEventListener("click", () => {
  document.getElementById("mobile-menu").classList.toggle("hidden");
});

document.getElementById("menu-btn").addEventListener("click", () => {
  document.getElementById("mobile-menu").classList.toggle("hidden");
});

function bidirectionalAutoScroll(
  element,
  axis = "x",
  delayStart = 2000,
  speed = 1,
  intervalDelay = 20
) {
  const scrollProp = axis === "x" ? "scrollLeft" : "scrollTop";
  const sizeProp = axis === "x" ? "scrollWidth" : "scrollHeight";
  const clientSizeProp = axis === "x" ? "clientWidth" : "clientHeight";

  let isUserInteracting = false;
  let direction = 1; // 1: forward, -1: backward
  let interval;

  function scrollStep() {
    if (isUserInteracting) return;

    element[scrollProp] += direction * speed;

    const maxScroll = element[sizeProp] - element[clientSizeProp];
    if (element[scrollProp] >= maxScroll) direction = -1;
    if (element[scrollProp] <= 0) direction = 1;
  }

  function startScroll() {
    interval = setInterval(scrollStep, intervalDelay);
  }

  function stopScroll() {
    clearInterval(interval);
  }

  // Delay initial start
  setTimeout(startScroll, delayStart);

  // Pause/resume on interaction
  ["mouseenter", "touchstart"].forEach((evt) => {
    element.addEventListener(evt, () => {
      isUserInteracting = true;
    });
  });

  ["mouseleave", "touchend"].forEach((evt) => {
    element.addEventListener(evt, () => {
      isUserInteracting = false;
    });
  });
}

// Apply to menu and testimonials
bidirectionalAutoScroll(document.querySelector("#menu-scroll > div.flex"), "x");
bidirectionalAutoScroll(document.querySelector("#testimonials-scroll"), "y");

function makeScrollableDraggable(el) {
  let isDown = false;
  let startX;
  let scrollLeft;

  // Mouse events
  el.addEventListener("mousedown", (e) => {
    isDown = true;
    el.classList.add("cursor-grabbing");
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  });

  el.addEventListener("mouseleave", () => {
    isDown = false;
    el.classList.remove("cursor-grabbing");
  });

  el.addEventListener("mouseup", () => {
    isDown = false;
    el.classList.remove("cursor-grabbing");
  });

  el.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    el.scrollLeft = scrollLeft - walk;
  });

  // Touch events
  el.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  });

  el.addEventListener("touchend", () => {
    isDown = false;
  });

  el.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    el.scrollLeft = scrollLeft - walk;
  });
}

// Apply to menu scroll container
const menuScrollContainer = document.querySelector("#menu-scroll > div.flex");
makeScrollableDraggable(menuScrollContainer);

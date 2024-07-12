/*const lazyLoad = (targets, onIntersection) => {
  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // onIntersection(entry.target);
        console.log(entry.target);
        self.unobserve(entry.target);
      }
    });
  });
  targets.forEach((target) => observer.observe(target));
};

const lazyPictures = document.querySelectorAll("picture");

lazyLoad(lazyPictures, (pictureElement) => {
  const img = pictureElement.querySelector("img");
  const sources = pictureElement.querySelectorAll("source");

  // Cleanup tasks after the image loads. Important to
  // define this handler before setting src/srcsets.
  img.onload = () => {
    pictureElement.dataset.loaded = true;
    img.removeAttribute("data-src");
  };
  img.onerror = () => {
    pictureElement.dataset.loaded = false;
  };

  // Swap in the media sources
  sources.forEach((source) => {
    source.sizes = source.dataset.sizes;
    source.srcset = source.dataset.srcset;
    source.removeAttribute("data-srcset");
    source.removeAttribute("data-sizes");
  });

  // Swap in the image
  img.src = img.dataset.src;
});

const lazyImages = document.querySelectorAll("picture");

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log(entry.target);

      //entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  });
};

const options = {
  // root: по умолчанию window,
  // но можно задать любой элемент-контейнер
  rootMargin: "0px 0px 75px 0px",
  threshold: 0,
};

const observer = new IntersectionObserver(callback);

lazyImages.forEach((image) => observer.observe(image));
*/

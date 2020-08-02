const FilesToCache = ["/", "./login", "./members"];

self.addEventListener("install", (event) => {
  console.log(event);
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll(FilesToCache);
    })
  );
});

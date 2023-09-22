const ACCESS_TOKEN_MAP_BOX =
"access_token=pk.eyJ1IjoibHVhbnM2NjA1IiwiYSI6ImNsbW5wNXppeDBoNjAycnFnZmNndnR2bmIifQ.nRh2wOdDYJXuBAkJfjH0Eg";


export const fetchLocalMapBox = (local: string) =>
fetch(
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?${ACCESS_TOKEN_MAP_BOX}`
).then(response => response.json()).then(data => data);


export const SearchLocalMapBox = (local: string) =>
fetch(
  `https://api.mapbox.com/geocoding/v5/mapbox.places/${local}.json?country=br&proximity=ip&types=address&language=pt&${ACCESS_TOKEN_MAP_BOX}`
).then(response => response.json()).then(data => data);
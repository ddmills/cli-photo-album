const axios = require('axios');
const albumId = process.argv[2];

if (!albumId) throw new Error('Please input an album id');

const endpoint = `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`;

axios.get(endpoint).then(({ data }) => {
  console.log(`Album ${albumId} contains ${data.length} photos`);
  data.forEach(photo => {
    console.log(`[${photo.id}] ${photo.title}`);
  });
});

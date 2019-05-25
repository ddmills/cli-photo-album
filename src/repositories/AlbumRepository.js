import axios from 'axios';
import { AlbumFactory } from '../factories/AlbumFactory';

const PHOTOS_ENDPOINT = 'https://jsonplaceholder.typicode.com/photos';

const fetchRawAlbum = albumId => {
  return axios.get(PHOTOS_ENDPOINT, {
    params: {
      albumId,
    },
  });
};

export class AlbumRepository {
  static async fetchAlbumById(albumId) {
    try {
      const response = await fetchRawAlbum(albumId);

      return AlbumFactory.createFromJSON(albumId, response.data);
    } catch (e) {
      throw new Error(`Album with id ${albumId} was not found`);
    }
  }
}

import { Album } from '../domain/Album';
import { PhotoFactory } from '../factories/PhotoFactory';

export class AlbumFactory {
  static createFromJSON(albumId, photosJSON) {
    const album = Album.create();

    album.setId(albumId);

    photosJSON.forEach(photoJSON => {
      const photo = PhotoFactory.createFromJSON(photoJSON);

      album.addPhoto(photo);
    });

    return album;
  }
}

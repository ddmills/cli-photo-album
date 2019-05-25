import { Photo } from '../domain/Photo';

export class PhotoFactory {
  static createFromJSON(photoJSON) {
    const photo = Photo.create();

    photo.setId(photoJSON.id);
    photo.setAlbumId(photoJSON.albumId);
    photo.setTitle(photoJSON.title);
    photo.setUrl(photoJSON.url);
    photo.setThumbnailUrl(photoJSON.thumbnailUrl);

    return photo;
  }
}

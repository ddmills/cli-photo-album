import { Model } from './Model';

export class Photo extends Model {
  static create() {
    return new Photo();
  }

  setId(id) {
    this.id = id;
  }

  setAlbumId(albumId) {
    this.albumId = albumId;
  }

  setTitle(title) {
    this.title = title;
  }

  setUrl(url) {
    this.url = url;
  }

  setThumbnailUrl(thumbnailUrl) {
    this.thumbnailUrl = thumbnailUrl;
  }
}

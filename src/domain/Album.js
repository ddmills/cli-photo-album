import { Model } from './Model';

export class Album extends Model {
  constructor() {
    super();
    this.photos = [];
    this.id = null;
  }

  setId(id) {
    this.id = id;
  }

  addPhoto(photo) {
    this.photos = [...this.photos, photo];
  }
}

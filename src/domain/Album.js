export class Album {
  constructor() {
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

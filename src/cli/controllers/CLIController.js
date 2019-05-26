import { AlbumRepository } from '../../repositories/AlbumRepository';
import { log } from '../utility/Logger';

export class CLIController {
  static async interpret(ps) {
    const args = ps.argv.slice(2);
    const albumId = args[0];

    if (!albumId) {
      throw new Error('Please input an album id');
    }

    const album = await AlbumRepository.fetchAlbumById(albumId);

    log(album.toString());
    album.photos.forEach(photo => {
      log(photo.toString());
    });
  }
}

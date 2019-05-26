import { CLIController } from '../../../../src/cli/controllers/CLIController';
import { AlbumRepository } from '../../../../src/repositories/AlbumRepository';
import { Album } from '../../../../src/domain/Album';
import { Photo } from '../../../../src/domain/Photo';
import { expect } from 'chai';
import * as Logger from '../../../../src/cli/utility/Logger';
import * as random from '../../../utility/random';
import sinon from 'sinon';

describe('CLIController', () => {
  beforeEach(() => {
    sinon.stub(AlbumRepository, 'fetchAlbumById');
    sinon.stub(Logger, 'log');
  });

  describe('interpret', () => {
    let process;

    beforeEach(() => {
      process = {
        ...random.object(),
        argv: [random.string(), random.string()],
      };
    });

    describe('when the albumId is not provided', () => {
      let error;

      beforeEach(async () => {
        try {
          await CLIController.interpret(process);
        } catch (e) {
          error = e;
        }
      });

      it('should throw an error', () => {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal('Please input an album id');
      });
    });

    describe('when the albumId is provided', () => {
      let givenAlbumId, album, photos, expectedAlbumText, expectedPhotoTexts;

      beforeEach(async () => {
        givenAlbumId = random.int().toString();
        process.argv[2] = givenAlbumId;

        album = sinon.createStubInstance(Album);
        photos = random.arrayOf(() => sinon.createStubInstance(Photo));

        expectedAlbumText = random.string();
        album.photos = photos;
        album.toString.returns(expectedAlbumText);

        expectedPhotoTexts = photos.map(photo => {
          const text = random.string();

          photo.toString.returns(text);

          return text;
        });

        AlbumRepository.fetchAlbumById.resolves(album);

        await CLIController.interpret(process);
      });

      it('should fetch the album by id', () => {
        expect(AlbumRepository.fetchAlbumById).to.have.callCount(1);
        expect(AlbumRepository.fetchAlbumById).to.be.calledWithExactly(
          givenAlbumId
        );
      });

      it('should log out the album', () => {
        expect(album.toString).to.have.callCount(1);
        expect(album.toString).to.be.calledWithExactly();
        expect(Logger.log).to.be.calledWithExactly(expectedAlbumText);
      });

      it('should log out each photo in the album', () => {
        photos.forEach((photo, idx) => {
          expect(photo.toString).to.have.callCount(1);
          expect(photo.toString).to.be.calledWithExactly();
          expect(Logger.log).to.be.calledWithExactly(expectedPhotoTexts[idx]);
        });
      });
    });
  });
});

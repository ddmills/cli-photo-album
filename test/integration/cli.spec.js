import { CLIController as cli } from '../../src/cli/controllers/CLIController';
import * as Logger from '../../src/cli/utility/Logger';
import * as random from '../utility/random';
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';

const createPhotoResponse = albumId => () => ({
  albumId,
  id: random.natural(),
  title: random.string(),
  url: random.url(),
  thumbnailUrl: random.url(),
});

const createAlbumResponse = (albumId, photoCount) => {
  return random.arrayOf(createPhotoResponse(albumId), photoCount);
};

const listPhotos = albumId => {
  return cli.interpret({
    argv: [undefined, undefined, albumId],
  });
};

describe('cli', () => {
  beforeEach(() => {
    sinon.stub(axios, 'get');
    sinon.stub(Logger, 'log');
  });

  describe('when a valid album id is requested', () => {
    let givenAlbumId;

    beforeEach(async () => {
      givenAlbumId = random.natural();
    });

    describe('when the server responds successfully', () => {
      let serverResponse, photoCount;

      beforeEach(async () => {
        photoCount = random.d12();
        serverResponse = createAlbumResponse(givenAlbumId, photoCount);

        axios.get.resolves({
          data: serverResponse,
        });

        await listPhotos(givenAlbumId);
      });

      it('should make a request to the server', () => {
        expect(axios.get).to.have.callCount(1);
        expect(axios.get).to.be.calledWithExactly(
          'https://jsonplaceholder.typicode.com/photos',
          {
            params: {
              albumId: givenAlbumId,
            },
          }
        );
      });

      it('should log one line for every photo, and one for the length of the album', () => {
        expect(Logger.log).to.have.callCount(photoCount + 1);
      });

      it('should log the length of the album', () => {
        const firstLog = Logger.log.firstCall.args[0];

        expect(firstLog).to.equal(
          `Album ${givenAlbumId} contains ${photoCount} photos`
        );
      });

      it('should log each photo', () => {
        serverResponse.forEach(photo => {
          expect(Logger.log).to.be.calledWithExactly(
            `[${photo.id}] ${photo.title}`
          );
        });
      });
    });

    describe('when the server responds with an error', () => {
      let error;

      beforeEach(async () => {
        axios.get.rejects(new Error(random.string()));

        try {
          await listPhotos(givenAlbumId);
        } catch (e) {
          error = e;
        }
      });

      it('should throw an error', () => {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal(
          `Album with id ${givenAlbumId} was not found`
        );
      });
    });
  });

  describe('when an invalid album id is requested', () => {
    let error;

    beforeEach(async () => {
      try {
        await listPhotos(undefined);
      } catch (e) {
        error = e;
      }
    });

    it("shouldn't make any requests to the server", () => {
      expect(axios.get).to.have.callCount(0);
    });

    it('should throw an error', () => {
      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.equal('Please input an album id');
    });
  });
});

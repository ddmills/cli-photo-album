import { CLIController as cli } from '../../src/cli/controllers/CLIController';
import * as Logger from '../../src/cli/utility/Logger';
import * as random from '../utility/random';
import { expect } from 'chai';
import sinon from 'sinon';
import nock from 'nock';

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

const stubPhotosEndpoint = (server, albumId) => {
  return server.get('/photos').query({ albumId });
};

const listPhotos = albumId => {
  return cli.interpret({
    argv: [undefined, undefined, albumId],
  });
};

describe('cli', () => {
  let server;

  beforeEach(() => {
    sinon.stub(Logger, 'log');

    server = nock('https://jsonplaceholder.typicode.com');
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe('when a valid album id is requested', () => {
    let albumId;

    beforeEach(async () => {
      albumId = random.natural();
    });

    describe('when the server responds successfully', () => {
      let serverResponse, photoCount, endpoint;

      beforeEach(async () => {
        photoCount = random.d12();
        serverResponse = createAlbumResponse(albumId, photoCount);

        endpoint = stubPhotosEndpoint(server, albumId).reply(
          200,
          serverResponse
        );

        await listPhotos(albumId);
      });

      it('should make a request to the server', () => {
        expect(endpoint.isDone()).to.be.true;
      });

      it('should log one line for every photo, and one for the length of the album', () => {
        expect(Logger.log).to.have.callCount(photoCount + 1);
      });

      it('should log the length of the album', () => {
        const firstLog = Logger.log.firstCall.args[0];

        expect(firstLog).to.equal(
          `Album ${albumId} contains ${photoCount} photos`
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
        stubPhotosEndpoint(server, albumId).replyWithError(random.string());

        try {
          await listPhotos(albumId);
        } catch (e) {
          error = e;
        }
      });

      it('should throw an error', () => {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal(
          `Album with id ${albumId} was not found`
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

    it('should throw an error', () => {
      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.equal('Please input an album id');
    });
  });
});

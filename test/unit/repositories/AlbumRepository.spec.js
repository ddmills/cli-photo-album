import { AlbumRepository } from '../../../src/repositories/AlbumRepository';
import { AlbumFactory } from '../../../src/factories/AlbumFactory';
import { expect } from 'chai';
import * as random from '../../utility/random';
import axios from 'axios';
import sinon from 'sinon';

describe('AlbumRepository', () => {
  beforeEach(() => {
    sinon.stub(axios, 'get');
    sinon.stub(AlbumFactory, 'createFromJSON');
  });

  describe('fetchAlbumById', () => {
    let givenAlbumId, albums;

    beforeEach(() => {
      givenAlbumId = random.int();
    });

    describe('when the server returns a valid response', () => {
      let response, expectedAlbums;

      beforeEach(async () => {
        response = {
          ...random.object(),
          data: random.arrayOf(random.object),
        };
        expectedAlbums = random.arrayOf(random.object);

        axios.get.resolves(response);
        AlbumFactory.createFromJSON.returns(expectedAlbums);

        albums = await AlbumRepository.fetchAlbumById(givenAlbumId);
      });

      it('should make a GET request to the albums server', () => {
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

      it('should use the AlbumFactory to convert the response to an Album', () => {
        expect(AlbumFactory.createFromJSON).to.have.callCount(1);
        expect(AlbumFactory.createFromJSON).to.be.calledWithExactly(
          givenAlbumId,
          response
        );
      });

      it('should return the albums', () => {
        expect(albums).to.equal(expectedAlbums);
      });
    });

    describe('when the server returns an invalid response', () => {
      let error;

      beforeEach(async () => {
        axios.get.rejects(new Error(random.string()));

        try {
          await AlbumRepository.fetchAlbumById(givenAlbumId);
        } catch (e) {
          error = e;
        }
      });

      it('should throw an album not-found error', () => {
        expect(error).to.be.an.instanceOf(Error);
        expect(error.message).to.equal(
          `Album with id ${givenAlbumId} was not found`
        );
      });
    });
  });
});

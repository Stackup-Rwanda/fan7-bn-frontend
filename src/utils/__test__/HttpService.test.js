import moxios from 'moxios';
import { instance } from '../API';
import HttpService from '../HttpService';

const onSuccess = response => {
  console.debug('Request Successful!', response);
  return response.data;
};

const onError = error => {
  console.error('Request Failed:', error);
  return error;
};

describe('HttpService Test', () => {
  beforeEach(() => {
    moxios.install(instance);
  });
  afterEach(() => {
    moxios.uninstall(instance);
  });

  it('GET Request', () => {
    const mockData = {
      data: {
        status: 200,
        responseText: {
          status: 200,
          message: 'All requests',
          data: {
            count: 2,
            rows: [
              { id: 1, reason: 'Business', status: 'Pending' },
              { id: 2, reason: 'Business', status: 'Pending' },
            ],
          },
        },
      },
    };
    const data = {
      count: 2,
      rows: [
        { id: 1, reason: 'Business', status: 'Pending' },
        { id: 2, reason: 'Business', status: 'Pending' },
      ],
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith(onSuccess(mockData));
    });

    HttpService.get('/test').then(res => {
      expect(res).toEqual(data);
    });
  });

  it('POST Request', () => {
    const mockData = {
      data: {
        status: 200,
        responseText: {
          status: 200,
          message: 'All requests',
          data: {
            count: 2,
            rows: [
              { id: 1, reason: 'Business', status: 'Pending' },
              { id: 2, reason: 'Business', status: 'Pending' },
            ],
          },
        },
      },
    };
    const data = {
      count: 2,
      rows: [
        { id: 1, reason: 'Business', status: 'Pending' },
        { id: 2, reason: 'Business', status: 'Pending' },
      ],
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith(onSuccess(mockData));
    });

    HttpService.post('/test', data).then(res => {
      expect(res).toEqual(data);
    });
  });

  it('PATCH Request', () => {
    const mockData = {
      data: {
        status: 200,
        responseText: {
          status: 200,
          message: 'All requests',
          data: {
            count: 2,
            rows: [
              { id: 1, reason: 'Business', status: 'Pending' },
              { id: 2, reason: 'Business', status: 'Pending' },
            ],
          },
        },
      },
    };
    const data = {
      count: 2,
      rows: [
        { id: 1, reason: 'Business', status: 'Pending' },
        { id: 2, reason: 'Business', status: 'Pending' },
      ],
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith(onSuccess(mockData));
    });

    HttpService.patch('/test', data).then(res => {
      expect(res).toEqual(data);
    });
  });

  it('PUT Request', () => {
    const mockData = {
      data: {
        status: 200,
        responseText: {
          status: 200,
          message: 'All requests',
          data: {
            count: 2,
            rows: [
              { id: 1, reason: 'Business', status: 'Pending' },
              { id: 2, reason: 'Business', status: 'Pending' },
            ],
          },
        },
      },
    };
    const data = {
      count: 2,
      rows: [
        { id: 1, reason: 'Business', status: 'Pending' },
        { id: 2, reason: 'Business', status: 'Pending' },
      ],
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith(onSuccess(mockData));
    });

    HttpService.put('/test', data).then(res => {
      expect(res).toEqual(data);
    });
  });

  it('DELETE Request', () => {
    const mockData = {
      data: {
        status: 200,
        responseText: {
          status: 200,
          message: 'All requests',
          data: {
            count: 2,
            rows: [
              { id: 1, reason: 'Business', status: 'Pending' },
              { id: 2, reason: 'Business', status: 'Pending' },
            ],
          },
        },
      },
    };
    const data = {
      count: 2,
      rows: [
        { id: 1, reason: 'Business', status: 'Pending' },
        { id: 2, reason: 'Business', status: 'Pending' },
      ],
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith(onSuccess(mockData));
    });

    HttpService.delete('/test').then(res => {
      expect(res).toEqual(data);
    });
  });
});

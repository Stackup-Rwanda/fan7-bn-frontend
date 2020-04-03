import Error from '../errors';

describe('Errors helper tests', () => {
  it('should handle response error code', () => {
    const error = {
      status: 403,
      response: {
        status: 403,
        data: {
          error: 'Response error',
        },
      },
    };

    expect(Error.errorCode(error)).toEqual(403);
  });

  it('should handle request error code', () => {
    const error = {
      request: {
        status: 400,
      },
      message: 'Request error',
    };

    expect(Error.errorCode(error)).toEqual(500);
  });

  it('should handle request 500 error code', () => {
    const error = {
      error: {
        status: 500,
      },
      message: 'Request error',
    };

    expect(Error.errorCode(error)).toEqual(500);
  });

  it('should handle select error response message', () => {
    const error = {
      status: 403,
      response: {
        status: 403,
        data: {
          error: 'Response error',
        },
      },
    };

    expect(Error.selectMessage(error)).toEqual('Response error');
  });

  it('should handle select error request message', () => {
    const error = {
      request: {
        status: 500,
      },
      message: 'Request error',
    };

    expect(Error.selectMessage(error)).toEqual('Request error');
  });

  it('should handle select error undefined message', () => {
    const error = {
      res: {
        status: 500,
        data: 'Malformed error',
      },
    };

    expect(Error.selectMessage(error)).toBe(undefined);
  });

  it('should handle error', () => {
    const error = {
      response: {
        status: 403,
        data: {
          error: 'Forbidden',
        },
      },
    };

    Error.handle(error)

  });

  it('should handle error', () => {
    const error = {
      response: {
        status: 422,
        data: {
          error: 'Invalid input',
        },
      },
    };

    Error.handle(error)

  });
});

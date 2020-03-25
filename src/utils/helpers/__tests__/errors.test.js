import Error from '../errors';

jest.mock('../errors');

describe('Errors helper tests', () => {
  const history = {
    push: jest.fn(),
  };

  it('should handle response error', () => {
    const error = {
      response: {
        status: 403,
        data: {
          error: 'Response error',
        },
      },
    };

    Error.handle(error);

    expect(Error.handle).toHaveBeenCalled();
  });

  it('should handle request error', () => {
    const error = {
      request: {
        status: 500,
      },
      message: 'Response error',
    };

    Error.handle(error);

    expect(Error.handle).toHaveBeenCalled();
  });

  it('should call error function', () => {
    const error = {
        response: {
          status: 422,
          data: {
            error: 'Invalid input',
          },
        },
      };

    Error.errorCode(error);

    expect(Error.errorCode).toHaveBeenCalled();
  });
});

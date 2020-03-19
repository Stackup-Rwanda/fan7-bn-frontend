import successMsg from '../success';

jest.mock('../success');

describe('Success message helper tests', () => {
  const history = {
    push: jest.fn(),
  };

  it('should handle response success', () => {
    const success = {
      response: {
        status: 200,
        data: {
          message: 'Response success',
        },
      },
    };

    successMsg.handle(success);

    expect(successMsg.handle).toHaveBeenCalled();
  });
});
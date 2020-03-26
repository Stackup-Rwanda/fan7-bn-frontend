import sendEmail from './actions';
import realEmail from '../../../mocks/user';

const dispatch = jest.fn((action) => action);

describe('forget password action', () =>  {
it('should be able to send email', async () => {
    const response = sendEmail(realEmail) (dispatch);
    expect(response.data).toEqual(realEmail);
});
});
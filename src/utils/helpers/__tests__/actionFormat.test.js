import actionFormat from '../actionFormat';
<<<<<<< HEAD
import { storeToken } from '../authHelper';
=======
import storeToken from '../authHelper';
>>>>>>> ft(social-login):log user with social media accounts

describe('Action', () => {
  const type = 'TEST';
  const data = {
    id: 1,
    name: 'Nomad',
  };
  it('Should handle action triggered', () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywic29jaWFsX2lkIjoiMTEzNDM5MjA2NjI0MjU1MzQ3MDY2IiwidXNlcm5hbWUiOiJNaXN0aWNvIENsZW1lbnQiLCJpbWFnZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdnTUNfSVRzT3pvbnVYWERUNThrQndpamhoeUh5LWxrTDJNSlNHaHNnIiwicHJvdmlkZXIiOiJnb29nbGUiLCJpYXQiOjE1ODQ1Nzg2MzZ9.Nnmz_HWQP-GBDT-H0HyAPGPNnjKi2V9Kf_cEwqfAv5k';
    storeToken(token);
    actionFormat(type, data);
    expect(type).toStrictEqual('TEST');
    expect(data).toStrictEqual({ id: 1, name: 'Nomad' });
  });
});

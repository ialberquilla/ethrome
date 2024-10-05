import { IExecWeb3mail } from '@iexec/web3mail';
import { checkCurrentChain, checkIsConnected } from './mail-config';
import { IExecDataProtectorCore } from '@iexec/dataprotector';
import { IExecDataProtector } from '@iexec/dataprotector';

export async function fetchMyContacts() {
  try {
    checkIsConnected();
  } catch (err) {
    return { contacts: null, error: 'Please install MetaMask' };
  }
  await checkCurrentChain();
  const web3mail = new IExecWeb3mail(window.ethereum);
  const contacts = await web3mail.fetchMyContacts();
  
  return { contacts, error: '' };
}

export async function sendMail(
  mailObject: string,
  mailContent: string,
  protectedData: string,
  contentType?: string,
  senderName?: string
) {
  checkIsConnected();
  await checkCurrentChain();
  const web3mail = new IExecWeb3mail(window.ethereum);
  const { taskId } = await web3mail.sendEmail({
    emailSubject: mailObject,
    emailContent: mailContent,
    protectedData,
    contentType,
    senderName,
    /**
     * this demo uses a workerpool offering free computing power dedicated to learning
     * this resource is shared and may be throttled, it should not be used for production applications
     * remove the `workerpoolAddressOrEns` option to switch back to a production ready workerpool
     */
  });
  console.log('iExec worker taskId', taskId);
  return taskId;
}

export async function grantAccess(protectedData: string, authorizedApp: string, authorizedUser: string) {
  const dataProtector = new IExecDataProtector(window.ethereum);

  const dataProtectorCore = dataProtector.core;

  const grantedAccess = await dataProtectorCore.grantAccess({
    protectedData,
    authorizedApp: '0x781482C39CcE25546583EaC4957Fb7Bf04C277D2',
    authorizedUser,
    numberOfAccess: 1000000,
    pricePerAccess:0,
    onStatusUpdate: ({ title, isDone }) => {
      console.log(title, isDone);
    },
  });
}

export async function protectData (email: string){
  const dataProtector = new IExecDataProtector(window.ethereum);

  const dataProtectorCore = dataProtector.core;

  const protectedData = await dataProtectorCore.protectData({
    data: {
      email
    },
  });

  return protectedData

}
import { useWriteContract } from 'wagmi';
import deployedContracts from './deployedContracts';
import { parseEther, toBytes } from 'viem';

export function useAddPayment() {
  const contractAddress = deployedContracts[31337].PaymentManager.address;
  const contractABI = deployedContracts[31337].PaymentManager.abi;

  const { data, isSuccess, writeContract } = useWriteContract();

  const callAddPayment = async (user: string, amount: string) => {
    if (writeContract) {
      await writeContract({
        address: contractAddress,
        abi: contractABI,
        functionName: 'addPayment',
        args: [user as `0x${string}`, user as `0x${string}`],
      });
    }
  };

  return { callAddPayment, data, isSuccess };
}

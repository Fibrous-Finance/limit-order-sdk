import { Call } from 'starknet';
import { LimitOrder } from '@fibrous/limit-order-sdk';
import { account } from './account';
import { RPC_URL, accountPrivateKey, accountPublicKey } from './mockData';

async function cancelOrder() {
   const limitOrder = new LimitOrder(RPC_URL);

   const nonce = await limitOrder.getNonce(accountPublicKey);

   const cancelOrderCallData: Call = await limitOrder.cancelOrder(nonce.data);
   const myAccount = account(RPC_URL, accountPublicKey, accountPrivateKey, '1');

   const txHash = await myAccount.execute([cancelOrderCallData]);

   return txHash;
}

cancelOrder();

import { LimitOrder, nonceResponse } from '@fibrous/limit-order-sdk';

async function getNonce(): Promise<nonceResponse> {
   const limitOrder = new LimitOrder();
   const walletAddress = 'wallet_address';

   const nonce: nonceResponse = await limitOrder.getNonce(walletAddress);

   return nonce;
}

getNonce();

import { Signature } from 'starknet';
import { LimitOrder, signMessageResponse } from '@fibrous/limit-order-sdk';
import { account } from './account';
import { RPC_URL, accountPrivateKey, accountPublicKey, mockOrder } from './mockData';

async function fullPlaceOrder() {
   const limitOrder = new LimitOrder(RPC_URL);

   const signMessageResp: signMessageResponse = await limitOrder.signMessage(mockOrder);
   const myAccount = account(RPC_URL, accountPublicKey, accountPrivateKey, '1');

   const signedMessage: any = await myAccount.signMessage(signMessageResp.typedData);

   const approveCallData = limitOrder.approveOrderAmount(mockOrder.maker_asset, mockOrder.maker_amount.toString());

   const txHash = await myAccount.execute(approveCallData);

   mockOrder.order_hash = signMessageResp.orderHash;
   mockOrder.signature = [signedMessage.r.toString(), signedMessage.s.toString()];
   const placeOrderResp = await limitOrder.placeOrder(mockOrder);
   console.log(placeOrderResp);
}

fullPlaceOrder();

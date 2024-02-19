import { LimitOrder, Order, signMessageResponse } from '@fibrous/limit-order-sdk';
import { mockOrder } from './mockData';

async function signMessage(order: Order): Promise<signMessageResponse> {
   const limitOrder = new LimitOrder();

   const signedMessage: signMessageResponse = await limitOrder.signMessage(order);

   return signedMessage;
}

signMessage(mockOrder);

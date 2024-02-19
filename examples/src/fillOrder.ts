import { uint256 } from 'starknet';
import { LimitOrder, fillOrderResponse } from '@fibrous/limit-order-sdk';

async function fillOrder(order_hash: string, fill_amount?: string): Promise<fillOrderResponse> {
   const limitOrder = new LimitOrder();
   const response: fillOrderResponse = await limitOrder.fillOrder(order_hash, fill_amount);
   return response;
}
const fill_amount = uint256.bnToUint256(1000000000000000000);
fillOrder('order_hash', fill_amount.toString());

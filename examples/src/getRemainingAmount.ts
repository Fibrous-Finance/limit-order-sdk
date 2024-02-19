import { LimitOrder } from '@fibrous/limit-order-sdk';

async function getRemainingAmount(order_hash: string): Promise<string> {
   const RPC_URL = 'RPC_URL';
   const limitOrder = new LimitOrder(RPC_URL);
   const remainingAmount: string = await limitOrder.getRemainingAmount(order_hash);
   console.log(remainingAmount);
   return remainingAmount;
}

getRemainingAmount('order_hash');

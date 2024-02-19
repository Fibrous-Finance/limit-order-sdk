import { LimitOrder, Order, placeOrderResponse, convertDateToUnixTimestamp } from '@fibrous/limit-order-sdk';

async function placeOrder(order: Order): Promise<placeOrderResponse> {
   const limitOrder = new LimitOrder();
   const response: placeOrderResponse = await limitOrder.placeOrder(order);
   console.log(response);
   return response;
}

const order: Order = {
   signer: '0x00c2fd8e',
   maker_asset: '0x00c2fd8e',
   taker_asset: '0x00c2fd8e',
   maker_amount: 1000000000000000000,
   taker_amount: 1000000000000000000,
   order_price: 2770000000000000000000, // price of the maker asset in terms of the taker asset (unit amount)
   expiration: convertDateToUnixTimestamp({ days: 1 }), // expiration in 1 day
   use_solver: false, // if true, the order will be executed with the solver
   partial_fill: false, // if true, the order will be partially filled
   nonce: 1, // ref. ./getNonce.ts
   order_hash: 'order_hash', // ref. ./signMessage.ts
   signature: ['sig_r', 'sign_s'], // ref. ./signMessage.ts
};

placeOrder(order);

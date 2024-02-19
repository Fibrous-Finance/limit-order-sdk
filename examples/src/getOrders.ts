import { LimitOrder, getOrdersResponse, orderToHumanReadable, ordersFilter } from '@fibrous/limit-order-sdk';

async function getOrders(): Promise<getOrdersResponse> {
   const limitOrder = new LimitOrder();
   const filters: ordersFilter = {
      wallet_address: '',
      maker_asset: '',
      taker_asset: '',
      maker_amount: '',
      taker_amount: '',
      order_price: '',
      page: 1,
      pageSize: 10,
   };

   const openOrders: getOrdersResponse = await limitOrder.getOrders();
   const tokens = await fetch('https://graph.fibrous.finance/tokens');
   const tokensData = await tokens.json();

   // Convert the first order to human readable format
   const humanReadableOrder = orderToHumanReadable(openOrders.data[0], tokensData);
   console.log('humanReadableOrder', humanReadableOrder);
   return openOrders;
}

getOrders();

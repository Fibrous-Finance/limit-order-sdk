import { parseUnits } from 'ethers';
import { LimitOrder, orderToHumanReadable } from '@fibrous/limit-order-sdk';
import { account } from './account';
import { RPC_URL, accountPrivateKey, accountPublicKey } from './mockData';
import { Call } from 'starknet';

async function fullFillOrder() {
   const limitOrder = new LimitOrder(RPC_URL);
   const myAccount = account(RPC_URL, accountPublicKey, accountPrivateKey, '1');

   const orders = await limitOrder.getOrders({
      maker_asset: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
   });
   const fill_amount = parseUnits('0.01', 6); // ETH maker_amount of order
   const selectedOrder = orders.data[0];

   const tokens = await fetch('https://graph.fibrous.finance/tokens');
   const tokensData = await tokens.json();
   console.log(orderToHumanReadable(selectedOrder, tokensData));
   const fillOrderResp = await limitOrder.fillOrder(selectedOrder.order_hash as string, fill_amount.toString());
   const fillOrderCallData: Call = {
      contractAddress: limitOrder.DEFAULT_CONTRACT_ADDRESS,
      entrypoint: 'fillOrder',
      calldata: fillOrderResp.data,
   };

   const approveCallData = limitOrder.approveOrderAmount(
      selectedOrder.taker_asset,
      selectedOrder.taker_amount.toString()
   );
   const callData = [approveCallData, fillOrderCallData];
   const txHash = await myAccount.execute(callData);

   console.log(txHash);
}

fullFillOrder();

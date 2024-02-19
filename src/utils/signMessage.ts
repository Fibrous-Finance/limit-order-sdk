import { typedData, uint256 } from 'starknet';
import { SignOrder, types } from './types';
import { Order, signMessageResponse } from '../types/orders';

const chainId = '0x534e5f474f45524c49';
function getDomain(chainId: string): typedData.StarkNetDomain {
   return {
      name: 'Fibrous Finance',
      version: '1',
      chainId,
   };
}

function getTypedDataHash(myStruct: SignOrder, chainId: string, owner: string): string {
   return typedData.getMessageHash(getTypedData(myStruct, chainId), owner);
}

// Needed to reproduce the same structure as:
// https://github.com/0xs34n/starknet.js/blob/1a63522ef71eed2ff70f82a886e503adc32d4df9/__mocks__/typedDataStructArrayExample.json
function getTypedData(myStruct: SignOrder, chainId: string): typedData.TypedData {
   return {
      types,
      primaryType: 'Order',
      domain: getDomain(chainId),
      message: { ...myStruct },
   };
}

export const signMessage = (order: Order, nonce: number): signMessageResponse => {
   const orderStruct: SignOrder = {
      signer: order.signer,
      makerAsset: order.maker_asset,
      takerAsset: order.taker_asset,
      makerAmount: uint256.bnToUint256(order.maker_amount),
      takerAmount: uint256.bnToUint256(order.taker_amount),
      orderPrice: uint256.bnToUint256(order.order_price),
      useSolver: order.use_solver,
      partialFill: order.partial_fill,
      expiration: order.expiration,
      nonce: nonce,
   };
   let typedDataValidate: typedData.TypedData = {
      domain: getDomain(chainId),
      message: { ...orderStruct },
      primaryType: 'Order',
      types: types,
   };
   const typedDataHash = getTypedDataHash(orderStruct, chainId, order.signer);

   return { orderHash: typedDataHash, typedData: typedDataValidate };
};

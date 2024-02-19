import { uint256 } from 'starknet';

export const types = {
   StarkNetDomain: [
      { name: 'name', type: 'felt' },
      { name: 'version', type: 'felt' },
      { name: 'chainId', type: 'felt' },
   ],
   Order: [
      { name: 'signer', type: 'ContractAddress' },
      { name: 'makerAsset', type: 'ContractAddress' },
      { name: 'takerAsset', type: 'ContractAddress' },
      { name: 'makerAmount', type: 'u256' },
      { name: 'takerAmount', type: 'u256' },
      { name: 'orderPrice', type: 'u256' },
      { name: 'useSolver', type: 'bool' },
      { name: 'partialFill', type: 'bool' },
      { name: 'expiration', type: 'u64' },
      { name: 'nonce', type: 'u64' },
   ],
   u256: [
      { name: 'low', type: 'felt' },
      { name: 'high', type: 'felt' },
   ],
};

export interface SignOrder {
   signer: string;
   makerAsset: string;
   takerAsset: string;
   makerAmount: uint256.Uint256;
   takerAmount: uint256.Uint256;
   orderPrice: uint256.Uint256;
   useSolver: boolean;
   partialFill: boolean;
   expiration: number;
   nonce?: number;
}

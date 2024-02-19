import { Order, convertDateToUnixTimestamp } from '../../src';

export const mockOrder: Order = {
   signer: 'YOUR_WALLET_ADDRESS',
   maker_asset: '0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9',
   taker_asset: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
   maker_amount: 1000000000000000000,
   taker_amount: 1000000000000000000,
   order_price: 2770000000000000000000,
   expiration: 1707098659, // convertDateToUnixTimestamp({ days: 1 }),
   use_solver: false,
   partial_fill: true,
};
export const accountPrivateKey = '';
export const accountPublicKey = '';
export const RPC_URL = 'https://starknet-mainnet.blastapi.io/83e0811d-e14f-42b0-b556-65246d733267/rpc/v0.4';

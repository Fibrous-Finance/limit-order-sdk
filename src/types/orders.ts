import { typedData } from 'starknet';

/**
 * @typedef {Object} Order
 * @property {string} signer - Wallet address of the signer
 * @property {string} maker_asset - Contract address of the signer wants to sell
 * @property {string} taker_asset - Contract address of the signer wants to buy
 * @property {number} maker_amount - Amount of the signer wants to sell amount
 * @property {number} taker_amount - Amount of the signer wants to buy amount
 * @property {number} order_price - If signer mark as solver, solver will use this price to calculate the amount of the taker asset
 * @property {number} expiration - Expiration time of the order
 * @property {boolean} use_solver - If signer mark as solver, solver will be execute the order with the order price and will charge network fee from the signer
 * @property {boolean} partial_fill - If signer mark as partial fill, order will be executed with the amount of the taker asset
 * @property {string} [order_hash] - Order hash of the order
 * @property {string[]} [signature] - Signature of the order
 * @property {number} [nonce] - Nonce of the user order
 */
export type Order = {
   signer: string;
   maker_asset: string;
   taker_asset: string;
   maker_amount: number;
   taker_amount: number;
   order_price: number;
   expiration: number;
   use_solver: boolean;
   partial_fill: boolean;
   order_hash?: string;
   signature?: string[];
   nonce?: number;
};

/**
 * @typedef {Object} supportedPairsResponse
 * @property {string} status - Status of the response
 * @property {number} code - Status code of the response
 * @property {string[]} data - Supported pairs
 */
export type supportedPairsResponse = {
   status: string;
   code: number;
   data: string[];
};

/**
 * @typedef {Object} getOrdersResponse
 * @property {string} status - Status of the response
 * @property {number} code - Status code of the response
 * @property {Order[]} data - Orders
 */
export type getOrdersResponse = {
   status: string;
   code: number;
   data: Order[];
};

/**
 * @typedef {Object} ordersFilter
 * @property {string} [wallet_address] - Filter orders by wallet address
 * @property {string} [maker_asset] - Filter orders by maker asset contract address
 * @property {string} [taker_asset] - Filter orders by taker asset contract address
 * @property {number} [maker_amount] - Filter orders by maker amount if higher than the amount
 * @property {number} [taker_amount] - Filter orders by taker amount if higher than the amount
 * @property {number} [order_price] - Filter orders by order price if higher than the price
 * @property {number} [page] - Page number of the orders
 * @property {number} [pageSize] - Page size of the orders
 */
export type ordersFilter = {
   wallet_address?: string;

   maker_asset?: string;

   taker_asset?: string;

   maker_amount?: string;

   taker_amount?: string;

   order_price?: string;

   page?: number;

   pageSize?: number;
};

/**
 * @typedef {Object} nonceResponse
 * @property {string} status - Status of the response
 * @property {number} code - Status code of the response
 * @property {number} data - Nonce of the user
 */
export type nonceResponse = {
   status: string;
   code: number;
   data: number;
};

/**
 * @typedef {Object} fillOrderResponse
 * @property {string} status - Status of the response
 * @property {number} code - Status code of the response
 * @property {string[]} data - Calldata of the order
 */
export type fillOrderResponse = {
   status: string;
   code: number;
   data: string[];
};

/**
 * @typedef {Object} signMessageResponse
 * @property {string} orderHash - Order hash of the order
 * @property {typedData.TypedData} typedData - Typed data of the order
 */
export type signMessageResponse = {
   orderHash: string;
   typedData: typedData.TypedData;
};

export type placeOrderResponse = {
   status: string;
   code: number;
   data: Order;
};

import { Call } from 'starknet';
import {
   Order,
   placeOrderResponse,
   fillOrderResponse,
   getOrdersResponse,
   nonceResponse,
   ordersFilter,
   signMessageResponse,
} from '../types';

export interface ILimitOrder {
   DEFAULT_API_URL: string;
   DEFAULT_CONTRACT_ADDRESS: string;
   API_URL: string;
   RPC_URL: string;

   /**
    *
    * @memberof LimitOrder
    * @description Get user nonce for signing
    * @method getNonce
    * @param {string} walletAddress
    * @returns {Promise<nonceResponse>}
    */
   getNonce(walletAddress: string): Promise<nonceResponse>;

   /**
    *
    * @memberof LimitOrder
    * @description Get remaining amount of order if maker allowed to partially fill
    * @method getRemainingAmount
    * @param {string} orderHash
    * @returns {Promise<string>}
    */
   getRemainingAmount(orderHash: string): Promise<string>;

   /**
    *
    * @memberof LimitOrder
    * @description Get open orders by filter
    * @method getOrders
    * @param {ordersFilter} [filter]
    * @returns {Promise<getOrdersResponse>}
    */
   getOrders(filter?: ordersFilter): Promise<getOrdersResponse>;

   /**
    *
    * @memberof LimitOrder
    * @description Build calldata to fill order by order hash
    * @method fillOrder
    * @param {string} orderHash
    * @returns {Promise<fillOrderResponse>}
    */
   fillOrder(orderHash: string, fill_amount?: string): Promise<fillOrderResponse>;

   /**
    *
    * @memberof LimitOrder
    * @description Sign order message with Fibrous message standard
    * @method signMessage
    * @param {Order} order
    * @returns {Promise<signMessageResponse>}
    */
   signMessage(order: Order): Promise<signMessageResponse>;

   /**
    *
    * @memberof LimitOrder
    * @description Place order
    * @method placeOrder
    * @param {Order} order
    * @returns {Promise<placeOrderResponse>}
    */
   placeOrder(order: Order): Promise<placeOrderResponse>;

   /**
    * @description Approve to limit order contract to spend maker asset
    * @method approveOrderAmount
    * @param {Order} order
    * @returns  {Call}
    */
   approveOrderAmount(token_address: string, amount: string): Call;

   /**
    * @description Cancel order
    * @method cancelOrder
    * @param {number} nonce
    * @returns  {Call}
    */
   cancelOrder(nonce: number): Call;
}

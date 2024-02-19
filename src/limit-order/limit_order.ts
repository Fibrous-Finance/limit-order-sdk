import axios from 'axios';
import {
   Order,
   placeOrderResponse,
   fillOrderResponse,
   getOrdersResponse,
   nonceResponse,
   ordersFilter,
   signMessageResponse,
} from '../types/orders';
import { signMessage } from '../utils/signMessage';
import { LIMIT_ORDER_API_URL, LIMIT_ORDER_CONTRACT_ADDRESS } from '../constants';
import { Call, RpcProvider, uint256 } from 'starknet';
import { ILimitOrder } from '../interfaces';
export class LimitOrder implements ILimitOrder {
   readonly DEFAULT_API_URL: string = LIMIT_ORDER_API_URL;
   readonly DEFAULT_CONTRACT_ADDRESS: string = LIMIT_ORDER_CONTRACT_ADDRESS;

   public readonly API_URL: string;
   public readonly RPC_URL: string;

   constructor(rpc_url?: string, api_url?: string) {
      this.API_URL = api_url || this.DEFAULT_API_URL;
      this.RPC_URL = rpc_url || '';
   }

   /**
    *
    * @memberof LimitOrder
    * @description Get user nonce for signing
    * @method getNonce
    * @param {string} walletAddress
    * @returns {Promise<nonceResponse>}
    */
   async getNonce(walletAddress: string): Promise<nonceResponse> {
      const response = await fetch(`${this.API_URL}/nonce?walletAddress=${walletAddress}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      });
      return response.json();
   }

   /**
    *
    * @memberof LimitOrder
    * @description Get remaining amount of order if maker allowed to partially fill
    * @method getRemainingAmount
    * @param {string} orderHash
    * @returns {Promise<string>}
    */
   async getRemainingAmount(orderHash: string): Promise<string> {
      const provider = new RpcProvider({
         nodeUrl: this.RPC_URL,
      });
      const resp = await provider.callContract({
         contractAddress: this.DEFAULT_CONTRACT_ADDRESS,
         entrypoint: 'remaingAmount', // TODO: remainingAmount
         calldata: [orderHash],
      });
      const remainingAmount = uint256.uint256ToBN({
         low: resp.result[0],
         high: resp.result[1],
      });
      return remainingAmount.toString();
   }
   /**
    *
    * @memberof LimitOrder
    * @description Get open orders by filter
    * @method getOrders
    * @param {ordersFilter} [filter]
    * @returns {Promise<getOrdersResponse>}
    */
   async getOrders(filter?: ordersFilter): Promise<getOrdersResponse> {
      // build query string
      let queryString = '';
      if (filter) {
         queryString = Object.keys(filter)
            .map((key) => key + '=' + filter[key as keyof ordersFilter])
            .join('&');
      }
      const response = await fetch(`${this.API_URL}/orders?${queryString}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      });
      return response.json();
   }

   /**
    *
    * @memberof LimitOrder
    * @description Build calldata to fill order by order hash
    * @method fillOrder
    * @param {string} orderHash
    * @returns {Promise<fillOrderResponse>}
    */
   async fillOrder(orderHash: string, fill_amount?: string): Promise<fillOrderResponse> {
      const response = await fetch(`${this.API_URL}/fillOrder?order_hash=${orderHash}&fill_amount=${fill_amount}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
      });
      const data = await response.json();
      return data.data;
   }

   /**
    *
    * @memberof LimitOrder
    * @description Sign order message with Fibrous message standard
    * @method signMessage
    * @param {Order} order
    * @param {number} [nonce]
    * @returns {Promise<signMessageResponse>}
    */
   async signMessage(order: Order): Promise<signMessageResponse> {
      const nonceResponse = await this.getNonce(order.signer);
      const nonce = nonceResponse.data + 1;
      const signedMessage = signMessage(order, nonce);
      return signedMessage;
   }

   /**
    *
    * @memberof LimitOrder
    * @description Place order
    * @method placeOrder
    * @param {Order} order
    * @returns {Promise<placeOrderResponse>}
    */
   async placeOrder(order: Order): Promise<placeOrderResponse> {
      let data = JSON.stringify(order);

      let config = {
         method: 'post',
         maxBodyLength: Infinity,
         url: `${this.API_URL}/placeOrder`,
         headers: {
            'Content-Type': 'application/json',
         },
         data: data,
      };
      const response = await axios.request(config);
      return response.data;
   }

   /**
    * @description Approve to limit order contract to spend maker asset
    * @method approveOrderAmount
    * @param {Order} order
    * @returns  {string}
    */
   approveOrderAmount(token_address: string, amount: string): Call {
      const provider = new RpcProvider({
         nodeUrl: this.RPC_URL,
      });
      const approveAmount = uint256.bnToUint256(amount);
      return {
         contractAddress: token_address,
         entrypoint: 'approve',
         calldata: [this.DEFAULT_CONTRACT_ADDRESS, approveAmount.low, approveAmount.high],
      };
   }

   /**
    * @description Cancel order
    * @method cancelOrder
    * @param {number} nonce
    * @returns  {Call}
    */
   cancelOrder(nonce: number): Call {
      return {
         contractAddress: this.DEFAULT_CONTRACT_ADDRESS,
         entrypoint: 'cancelOrder',
         calldata: [nonce],
      };
   }
}

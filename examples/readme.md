## Limit Order SDK Documentation

This documentation provides detailed explanations and TypeScript examples for each parameter associated with the endpoints of the Limit Order SDK.

## Function: `getOrders()`

### Description:

This function retrieves open orders using the Limit Order SDK. It constructs a filter object based on specified parameters and queries the orders using the `LimitOrder.getOrders()` method.

Check out the [getOrders.ts](./src/getOrders.ts) file for example.

### Syntax:

```typescript
async function getOrders(): Promise<getOrdersResponse>;
```

#### Filter Parameters

| Parameter        | Type     | Description              |
| ---------------- | -------- | ------------------------ |
| `wallet_address` | `string` | Wallet address           |
| `maker_asset`    | `string` | Maker asset              |
| `taker_asset`    | `string` | Taker asset              |
| `maker_amount`   | `string` | Maker amount             |
| `taker_amount`   | `string` | Taker amount             |
| `order_price`    | `string` | Order price              |
| `page`           | `number` | Page number (default: 1) |
| `pageSize`       | `number` | Page size (default: 10)  |

### Returns:

`Promise<getOrdersResponse>`: A promise that resolves to an object containing the retrieved open orders.

### Example:

```typescript
import { LimitOrder, getOrdersResponse } from '../../src';
import { ordersFilter } from '../../src';

/**
 * Retrieves open orders using the Limit Order SDK.
 * @returns A promise that resolves to an object containing the retrieved open orders.
 */
async function getOrders(): Promise<getOrdersResponse> {
   // Create a new instance of LimitOrder
   const limitOrder = new LimitOrder();
   // Define filters for querying orders
   const filters: ordersFilter = {
      wallet_address: 'signer_address',
      maker_asset: 'maker_asset_address',
      taker_asset: 'take_asset_address',
      maker_amount: '100000000000000000',
      taker_amount: '100000000000000000',
      order_price: '1',
      page: 1,
      pageSize: 10,
   };
   // Retrieve open orders using the specified filters
   const openOrders: getOrdersResponse = await limitOrder.getOrders(filters);
   // Return the retrieved orders
   return openOrders;
}

// Call the getOrders function
getOrders()
   .then((orders) => {
      // Handle retrieved orders
      console.log('Retrieved orders:', orders);
   })
   .catch((error) => {
      // Handle error
      console.error('Error retrieving orders:', error);
   });
```

### Notes:

-  Ensure that appropriate import paths are used for the `LimitOrder` class, `getOrdersResponse` type, and `ordersFilter` type.
-  Modify the filter parameters (`wallet_address`, `maker_asset`, `taker_asset`, etc.) as needed to match your use case.
-  The function returns a promise, so you can handle retrieved orders or errors using `.then()` and `.catch()` respectively.

## Function: `getNonce()`

### Description:

This function retrieves the nonce for a given wallet address using the Limit Order SDK. The nonce is a unique number used for transaction ordering and prevention of replay attacks. It queries the nonce using the `LimitOrder.getNonce()` method.

Check out the [getNonce.ts](./src/getNonce.ts) file for example.

### Syntax:

```typescript
async function getNonce(): Promise<nonceResponse>;
```

### Parameters:

None

### Returns:

-  `Promise<nonceResponse>`: A promise that resolves to an object containing the retrieved nonce.

### Example:

```typescript
import { LimitOrder, nonceResponse } from '../../src/';

/**
 * Retrieves the nonce for a given wallet address using the Limit Order SDK.
 * @returns A promise that resolves to an object containing the retrieved nonce.
 */
async function getNonce(): Promise<nonceResponse> {
   // Create a new instance of LimitOrder
   const limitOrder = new LimitOrder();
   // Define the wallet address for which to retrieve the nonce
   const walletAddress = 'wallet_address';
   // Retrieve the nonce for the specified wallet address
   const nonce: nonceResponse = await limitOrder.getNonce(walletAddress);
   // Return the retrieved nonce
   return nonce;
}

// Call the getNonce function
getNonce()
   .then((nonce) => {
      // Handle retrieved nonce
      console.log('Retrieved nonce:', nonce);
   })
   .catch((error) => {
      // Handle error
      console.error('Error retrieving nonce:', error);
   });
```

### Notes:

-  Ensure that appropriate import paths are used for the `LimitOrder` class and `nonceResponse` type.
-  Modify the `walletAddress` variable to specify the wallet address for which to retrieve the nonce.
-  The function returns a promise, so you can handle the retrieved nonce or errors using `.then()` and `.catch()` respectively.

## Function: `getRemainingAmount()`

### Description:

This function retrieves the remaining amount for a specific order using the Limit Order SDK. It queries the remaining amount using the `LimitOrder.getRemainingAmount()` method.

Check out the [getRemainingAmount.ts](./src/getRemainingAmount.ts) file for example.

### Syntax:

```typescript
async function getRemainingAmount(order_hash: string): Promise<string>;
```

### Parameters:

| Name         | Type     | Description                                                       |
| ------------ | -------- | ----------------------------------------------------------------- |
| `order_hash` | `string` | The hash of the order for which to retrieve the remaining amount. |

### Returns:

-  `Promise<string>`: A promise that resolves to a string representing the remaining amount for the specified order.

### Example:

```typescript
import { LimitOrder } from '../../src/';

/**
 * Retrieves the remaining amount for a specific order using the Limit Order SDK.
 * @param order_hash The hash of the order for which to retrieve the remaining amount.
 * @returns A promise that resolves to a string representing the remaining amount for the specified order.
 */
async function getRemainingAmount(order_hash: string): Promise<string> {
   // Define the RPC URL for connecting to the blockchain network
   const RPC_URL = 'RPC_URL';
   // Create a new instance of LimitOrder with the specified RPC URL
   const limitOrder = new LimitOrder(RPC_URL);
   // Retrieve the remaining amount for the specified order
   const remainingAmount: string = await limitOrder.getRemainingAmount(order_hash);
   // Return the remaining amount
   return remainingAmount;
}

// Call the getRemainingAmount function with the order hash
getRemainingAmount('order_hash')
   .then((remainingAmount) => {
      // Handle retrieved remaining amount
      console.log('Remaining amount:', remainingAmount);
   })
   .catch((error) => {
      // Handle error
      console.error('Error retrieving remaining amount:', error);
   });
```

### Notes:

-  Ensure that appropriate import paths are used for the `LimitOrder` class.
-  Replace `"RPC_URL"` with the actual RPC URL of the blockchain network you're connecting to.
-  The function returns a promise, so you can handle the retrieved remaining amount or errors using `.then()` and `.catch()` respectively.

## Function: `signMessage()`

### Description:

This function signs a message, typically an order, using the Limit Order SDK.

Check out the [signMessage.ts](./src/signMessage.ts) file for example.

### Syntax:

```typescript
async function signMessage(order: Order, nonce?: number): Promise<signMessageResponse>;
```

### Parameters:

| Name    | Type    | Description               |
| ------- | ------- | ------------------------- |
| `order` | `Order` | The order object to sign. |

### Returns:

-  `Promise<signMessageResponse>`: A promise that resolves to an object containing the signed message.

### Example:

```typescript
import { LimitOrder, Order, signMessageResponse } from '../../src';
import { mockOrder } from './mockData';

/**
 * Signs a message, typically an order, using the Limit Order SDK.
 * @param order The order object to sign.
 * @returns A promise that resolves to an object containing the signed message.
 */
async function signMessage(order: Order): Promise<signMessageResponse> {
   const limitOrder = new LimitOrder();
   const signedMessage: signMessageResponse = await limitOrder.signMessage(order);
   return signedMessage;
}

// Call the signMessage function with the mock order
signMessage(mockOrder)
   .then((signedMessage) => {
      // Handle signed message
      console.log('Signed message:', signedMessage);
   })
   .catch((error) => {
      // Handle error
      console.error('Error signing message:', error);
   });
```

### Notes:

-  The `order` parameter should be a structure with the following fields:

| Name           | Type       | Description                                                     |
| -------------- | ---------- | --------------------------------------------------------------- |
| `signer`       | `string`   | The address of the signer.                                      |
| `maker_asset`  | `string`   | The address of the maker's asset.                               |
| `taker_asset`  | `string`   | The address of the taker's asset.                               |
| `maker_amount` | `number`   | The amount of the maker's asset.                                |
| `taker_amount` | `number`   | The amount of the taker's asset.                                |
| `order_price`  | `number`   | The price of the order.                                         |
| `expiration`   | `number`   | The expiration timestamp of the order.                          |
| `use_solver`   | `boolean`  | A boolean indicating whether to use a solver.                   |
| `partial_fill` | `boolean`  | A boolean indicating whether the order can be partially filled. |
| `order_hash`   | `string`   | (optional) The hash of the order.                               |
| `signature`    | `string[]` | (optional) The signature of the order.                          |
| `nonce`        | `number`   | (optional) The nonce value.                                     |

-  The `nonce` parameter is optional. If provided, it will be used for signing; otherwise, the SDK will generate one.
-  You don't need to provide `order_hash` and `signature` signMessage function will return.
-  The function returns a promise, so you can handle the signed message or errors using `.then()` and `.catch()` respectively.

## Function: `placeOrder()`

### Description:

This function places an order using the Limit Order SDK.

Check out the [placeOrder.ts](./src/placeOrder.ts) file for example.

### Syntax:

```typescript
async function placeOrder(order: Order): Promise<placeOrderResponse>;
```

### Parameters:

| Name    | Type    | Description                    |
| ------- | ------- | ------------------------------ |
| `order` | `Order` | The order object to be placed. |

### Returns:

-  `Promise<placeOrderResponse>`: A promise that resolves to an object containing the response from placing the order.

### Example:

```typescript
import { LimitOrder, Order, placeOrderResponse, convertDateToUnixTimestamp } from '../../src';

/**
 * Places an order using the Limit Order SDK.
 * @param order The order object to be placed.
 * @returns A promise that resolves to an object containing the response from placing the order.
 */
async function placeOrder(order: Order): Promise<placeOrderResponse> {
   const limitOrder = new LimitOrder();
   const response: placeOrderResponse = await limitOrder.placeOrder(order);
   return response;
}

// Example order object
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

// Call the placeOrder function with the example order object
placeOrder(order)
   .then((response) => {
      // Handle response from placing the order
      console.log('Order placed successfully:', response);
   })
   .catch((error) => {
      // Handle error
      console.error('Error placing order:', error);
   });
```

### Notes:

-  The `order` parameter should be a structure with specific fields indicating the details of the order. for more detailed about order struct check out signMessage section.
-  The function returns a promise, so you can handle the response from placing the order or errors using `.then()` and `.catch()` respectively.

## Function: `fillOrder()`

### Description:

This function fills an order with a specified amount using the Limit Order SDK.

Check out the [fillOrder.ts](./src/fillOrder.ts) file for example.

### Syntax:

```typescript
async function fillOrder(order_hash: string, fill_amount?: string): Promise<fillOrderResponse>;
```

### Parameters:

| Name          | Type     | Description                                              |
| ------------- | -------- | -------------------------------------------------------- |
| `order_hash`  | `string` | The hash of the order to be filled.                      |
| `fill_amount` | `string` | (Optional) The amount to fill the maker_amount of order. |

### Returns:

-  `Promise<fillOrderResponse>`: A promise that resolves to an object containing the response from filling the order.

### Example:

```typescript
import { LimitOrder, fillOrderResponse } from '../../src';
import { uint256 } from 'starknet';

/**
 * Fills an order with a specified amount using the Limit Order SDK.
 * @param order_hash The hash of the order to be filled.
 * @param fill_amount The amount to fill the maker_amount of order (optional).
 * @returns A promise that resolves to an object containing the response from filling the order.
 */
async function fillOrder(order_hash: string, fill_amount?: string): Promise<fillOrderResponse> {
   const limitOrder = new LimitOrder();
   const response: fillOrderResponse = await limitOrder.fillOrder(order_hash, fill_amount);
   return response;
}

// Example usage
const fill_amount = uint256.bnToUint256('1000000000000000000');

fillOrder('order_hash', fill_amount.toString())
   .then((response) => {
      // Handle response from filling the order
      console.log('Order filled successfully:', response);
   })
   .catch((error) => {
      // Handle error
      console.error('Error filling order:', error);
   });
```

### Notes:

-  The `fill_amount` parameter is optional. If provided, it specifies the amount with which to fill the maker_amount of order.
-  Ensure that appropriate import paths are used for the `LimitOrder` class, `fillOrderResponse` type, and `uint256` from the "starknet" library.
-  The function returns a promise, so you can handle the response from filling the order using `.then()` and `.catch()` respectively.

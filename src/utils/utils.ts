type DateFilter = {
   hours?: number;
   days?: number;
};

// Path: limit-order-sdk/src/utils/utils.ts
// Compare this snippet from limit-order-sdk/examples/src/getOrders.ts:

/**
 *
 * @description convert date to unix timestamp
 * @param date {DateFilter}
 * @returns unix timestamp
 */

export function convertDateToUnixTimestamp(date?: DateFilter): number {
   if (date?.hours) {
      return Math.floor(new Date().getTime() / 1000) + date.hours * 3600;
   } else if (date?.days) {
      return Math.floor(new Date().getTime() / 1000) + date.days * 24 * 3600;
   } else {
      return Math.floor(new Date().getTime() / 1000) + 365 * 24 * 3600;
   }
}

// Path: limit-order-sdk/src/utils/utils.ts
// Compare this snippet from limit-order-sdk/examples/src/getOrders.ts:

/**
 *
 * @description convert unix timestamp to date
 * @param unixTimestamp {number}
 * @returns date
 */
export function convertUnixTimestampToDate(unixTimestamp: number): Date {
   return new Date(unixTimestamp * 1000);
}

/**
 * Converts an order object to human-readable format.
 * @param {any} order - The order object to convert.
 * @param {any[]} tokens - An array of token objects containing token information.
 * @returns {Object} An object containing human-readable order information.
 */

export function orderToHumanReadable(order: any, tokens: any[]) {
   const makerToken = tokens.find((token) => token.address === order.maker_asset);
   const takerToken = tokens.find((token) => token.address === order.taker_asset);
   const makerAmount = order.maker_amount / Math.pow(10, makerToken.decimals);
   const takerAmount = order.taker_amount / Math.pow(10, takerToken.decimals);
   const makerAsset = makerToken.symbol;
   const takerAsset = takerToken.symbol;
   const orderPrice = order.order_price / Math.pow(10, takerToken.decimals);
   const remainingTakerAmount = order.remaining_taker_amount / Math.pow(10, takerToken.decimals);
   const remainingMakerAmount = order.remaining_maker_amount / Math.pow(10, makerToken.decimals);
   const expiration = convertUnixTimestampToDate(order.expiration);
   return {
      signer: order.signer,
      maker_asset: makerAsset,
      taker_asset: takerAsset,
      maker_amount: makerAmount,
      taker_amount: takerAmount,
      order_price: orderPrice,
      remaining_maker_amount: remainingMakerAmount,
      remaining_taker_amount: remainingTakerAmount,
      expiration: expiration,
      nonce: order.nonce,
      use_solver: order.use_solver,
      partial_fill: order.partial_fill,
      order_hash: order.order_hash,
      status: order.status,
      signature: order.signature,
   };
}

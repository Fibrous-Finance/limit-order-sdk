import { Account, CairoVersion, RpcProvider } from 'starknet';

export function account(node_url: string, public_key: string, privateKey: string, is_cairo_1: string) {
   const provider = new RpcProvider({
      nodeUrl: node_url,
   });

   const account = new Account(provider, public_key, privateKey, is_cairo_1 as CairoVersion);

   return account;
}

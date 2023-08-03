import baseX from "base-x"
import { v4 as uuidv4 } from "uuid"

function encodeBase58(buf: Buffer): string {
  const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

  return baseX(alphabet).encode(buf)
}
/**
 * Generate ids similar to stripe
 */
export class IdGenerator<TPrefixes extends string> {
  private prefixes: Record<TPrefixes, string>

  /**
   * Create a new id generator with fully typed prefixes
   * @param prefixes - Relevant prefixes for your domain
   */
  constructor(prefixes: Record<TPrefixes, string>) {
    this.prefixes = prefixes
  }

  /**
   * Generate a new unique base58 encoded uuid with a defined prefix
   *
   * @returns xxxxxx_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   */
  public id = (prefix: TPrefixes): string => {
    return [
      this.prefixes[prefix],
      encodeBase58(Buffer.from(uuidv4().replace(/-/g, ""), "hex")),
    ].join("_")
  }
}

export const newId = new IdGenerator({
  destination: "dest",
  page: "page",
  channel: "chan",
  report: "rep",
  session: "sess",
  event: "evt",
  user: "user",
  tenant: "tenant",
  webhook: "wh",
  api: "api", // internal id
  apiKey: "hs", // short for "highstorm"
}).id
import { check } from "k6"
import http from "k6/http"

export const options = {
  stages: [
    { duration: "10s", target: 1 },
    { duration: "2m", target: 1 },
    { duration: "10s", target: 2 },
    { duration: "2m", target: 2 },
    { duration: "10s", target: 3 },
    { duration: "2m", target: 3 },
    { duration: "10s", target: 4 },
    { duration: "2m", target: 4 },
    { duration: "10s", target: 5 },
    { duration: "2m", target: 5 },
  ],

  thresholds: {
    http_req_duration: ["p(50)<25", "p(90)<100", "p(99)<300"],
  },
}

export default function () {
  const endpoint = "http://api.localhost:3000/trpc/edge/customers.reportUsage"

  const payload = {
    customerId: "cus_UR25SSERij9HFMoU",
    featureSlug: "apikeys",
    usage: Math.floor(Math.random() * max),
    requestId: "123",
  }

  encodeURIComponent(JSON.stringify({ 0: { json: {} } }))

  const res = http.post(
    "http://api.unkey.dev/v1/keys.verifyKey",
    JSON.stringify({
      key: "3ZfxveorjGyvr2Hjh6ZiN1HY",
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
  check(res, {
    "is status 200": (r) => r.status === 200,
  })
}

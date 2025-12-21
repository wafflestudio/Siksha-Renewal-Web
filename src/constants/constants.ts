export default function APIendpoint() {
  if (process.env.NEXT_PUBLIC_NODE_ENV === "production") {
    return `https://siksha-server-dev.wafflestudio.com`;
  }
  return `https://siksha-server-dev.wafflestudio.com`;
}

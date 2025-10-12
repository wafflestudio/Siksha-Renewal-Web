export default function APIendpoint() {
  if (process.env.NEXT_PUBLIC_NODE_ENV === "production") {
    return `https://siksha-api.wafflestudio.com`;
  }
  // Use Spring server for development to enable liked-menu testing with authentication
  return `https://siksha-server-dev.wafflestudio.com`;
}

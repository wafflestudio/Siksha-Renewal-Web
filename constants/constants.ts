export default function APIendpoint() {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") {
    return `https://siksha-api.wafflestudio.com`;
  }
  return `https://siksha-api-dev.wafflestudio.com`;
}

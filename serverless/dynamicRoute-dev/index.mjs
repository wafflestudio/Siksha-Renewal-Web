import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

/**
 * HTTP 요청을 분석하여 Dynamic Route일 경우 S3에서 직접 HTML을 찾아서 반환합니다.
 *
 * @param {Object} event - route 경로로 들어오는 http 요청을 담은 이벤트 객체.
 * @returns {Object} - The response object containing the status, headers, and body.
 */
export async function handler(event) {
  const request = event.Records[0].cf.request;
  const uri = request.uri;
  console.log(request);
  console.log(uri);

  //check dynamic route
  const redirectPathPattern = [
    "menu\\/\\d+",
    "menu\\/\\d+\\/photos",
    "community\\/boards\\/[1-5]",
    "community\\/boards\\/[1-5]\\/posts\\/\\d+",
  ].join("|");
  const redirectPath = new RegExp(`^\\/(${redirectPathPattern})\\/?$`, "g");

  if (!uri.match(redirectPath)) return request;

  //find html file in s3 bucket
  const client = new S3Client({ region: "ap-northeast-2" });
  const bucketName = "siksha-dev.wafflestudio.com";
  let s3Key = "";

  const menuMatch = uri.match(/^\/menu\/(\d+)(\/photos)?\/?$/);
  const communityBoardsMatch = uri.match(/^\/community\/boards\/(\d+)(\/posts\/(\d+))?\/?$/);

  if (menuMatch) {
    const photosPart = menuMatch[2] ? "/photos" : "";
    s3Key = `menu/[menuId]${photosPart}/index.html`;
  } else if (communityBoardsMatch) {
    const postId = communityBoardsMatch[3];
    if (postId) {
      s3Key = `community/boards/[boardId]/posts/[postId]/index.html`;
    } else {
      s3Key = `community/boards/[boardId]/index.html`;
    }
  }

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: s3Key,
  });

  try {
    const s3Response = await client.send(command);
    console.log(s3Response);

    const resultHtml = await s3Response.Body.transformToString("utf-8");

    return {
      status: "200",
      statusDescription: "OK",
      headers: {
        "content-type": [{ key: "Content-Type", value: "text/html" }],
      },
      body: resultHtml,
    };
  } catch (error) {
    console.error(`Error fetching ${s3Key} from S3:`, error);

    return {
      status: "404",
      statusDescription: "Not Found",
      headers: {
        "content-type": [{ key: "Content-Type", value: "text/html" }],
      },
      body: "404 Not Found",
    };
  }
}

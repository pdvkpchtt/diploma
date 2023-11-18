import { verify } from "../../../../server/actions/hr/verify";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  //тут сервер экшн на verify и запись в бд
  const isVerified = await verify(token);

  return Response.redirect(`${process.env.NEXTAUTH_URL}/profile`, 302);
}

import Candidates from "../../components/hrs/Candidates";
import { getServSession } from "../api/auth/[...nextauth]/route";

const page = async ({ params: { category } }) => {
  const session = await getServSession();

  return <Candidates session={session} />;
};

export default page;

import Jobs from "../../components/jobs/Jobs";
import { getServSession } from "../../app/api/auth/[...nextauth]/route";

const page = async ({ params: { category } }) => {
  const session = await getServSession();

  return <Jobs session={session} />;
};

export default page;

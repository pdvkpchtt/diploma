import { getServSession } from "../api/auth/[...nextauth]/route";
import { getProfile } from "../../server/actions/profile/getProfile";
import Profile from "../../components/Profile/Profile";

const ProfilePage = async () => {
  const session = await getServSession();

  const data = await getProfile({
    userId: session.user.id,
  });
  console.log(data, "profile");

  return <Profile data={data} userId={session.user.id} />;
};

export default ProfilePage;

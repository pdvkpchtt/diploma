import EditProfile from "../../../components/ProfileEdit/EditProfile";
import { getServSession } from "../../api/auth/[...nextauth]/route";
import { getProfile } from "../../../server/actions/profile/getProfile";
import { getAllSkills } from "../../../server/actions/data/getAllSkills";
import { getAllAreas } from "../../../server/actions/data/getAllAreas";
import { getEducationLevel } from "../../../server/actions/data/getEducationLevel";
import { updateProfile } from "../../../server/actions/profile/updateProfile";

const EditPage = async () => {
  const session = await getServSession();

  const data = await getProfile({
    userId: session.user.id,
  });
  const skills = await getAllSkills();
  const areas = await getAllAreas();
  const educationLevelData = await getEducationLevel();

  console.log("server profile", data);
  console.log("server skills", skills);
  console.log("server areas", areas);
  console.log("server edlv", educationLevelData);

  async function updateProfileData(data) {
    "use server";
    const session = await getServSession();
    console.log("edit data", data);
    const res = await updateProfile({ userId: session.user.id, data: data });

    return res;
  }

  return (
    <EditProfile
      updateProfileData={updateProfileData}
      data={data}
      dataToCompare={data}
      skills={skills}
      areas={areas}
      educationLevelData={educationLevelData}
    />
  );
};

export default EditPage;

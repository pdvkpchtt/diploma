import CreateCall from "@/components/call/CreateCall";
import { getUsersForCall } from "@/server/actions/call/getUsersForCall";

const CallPage = async () => {
  const users = await getUsersForCall();

  return <CreateCall users={users} />;
};

export default CallPage;

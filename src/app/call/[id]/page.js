import Call from "@/components/call/Call";

const CallIdPage = ({ params: { id } }) => {
  return <Call roomID={id} />;
};

export default CallIdPage;

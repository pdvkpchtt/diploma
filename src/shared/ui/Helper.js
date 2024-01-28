import * as HoverCard from "@radix-ui/react-hover-card";

const Helper = ({ children, styled = "", text = "empty", shown = true }) => {
  if (shown === false) return <>{children}</>;
  return (
    <HoverCard.Root openDelay={250}>
      <HoverCard.Trigger asChild>
        <div className={styled}>{children}</div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-fit rounded-[12px] bg-[#141414] bg-opacity-[50%] px-[12px] py-[6px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
          sideOffset={5}
        >
          <p className={"text-[12px] font-medium text-white"}>{text}</p>

          <HoverCard.Arrow className="fill-[rgba(20,20,20)] opacity-[50%]" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

export default Helper;

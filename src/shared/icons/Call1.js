const Call1 = ({ onClick = () => {} }) => {
  return (
    <div className="cursor-pointer transition duration-[250ms] bg-[#2ea834] hover:bg-[#288f2d] active:bg-[#27852c] p-[5px] rounded-full w-fit">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        onClick={onClick}
      >
        <path
          fill="#fff"
          d="M19.95 21q-3.125 0-6.187-1.35T8.2 15.8q-2.5-2.5-3.85-5.55T3 4.05V3h5.9l.925 5.025l-2.85 2.875q.55.975 1.225 1.85t1.45 1.625q.725.725 1.588 1.388T13.1 17l2.9-2.9l5 1.025V21h-1.05Z"
        />
      </svg>
    </div>
  );
};

export default Call1;

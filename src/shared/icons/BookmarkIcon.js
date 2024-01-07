import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { addToBookmarks } from "../../server/actions/bookmarks/addToBookmarks";
import { removeBookmark } from "../../server/actions/bookmarks/removeBookmark";

const BookmarkIcon = ({ fill = "#5875e8", item, userId }) => {
  const isMobile = useMediaQuery({ query: "(pointer:coarse)" });

  const [state, setstate] = useState(
    !!item?.Bookmarks?.find(
      (i) => i.userId === userId && i.vacancyId === item.id
    )
  );

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={`cursor-pointer transition min-w-[24px] min-h-[24px] duration-[250ms] ${
        state ? "fill-[#5875e8]" : "fill-transparent"
      }`}
      xmlns="http://www.w3.org/2000/svg"
      onClick={async () => {
        const check = await addToBookmarks(item.id);

        if (check !== 0) {
          toast(`⭐️ Добавлено в избранное`, {
            position: isMobile ? "top-center" : "bottom-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            // theme: "dark",
            progressStyle: { background: "#5875e8" },
            containerId: "forCopy",
          });
          setstate(true);
        }
        if (check === 0) {
          await removeBookmark(item.id);
          toast(`🗑 Убрано из избранного`, {
            position: isMobile ? "top-center" : "bottom-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            // theme: "dark",
            progressStyle: { background: "#5875e8" },
            containerId: "forCopy",
          });
          setstate(false);
        }
      }}
    >
      <path
        d="M17 4H7C6.73478 4 6.48043 4.10536 6.29289 4.29289C6.10536 4.48043 6 4.73478 6 5V20.131C5.99997 20.312 6.0491 20.4897 6.14213 20.645C6.23516 20.8003 6.36861 20.9275 6.52823 21.0129C6.68786 21.0983 6.86769 21.1388 7.04852 21.13C7.22935 21.1212 7.4044 21.0635 7.555 20.963L11.445 18.37C11.6093 18.2604 11.8025 18.2019 12 18.2019C12.1975 18.2019 12.3907 18.2604 12.555 18.37L16.445 20.963C16.5956 21.0635 16.7707 21.1212 16.9515 21.13C17.1323 21.1388 17.3121 21.0983 17.4718 21.0129C17.6314 20.9275 17.7648 20.8003 17.8579 20.645C17.9509 20.4897 18 20.312 18 20.131V5C18 4.73478 17.8946 4.48043 17.7071 4.29289C17.5196 4.10536 17.2652 4 17 4Z"
        stroke={fill}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BookmarkIcon;

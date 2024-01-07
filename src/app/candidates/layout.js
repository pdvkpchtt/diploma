import FiltersWrap from "../../components/candidates/FiltersWrap";

import SearchNav from "../../components/candidates/SearchNav";
import SearchNavContextWrap from "../../components/candidates/SearchNavContext";

const SearchLayout = ({ children }) => {
  return (
    <div className="flex flex-row [@media(hover)]:mt-[62px] gap-[16px] w-full h-full">
      <SearchNavContextWrap>
        <div className={`max-w-[704px] w-full h-full`}>
          <SearchNav />
          {children}
        </div>
        <FiltersWrap />
      </SearchNavContextWrap>
    </div>
  );
};

export default SearchLayout;

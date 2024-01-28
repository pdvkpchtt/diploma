import FiltersWrap from "@/components/tests/FiltersWrap";
import SearchNavContextWrap from "@/components/tests/SearchNavContextWrap";

const SearchLayout = ({ children }) => {
  return (
    <div className="flex flex-row [@media(hover)]:mt-[62px] gap-[16px] w-full h-full">
      <SearchNavContextWrap>
        <div className={`max-w-[704px] w-full h-full`}>{children}</div>
        <FiltersWrap />
      </SearchNavContextWrap>
    </div>
  );
};

export default SearchLayout;

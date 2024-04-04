import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Input } from "~/components/ui/input";
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { useFetcher } from "~/hooks/fetcher";
import Link from 'next/link';

const SearchBox = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const router = useRouter();
  const { searchPosts } = useFetcher();
  const { data: results } = useSWR(searchValue ? `searchPosts/${encodeURIComponent(searchValue)}` : null, searchPosts);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Enter") {
      router.push(`/search/${encodeURIComponent(searchValue)}`);
      setSearchValue("");
    }
  };

  const handleLinkClick = () => {
    setSearchValue("");
  };

  return (
    <div className={"relative block md:min-w-[600px] dark:bg-secondary bg-white"}>
      <label>
        <span className={"sr-only"}>Search</span>
        <span className="absolute inset-y-0 left-2 flex items-center pl-2">
          <FaSearch />
        </span>
        <Input
          className={
            "place-self-center border-[#a37f2a] dark:bg-[#2E2B24] text-[#CBD5E1] focus-visible:ring-offset-0 ring-offset-0 rounded-[20px] px-12 placeholder:italic"
          }
          placeholder={"Search posts"}
          onChange={handleChange}
          onKeyUp={handleSearch}
          value={searchValue}
        />
      </label>
      {results && (
        <div className="absolute z-10 dark:bg-secondary dark:text-[#d8dce0] bg-white w-full rounded-md shadow-lg max-h-60 overflow-auto">
          {results.map((post: any) => (
            <Link
              key={post.id}
              href={`/post/${post.id}`}
              className="block px-4 py-2 dark:text-[#d8dce0] hover:bg-yellow-500 dark:hover:text-gray-900"
              onClick={handleLinkClick}
            >
              {post.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBox;

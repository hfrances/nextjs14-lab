'use client';

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from './MagnifyGlassIcon';
import { useDebouncedCallback } from "use-debounce";

type SearchProps = Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, keyof Pick<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'>> & {
  /**
   * Name of the search param in the bar.
   */
  searchParam: string;
  /**
   * The number of milliseconds to delay.
   */
  waitDelay?: number;
}

/**
 * @requires use-debounce
 */
const Search = ({ searchParam, waitDelay = 300, className, ...props }: SearchProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback( (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set(searchParam, term);
    }
    else {
      params.delete(searchParam);
    }
    replace(`${pathname}?${params.toString()}`);
  }, waitDelay)

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        {...props}
        className={"peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500" + className}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get(searchParam)?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  )
}

export { Search }
export default Search; 
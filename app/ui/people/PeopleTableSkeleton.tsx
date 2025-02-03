import PersonCardSkeleton from "./PersonCardSkeleton";

/**
 * Un React Component que representa un Skeleton de `PeopleTable`.
 * 
 * Se renderiza en el lado del **servidor**.
 */
const PeopleTableSkeleton = async () => {

  return (
    <>
      <PersonCardSkeleton/>
      <PersonCardSkeleton/>
      <PersonCardSkeleton/>
    </>
  )
}

export { PeopleTableSkeleton };
export default PeopleTableSkeleton;
// import Skeleton from "react-loading-skeleton";
import Skeleton from "react-loading-skeleton";
import "../assets/styles/skeleton.css";

interface SkeletonProps {
  count?: number;
  width?: number | string;
  height?: number | string;
  circle?: boolean;
  className?: string;
}

export const SkeletonCustom: React.FC<SkeletonProps> = ({
  count = 6,
  // width = "100%",
  // height = "20px",
  // circle = false,
  // className = "",
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-6 place-items-center">
      {[...Array(count)].map((_, index) => (
        <div key={index} className="max-w-[270px] w-full">
          <Skeleton height={335} className="rounded-md" />
          <Skeleton width="60%" height={20} className="rounded-md" />
          <Skeleton width="40%" height={20} className="rounded-md" />
        </div>
      ))}
    </div>
  );
};

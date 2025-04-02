import Skeleton from "react-loading-skeleton";
import '../assets/styles/skeleton.css';

export const SkeletonCustom = () => {
    return (
        <div className="skeleton">
            <div className="left-col">
                <Skeleton circle width={40} height={40} />
            </div>
            <div className="right-col">
                <Skeleton count={4} />
            </div>
        </div>
    )
}
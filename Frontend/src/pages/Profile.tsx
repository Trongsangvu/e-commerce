import { useQuery } from "@tanstack/react-query";
// import { useSelector } from "react-redux";
// import { RootStore } from "../redux/store"
import { getProfileUser } from "../services/auth/authService";
import images from "../assets/images/images";

const Profile: React.FC = () => {
    // const getProfile = useSelector((state: RootStore) => )
    
    // Query data
    const { data, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: getProfileUser,
        retry: 1,
    });

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error to get profile user: {error.message}</p>

    console.log('Full data:', data);
    const userProfile = data?.user;

    return ( 
        <div>
            <div className="mt-70">
                <div>
                    <img src={images.profileBanner} alt="profile" />
                </div>
                <div className="bg-red-500 flex justify-center">
                    <span>Name: {userProfile?.name}</span>
                </div>
            </div>
        </div>
     );
}

export default Profile;
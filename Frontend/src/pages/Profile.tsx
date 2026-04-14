import { useQuery } from "@tanstack/react-query";
import images from "../assets/images/images";
import { Footer } from "../components/navigation/Footer";
import { getProfileUser } from "../services/auth-service";
// import { useGoogleLogin } from "../features/home/hooks/useGoogleLogin";

const Profile: React.FC = () => {
  // const { userName } = useGoogleLogin();

  // Query data
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getProfileUser,
    retry: 1,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error to get profile user: {error.message}</p>;

  const userProfile = data?.user;

  return (
    <div>
      <div className="">
        <div className="relative">
          <div className="">
            <img src={images.profileBanner} alt="profile" />
          </div>
          <div className="flex justify-center absolute top-[70%] left-[30%]">
            <span className="uppercase font-[GucciSansPro-medium] text-5xl text-white">
              welcome {userProfile?.name}
            </span>
          </div>
        </div>
        <div className="pt-70">
          <div className="flex justify-around">
            <div className="flex flex-col items-center pb-200">
              <div className="max-w-252 mb-20 cursor-pointer">
                <img
                  className="rounded-252"
                  src={images.recommendation}
                  alt="recommendation"
                />
              </div>
              <div className="flex flex-col items-center pb-20">
                <div className="mb-20 w-fit">
                  <span className="uppercase font-[GucciSansPro-medium]">
                    recommendations
                  </span>
                  <div className="border border-[#333]"></div>
                </div>
                <p className="font-[GucciSansPro-book]">
                  Specially selected items you may also like
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center pb-200">
              <div className="max-w-252 mb-20 cursor-pointer">
                <img
                  className="rounded-252"
                  src={images.recommendation1}
                  alt="recommendation"
                />
              </div>
              <div className="flex flex-col items-center pb-20">
                <div className="mb-20 w-fit">
                  <span className="uppercase font-[GucciSansPro-medium]">
                    save items
                  </span>
                  <div className="border border-[#333]"></div>
                </div>
                <p className="font-[GucciSansPro-book]">
                  All your favorite pieces in one beautiful place
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-20 px-30 justify-around pb-50">
          <div className="flex flex-col items-center">
            <div className="w-fit mb-20">
              <span className="font-[GucciSansPro-medium] cursor-pointer text-[#333]">
                My Orders
              </span>
              <div className="border border-[#333]"></div>
            </div>
            <p className="font-[GucciSansPro-book] text-sm">
              Manage and edit your orders.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-fit mb-20">
              <span className="font-[GucciSansPro-medium] cursor-pointer text-[#333]">
                Accounts Setting
              </span>
              <div className="border border-[#333]"></div>
            </div>
            <p className="font-[GucciSansPro-book] text-sm">
              Manage profile and preferences.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-fit mb-20">
              <span className="font-[GucciSansPro-medium] cursor-pointer text-[#333]">
                Address Book
              </span>
              <div className="border border-[#333]"></div>
            </div>
            <p className="font-[GucciSansPro-book] text-sm">
              Manage shipping & billing address.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-fit mb-20">
              <span className="font-[GucciSansPro-medium] cursor-pointer text-[#333]">
                Wallets
              </span>
              <div className="border border-[#333]"></div>
            </div>
            <p className="font-[GucciSansPro-book] text-sm">
              Manage your payment methods.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;

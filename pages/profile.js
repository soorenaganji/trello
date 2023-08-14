import UserProfile from "@/components/templates/UserProfile";
import { getSession } from "next-auth/react";
const Profile = () => {
    return (
        <>
        <UserProfile />
        </>
    );
}
export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
    if(!session) {
      return {
        redirect : {
          destination : "/login" ,
          permanent : false
        }
      }
    }else {
      return{
        props : {}
      }
      }
  }
  

export default Profile;
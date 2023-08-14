import AddTodo from "@/components/templates/AddTodo";
import { getSession } from "next-auth/react";
const Add = () => {
  return (
    <>
      <AddTodo />
    </>
  );
};

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


export default Add;

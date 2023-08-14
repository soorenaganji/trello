import HomePage from "@/components/templates/HomePage";
import { getSession } from "next-auth/react";

export default function Home() {
  return (
    <main className={`w-full`}>
      <HomePage />
    </main>
  );
}
export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    return {
      props: {},
    };
  }
}

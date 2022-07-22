import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import useUserStore from "../store/useUserStore";
import styles from "../styles/Home.module.css";

export default function Home() {
  const userStore = useUserStore((state) => state);

  return (
    <Layout>
      <>
        <Head>
          <title>My page title</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        {userStore.data ? (
          <div>Hello, {userStore.data?.name}</div>
        ) : (
          <div>Index page</div>
        )}
      </>
    </Layout>
  );
}

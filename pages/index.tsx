import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import { SignInOutTriger } from "../src/lib/SignInOutTriger";
const Home: NextPage = () => {
  return (
    <Layout title="Wavelet">
      <SignInOutTriger
        SignIn={<p>SignIn</p>}
        SignOut={<p>SignOut</p>}
        Loading={<p>Loading</p>}
      />
    </Layout>
  );
};

export default Home;

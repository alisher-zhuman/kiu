import { AboutUs } from "@/widgets/landing/ui/about-us";
import { Departments } from "@/widgets/landing/ui/departments";
import { Intro } from "@/widgets/landing/ui/intro";
import { Rector } from "@/widgets/landing/ui/rector";
import { Statistics } from "@/widgets/landing/ui/statistics";
import { Layout } from "@/widgets/layout";

const Home = () => (
  <Layout>
    <main>
      <Intro />
      <AboutUs />
      <Departments />
      <Statistics />
      <Rector />
    </main>
  </Layout>
);

export default Home;

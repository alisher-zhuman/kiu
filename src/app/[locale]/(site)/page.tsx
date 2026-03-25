import { AboutUs } from "@/widgets/landing/ui/about-us";
import { Departments } from "@/widgets/landing/ui/departments";
import { Intro } from "@/widgets/landing/ui/intro";
import { Rector } from "@/widgets/landing/ui/rector";
import { Statistics } from "@/widgets/landing/ui/statistics";

const Home = () => (
  <main>
    <Intro />
    <AboutUs />
    <Departments />
    <Statistics />
    <Rector />
  </main>
);

export default Home;

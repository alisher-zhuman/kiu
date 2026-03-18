import { AboutUs } from "@/widgets/landing/ui/about-us";
import { Departments } from "@/widgets/landing/ui/departments";
import { Intro } from "@/widgets/landing/ui/intro";
import { Statistics } from "@/widgets/landing/ui/statistics";
import { Header } from "@/widgets/layout/ui/header";
import { Navbar } from "@/widgets/layout/ui/navbar";

const Home = () => {
  return (
    <main>
      <Header />
      <Navbar />
      <Intro />
      <AboutUs />
      <Departments />
      <Statistics />
    </main>
  );
};

export default Home;

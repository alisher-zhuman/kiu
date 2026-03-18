import { AboutUs } from "@/widgets/landing/ui/about-us";
import { Intro } from "@/widgets/landing/ui/intro";
import { Header } from "@/widgets/layout/ui/header";
import { Navbar } from "@/widgets/layout/ui/navbar";

const Home = () => {
  return (
    <main>
      <Header />
      <Navbar />
      <Intro />
      <AboutUs />
    </main>
  );
};

export default Home;

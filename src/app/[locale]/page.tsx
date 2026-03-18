import { AboutUs } from "@/widgets/landing/ui/about-us";
import { Departments } from "@/widgets/landing/ui/departments";
import { Intro } from "@/widgets/landing/ui/intro";
import { Rector } from "@/widgets/landing/ui/rector";
import { Statistics } from "@/widgets/landing/ui/statistics";
import { Footer } from "@/widgets/layout/ui/footer";
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
      <Rector />
      <Footer />
    </main>
  );
};

export default Home;

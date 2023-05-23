import RandomProducts from "./RandomProducts";
import CategoryButtons from "./CategoryButtons";
import BigPictureSection from "./Home-BigPictureSection";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <CategoryButtons />
      <BigPictureSection />
      <RandomProducts />
      <Footer />
    </>
  );
};

export default Home;

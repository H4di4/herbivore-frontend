import React from 'react';
import Banner from '../components/banner';
import ScrollSection from '../components/ScrollSection';
import FeatureSection from '../components/FeatureSection';
import Bestsellers from '../components/Bestsellers';
import About from '../components/About';
import Press from '../components/Press';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <>
      <main className="pt-18">
        <Banner />

        <ScrollSection />
        <FeatureSection />
        <Bestsellers />
        <About />
        <Press />
        <Newsletter />
        <Footer />
      </main>


    </>
  );
};

export default HomePage;

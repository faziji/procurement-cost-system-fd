import React from 'react'; // import styles from './Welcome.less';

import WelcomeMain from '@/components/WelcomeMain';
import Footer from '@/components/Frame/Footer';
import Header from '@/components/Frame/Header';

const Welcome: React.FC = () => {
  return (
    <>
      <Header />

      <WelcomeMain />
      <Footer />

    </>
  );
};

export default Welcome;

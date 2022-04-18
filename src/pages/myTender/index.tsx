import Frame from '@/components/Frame';
import styles from './index.less';
import Workplace from './workplace';

const myTender: React.FC = (props: any) => {
  const data = props.location?.query;

  return (
    <>
      <Frame>
        <div className={styles.contentWrapper}>
          <Workplace />
        </div>
      </Frame>
    </>
  );
};

export default myTender;

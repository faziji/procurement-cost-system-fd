import Frame from '@/components/Frame';
import styles from './index.less';

const myTender: React.FC = (props: any) => {
  const data = props.location?.query;

  return (
    <>
      <Frame>
        <div className={styles.contentWrapper}>我的投标</div>
      </Frame>
    </>
  );
};

export default myTender;

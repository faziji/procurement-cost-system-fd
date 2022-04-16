import Frame from '@/components/Frame';
import styles from './index.less';

const myAttention: React.FC = (props: any) => {
  const data = props.location?.query;

  return (
    <>
      <Frame>
        <div className={styles.contentWrapper}>我的关注</div>
      </Frame>
    </>
  );
};

export default myAttention;

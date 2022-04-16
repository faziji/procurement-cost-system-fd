import Frame from '@/components/Frame';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import styles from './index.less';

import { qiNiuUrl } from '../../../config/qiniuyun';
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';
import { Button } from 'antd';

const GuideDetail: React.FC = (props: any) => {
  const data = props.location?.query;

  const onError = (e: any) => {
    console.log('显示错误');
  };

  return (
    <>
      <Frame>
        <div className={styles.contentWrapper}>
          <div className={styles.contentTitle}>
            <div className={styles.contentTitleText}>
              <h3>{data?.name}</h3>
            </div>
            <div className={styles.contentTitleDesc}>发布时间：{data?.createdAt}</div>
          </div>
          <a target="_blank" href={qiNiuUrl + 'Resources/' + data?.key}>
            <Button type="dashed" shape="round" icon={<DownloadOutlined />} />
            点击下载
          </a>
          {/* 会有一个bug，资源无法访问的时候会一直 */}
          {data?.key ? (
            <FileViewer
              fileType="docx"
              filePath={qiNiuUrl + 'Resources/' + data?.key}
              errorComponent={CustomErrorComponent}
              onError={onError}
            />
          ) : null}
        </div>
      </Frame>
    </>
  );
};

export default GuideDetail;

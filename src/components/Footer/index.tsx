import { useIntl } from 'umi';
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '信息学院软件工程1班诸祥发',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: '采购和费控管理后台',
          title: '采购和费控管理后台',
          href: 'https://pro.ant.design',
          blankTarget: true,
        },
        {
          key: 'github项目地址',
          title: <GithubOutlined />,
          href: 'https://github.com/faziji/procurement-cost-system',
          blankTarget: true,
        },
        {
          key: '供应商采购中心前台',
          title: '供应商采购中心前台',
          href: 'https://ant.design',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;

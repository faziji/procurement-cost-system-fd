# Ant Design Pro

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## 提交代码

`git commit --no-verify -m "XXX"`

项目中存在pre-commit(客户端)钩子，在提交前会自动进行风格检查。进入项目的.git文件夹(文件夹默认隐藏,可先设置显示或者命令ls查找),再进入hooks文件夹,删除pre-commit文件,重新git commit -m 'xxx' git push即可。问题已经解决！

## Environment Prepare

可运行的 node 版本：14.15.0

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).

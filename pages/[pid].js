import { Fragment } from 'react';
import path from 'path';
import fs from 'fs/promises';

function ProductDetailPage(props) {
  const { loadedproduct } = props;
  console.log(loadedproduct);

  return (
    <Fragment>
      <h1>{loadedproduct.title}</h1>
      <p>{loadedproduct.description}</p>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: 'p1' } },
      { params: { pid: 'p2' } },
      { params: { pid: 'p3' } },
    ],
    fallback: false,
  };
}

export default ProductDetailPage;

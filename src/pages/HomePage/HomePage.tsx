import React from "react"
import { Helmet } from "react-helmet";
import { ProductGroup, ProductGroupContainer} from "./styled";
import { PageWrapper } from "AppStyled";
import { dummyProducts } from "dummyProducts";
import ProductCard from "blocks/ProductCard";

 const HomePage: React.FC = () => {
  return <>
    <Helmet>
      <title>Главная - e-commerce</title>
    </Helmet>
    <PageWrapper>
      <h1>Главная</h1>
      <ProductGroup>
        <h2>Рекомендуемые товары</h2>

        <ProductGroupContainer>
          {dummyProducts.map((p) => (
            <ProductCard
              {...p}
              key={p.id}
              // isLiked={idsInFavorites.includes(p.id)}
            />
          ))}
        </ProductGroupContainer>
      </ProductGroup>
    </PageWrapper>
  </>
  
};

export default HomePage
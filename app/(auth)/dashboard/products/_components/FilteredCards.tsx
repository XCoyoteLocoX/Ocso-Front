import { Input } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/entities";
import ProductCard from "./ProductCard";


export default function FilteredCards ({products}: {products: Product[]}) {
    const [filtered, setFiltered] = useState<string>("");
    const [productsList, setProductsList] = useState<Product[]>(products);
    useEffect(() => {
        const filteredProducts = products.filter((product)=> {
            if (product.productName.toLocaleLowerCase().includes(filtered.toLocaleLowerCase())) {
                return true;
            } else return false;
        })
        setProductsList(filteredProducts)
    }, [filtered])
    return (
        <>
        <Input onChange={(e) => {
            setFiltered(e.target.value)
        }}
        label="Nombre del producto"
        />
            {productsList.map((product) => {
            return (
                <Link className="hover:scale-110 trnasition-transform"
                key={product.productId}
                href= {{pathname: `/dashboard/products/${product.productId}` }}
                >
                    <ProductCard product={product}/>
                </Link>
            )
        }).filter((product) => {
            
        })}
        </>
    )
}
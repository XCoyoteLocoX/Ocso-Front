import {Product} from "@/entities"
import { CardBody, CardHeader, Card, Divider } from "@heroui/react"

export default function ProductCard({ product }: { product:Product }) {
    return (
        <Card>
            <CardHeader>{product.productName}</CardHeader>
            <Divider/>
            <CardBody>
                <p>Nombre del producto: <b>{product.productName}</b></p>
                <p>Precio del producto: <b>{product.price}</b></p>
            </CardBody>
        </Card>
    )
}
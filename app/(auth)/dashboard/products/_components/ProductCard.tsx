import { Product } from "@/entities";
import { CardBody, CardHeader, Card, Divider } from "@heroui/react";
import Link from "next/link"; // 🔧 Faltaba importar Link

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="p-4 shadow-md hover:shadow-lg transition-all">
      <CardHeader className="text-lg font-semibold">
        {product.productName}
      </CardHeader>

      <Divider />

      <CardBody className="text-sm space-y-2">
        <p>
          Nombre del producto: <b>{product.productName}</b>
        </p>
        <p>
          Precio del producto: <b>${product.price}</b>
        </p>
        <p>
          Proveedor:{" "}
          <Link
            className="font-bold text-orange-600 hover:underline"
            href={`/dashboard/providers/${product.provider.providerId}`}
          >
            {product.provider.providerName}
          </Link>
        </p>
      </CardBody>
    </Card>
  );
}

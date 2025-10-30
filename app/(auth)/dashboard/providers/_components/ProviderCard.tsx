import { Card, CardHeader, CardBody, Divider } from "@heroui/react";
import { Provider } from "@/entities"; // ✅ importar desde tus entidades

export default function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <Card className="max-w-md bg-orange-100 shadow-lg rounded-lg">
      <CardHeader className="font-bold text-lg text-orange-700">
        {provider.providerName}
      </CardHeader>
      <Divider />
      <CardBody className="text-gray-700">
        <p>
          Correo electrónico:{" "}
          <b className="text-black">{provider.providerEmail}</b>
        </p>
        <p>
          Número de teléfono:{" "}
          <b className="text-black">{provider.providerPhoneNumber}</b>
        </p>
        {provider?.products?.length !== 0 ? (
          <p>
            Tiene <b>{provider?.products?.length}</b> productos {provider.products.length > 1 ? "s": ""}
          </p>
        ) : (
          <p>No tiene productos</p>
        )}
      </CardBody>
    </Card>
  );
}

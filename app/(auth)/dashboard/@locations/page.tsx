import axios from "axios";
import { API_URL } from "@/constants";
import { Location } from "@/entities";
import SelectLocation from "./_components/SelectLocation";
import LocationCard from "./_components/LocationCard";
import FormNewLocation from "./_components/FormNewLocation";
import DeleteLocationButton from "./_components/DeleteLocationButton"; 
import { authHeaders } from "@/helpers/authHeaders";

const LocationPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { data } = await axios.get<Location[]>(`${API_URL}/locations`, {
    headers: {
      ...(await authHeaders()),
    },
  });

  const locations = [
    {
      locationId: 0,
      locationName: "Ninguna",
      locationLatLng: [0, 0],
      locationAddress: "No existe",
    },
    ...data,
  ];

  return (
    <div className="w-2/12">
      <div className="w-full flex flex-col items-center h-[90vh] bg-red-50">
        <div className="w-1/2 my-10">
          <SelectLocation locations={locations} store={searchParams?.store} />
        </div>

        <div className="w-8/12">
          <LocationCard store={searchParams.store} />
        </div>

        <div className="w-6/12">
          <FormNewLocation store={searchParams.store} />
        </div>
        <DeleteLocationButton store={searchParams.store}/>
      </div>
    </div>
  );
};

export default LocationPage;

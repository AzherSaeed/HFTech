import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CustomDetailInput from "../../Components/CustomDetailInput";
import Loader from "../../Components/Loader/Loader";
import { API_URL, GET_SPACE_BY_ID } from "../../Services/config";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { LocationDetailPageContainer } from "./StyleEstimates";

const LocationDetailPage = () => {
  const { locationsId } = useParams();
  const regex = /^\d*(\.\d+)?$/;

  const {
    data: userData,
    isFetching,
    isLoading,
  } = useQuery(
    "get-location-By-Id",
    () => {
      return axios.get(
        API_URL + GET_SPACE_BY_ID,
        { params: { spaceId: locationsId } },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    },
    {
      enabled: regex.test(locationsId),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
    }
  );

  console.log(userData , 'userData');

  return (
    <Sidebar>
      <LocationDetailPageContainer>
        {isFetching && isLoading ? (
          <Loader />
        ) : (
          <div>
            <CustomDetailInput
              label={userData?.data.result.name}
              value="Space Name"
            />
            <CustomDetailInput
              label={userData?.data.result.countryName}
              value="Country"
            />
            <CustomDetailInput
              label={userData?.data.result.stateName}
              value="State"
            />
            <CustomDetailInput
              label={userData?.data.result.cityName}
              value="City"
            />
            <CustomDetailInput
              label={userData?.data.result.address}
              value="Address"
            />
            <CustomDetailInput
              label={userData?.data.result.dtoUser.userName}
              value="Location Owner"
            />
            <CustomDetailInput
              label={userData?.data.result.insertedDate}
              value="Created"
            />
          </div>
        )}
      </LocationDetailPageContainer>
    </Sidebar>
  );
};

export default LocationDetailPage;

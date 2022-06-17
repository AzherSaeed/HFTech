import React from "react";
import { ContactDetailPageContainer } from "./StyleEstimates";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CustomDetailInput from "../../Components/CustomDetailInput";
import Loader from "../../Components/Loader/Loader";
import { API_URL, CONTACT_GET_BY_ID } from "../../Services/config";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import moment from "moment";

const ContactDetailPage = () => {
  const { contactId } = useParams();
  const regex = /^\d*(\.\d+)?$/;

  const {
    data: userData,
    isFetching,
    isLoading,
  } = useQuery(
    "get-User-By-Id",
    () => {
      return axios.get(
        API_URL + CONTACT_GET_BY_ID,
        { params: { contactId: contactId } },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    },
    {
      enabled: regex.test(contactId),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
    }
  );

  return (
    <Sidebar>
      <ContactDetailPageContainer>
        {isFetching && isLoading ? (
          <Loader />
        ) : (
          <div>
            <CustomDetailInput
              label={userData?.data.result.name}
              value="Full Name"
            />
            <CustomDetailInput
              label={userData?.data.result.phone}
              value="Phone Number"
            />
            <CustomDetailInput
              label={userData?.data.result.email}
              value="Email Address"
            />
            <CustomDetailInput
              label={userData?.data.result.dtoUser.userName}
              value="Owner"
            />
            <CustomDetailInput
              label={userData?.data.result.insertedDate}
              value="Created"
            />
          </div>
        )}
      </ContactDetailPageContainer>
    </Sidebar>
  );
};

export default ContactDetailPage;

import React from "react";
import { ClientDetailPageContainer } from "./StyleEstimates";
import Sidebar from "../../Components/Sidebar/Sidebar";
import CustomDetailInput from "../../Components/CustomDetailInput";
import Loader from "../../Components/Loader/Loader";
import {
  API_URL,
  GET_CLIENT_DETAIL,
  GET_CONTACT,
  GET_SPACE_DETAIL,
} from "../../Services/config";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { Tabs, Checkbox } from "antd";

const ClientDetailPage = () => {
  const { clientId } = useParams();
  const { TabPane } = Tabs;
  const regex = /^\d*(\.\d+)?$/;

  const {
    data: userData,
    isFetching,
    isLoading,
  } = useQuery(
    "get-User-By-Id",
    () => {
      return axios.get(
        API_URL + GET_CLIENT_DETAIL,
        { params: { clientId: clientId } },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    },
    {
      enabled: regex.test(clientId),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
    }
  );

  const spaceApi = axios.get(API_URL + GET_SPACE_DETAIL);
  const contactApi = axios.get(API_URL + GET_CONTACT);

  const { data: locationData } = useQuery(
    "get-location-By-Id",
    () => {
      return axios.all([spaceApi, contactApi], {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    },
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
    }
  );

  return (
    <Sidebar>
      <ClientDetailPageContainer>
        {isFetching && isLoading ? (
          <Loader />
        ) : (
          <div className="client-detail-content">
            <div className="client-detail-content-form">
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
                    label={userData?.data.result.insertedDate.substring(0,10)}
                value="Created"
              />
            </div>
            <div className="client-detail-content-table">
              <Tabs defaultActiveKey="1"  size="large">
                <TabPane tab="Locations"  key="1">
                  <Checkbox.Group defaultValue={[3]}>
                    {locationData &&
                      locationData[0]?.data.result?.map((data, i) => (
                        <div key={i} className="details mt-2">
                          {/* <Checkbox value={{ id: data.id }} name="spaceIds"> */}
                            <div className="details-checkbox">
                              <div className="details-list py-2">
                                <span className="details-list-name">Name:</span>
                                {data.name}
                              </div>
                              <div className="details-list py-2">
                                <span className="details-list-name">
                                  Owner:
                                </span>
                                {data.dtoUser.userName}
                              </div>
                            </div>
                          {/* </Checkbox> */}
                        </div>
                      ))}
                  </Checkbox.Group>
                </TabPane>
                <TabPane tab="Contacts" key="2">
                  <Checkbox.Group>
                    {locationData &&
                      locationData[1]?.data.result?.map((data, i) => (
                        <div key={i} className="details mt-2">
                          {/* <Checkbox value={{ id: data.id }} name="contactIds"> */}
                            <div className="details-checkbox ">
                              <div className="details-list py-2">
                                <span className="details-list-name">Name:</span>
                                <span>{data.name}</span>
                              </div>
                              <div className="details-list py-2">
                                <span className="details-list-name">
                                  Owner:
                                </span>
                                <span>{data.dtoUser.userName}</span>
                              </div>
                            </div>
                          {/* </Checkbox> */}
                        </div>
                      ))}
                  </Checkbox.Group>
                </TabPane>
              </Tabs>
            </div>
          </div>
        )}
      </ClientDetailPageContainer>
    </Sidebar>
  );
};

export default ClientDetailPage;

import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { UnitOfMeasurementContainer } from "./styles";
import FormControl from "../../Components/FormControl";
import * as Yup from "yup";
import { Form, Input, Modal } from "antd";
import { toast } from "react-toastify";
import { Formik } from "formik";
import CustomButton from "../../Components/CustomButton/Index";
import {
  UNITOFMEASUREMENT_SAVE,
  API_URL,
  UNITOFMEASUREMENT_GET,
  UNITOFMEASUREMENT_UPDATE,
  UNITOFMEASUREMENT_DELETE,
} from "../../Services/config";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
import deleteIcon from "../../Assets/icons/ic_delete.svg";
import editIcon from "../../Assets/icons/ic_edit.svg";
import DeleteModal from "../../Components/Delete/Index";
import SuccessfulDeleteModal from "../../Components/Delete/SuccessfullModal";

const initialValues = {
  name: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Role is required!"),
});
const Index = () => {
  const [unitDetailHandler, setunitDetailHandler] = useState(null);
  const [unitDeleteDetailHandler, setunitDeleteDetailHandler] = useState(null);
  const [unitUpdateInputHandler, setunitUpdateInputHandler] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [successDeleteModal, setsuccessDeleteModal] = useState(false);

  const { data, isLoading, refetch } = useQuery(
    "units",
    () => {
      return axios.get(API_URL + UNITOFMEASUREMENT_GET, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
      refetchInterval: false,
      refetchOnWindowFocus: true,
    }
  );

  const mutation = useMutation(
    (unitDetail) => {
      console.log(unitDetail, "unitDetail");
      if (unitDetailHandler?.id && !unitDeleteDetailHandler) {
        return axios.put(API_URL + UNITOFMEASUREMENT_UPDATE, unitDetail, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      } else if (unitDeleteDetailHandler?.id && !unitDetailHandler) {
        return axios.delete(
          API_URL + UNITOFMEASUREMENT_DELETE,
          { params: { unitId: unitDeleteDetailHandler.id } },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      } else if (!unitDetailHandler && !unitDeleteDetailHandler) {
        return axios.post(API_URL + UNITOFMEASUREMENT_SAVE, unitDetail, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
      }
    },
    {
      onSuccess: (response) => {
        if (response.data?.code !== 201) {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          setunitDetailHandler(null);
          console.log(response.data, "response.data.messag");
          if (response.data.status !== "CREATED") {
            setsuccessDeleteModal(true);
          }
        }
        refetch();
      },

      onError: (err, variables, snapshotValue) => {
        toast.error("Please provide valid detail", {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
    }
  );

  const onSubmit = (value) => {
    mutation.mutate(value);
  };

  const unitEditHandler = (detail) => {
    setunitDetailHandler(detail);
  };
  const unitUpdateHandler = () => {
    const updatedData = {
      id: unitDetailHandler.id,
      name: unitUpdateInputHandler,
    };
    mutation.mutate(updatedData);
  };

  const unitDeleteHandler = (detail) => {
    setunitDetailHandler(null);
    setunitDeleteDetailHandler(detail);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setsuccessDeleteModal(false);
  };
  const handleIndividualDelete = () => {
    mutation.mutate(unitDeleteDetailHandler.id);
  };

  return (
    <Sidebar>
      <UnitOfMeasurementContainer>
        {isLoading && <Loader />}
        <div className="unitOfMeasurementHeader">
          <p>Unit Of Measurement</p>
        </div>
        <div className="unitOfMeasurementContent">
          <div className="unitOfMeasurementContent-detail">
            <div className="unitOfMeasurementContent-detail-children">
              {!isLoading &&
                data.data.result.map((unit) => {
                  return (
                    <div className="unitOfMeasurementContent-detail-children-input">
                      <Input.Group
                        compact
                        className="unitOfMeasurementContent-detail-children-input-group"
                      >
                        <div className="unitOfMeasurementContent-detail-children-input-group-div">
                          <label>Unit Name</label>
                          <Input
                            style={{ width: "100%" }}
                            defaultValue={unit.name}
                            disabled={unitDetailHandler?.id !== unit.id}
                            onChange={(e) =>
                              setunitUpdateInputHandler(e.target.value)
                            }
                          />
                        </div>

                        {unitDetailHandler?.id == unit.id ? (
                          <div style={{ marginTop: "25px" }}>
                            <CustomButton
                              bgcolor="#156985"
                              color="white"
                              padding="3px 0px"
                              width="70px"
                              type="submit"
                              title="Update"
                              clicked={() => unitUpdateHandler(unit)}
                            />
                          </div>
                        ) : null}
                      </Input.Group>

                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginTop: "17px",
                        }}
                      >
                        <img
                          src={deleteIcon}
                          alt="delete Icon"
                          className="action_icons deleteicon"
                          style={{ cursor: "pointer" }}
                          onClick={() => unitDeleteHandler(unit)}
                        />
                        <img
                          src={editIcon}
                          alt="edit Icon"
                          className="action_icons editicon"
                          style={{ cursor: "pointer" }}
                          onClick={() => unitEditHandler(unit)}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="unitOfMeasurementContent-form">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <Form
                    name="basic"
                    onFinish={formik.handleSubmit}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    validateMessages={validationSchema}
                  >
                    <div className="unitOfMeasurementContent-form-input">
                      <FormControl
                        control="input"
                        type="text"
                        name="name"
                        placeholder="Role"
                        label="Create New"
                        className={
                          formik.errors.name && formik.touched.name
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </div>
                    <CustomButton
                      bgcolor="#156985"
                      color="white"
                      padding="5px 8px"
                      width="100%"
                      type="submit"
                      title="Save"
                      disabled={unitDetailHandler}
                    />
                  </Form>
                );
              }}
            </Formik>
          </div>
          <Modal
            visible={isModalVisible}
            footer={null}
            onCancel={handleCancel}
            centered={true}
          >
            <DeleteModal
              handleCancel={handleCancel}
              userDetail={unitDeleteDetailHandler}
              deleteUser={handleIndividualDelete}
            />
          </Modal>
          <Modal
            visible={successDeleteModal}
            footer={null}
            onCancel={handleCancel}
            centered={true}
          >
            <SuccessfulDeleteModal
              handleCancel={handleCancel}
              userDetail={unitDeleteDetailHandler}
              deleteUser={handleIndividualDelete}
            />
          </Modal>
        </div>
      </UnitOfMeasurementContainer>
    </Sidebar>
  );
};

export default Index;

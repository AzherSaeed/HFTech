import React from "react";
import CustomButton from "../CustomButton/Index";
import { MobileCardContainer } from "./style";
import { Link, useNavigate } from "react-router-dom";
import { BasicColor, PrimaryColor } from "../GlobalStyle";
import deleteIcon from "../../Assets/icons/ic_delete.svg";
import editIcon from "../../Assets/icons/ic_edit.svg";
import addIcon from '../../Assets/ic_add_new.svg';
const Index = ({ data, deleteHandler, editHandler }) => {
  const navigate=useNavigate();

  console.log(data, 'data in mobile Cards');
  return (
    <MobileCardContainer>
      <div className=" plus-icon d-md-none">
      <img src={addIcon} onClick={()=>navigate("/lineItem/createLineItem")} alt="add-icon" />
      </div>
      <div>
      {data?.map((content, i) => {
        return (
            <div key={i} className="mobile-card-content">
              <div className="mobile-card-content-row">

                <Link className="id hf-link" to="#">
                  {content.id}
                </Link>
                <div className="d-flex justify-content-end">
                  <div style={{ display: "flex", gap: "7px" }}>
                    <img
                      src={deleteIcon}
                      alt="delete Icon"
                      className="action_icons deleteicon"
                      onClick={() => {
                        deleteHandler(content)
                      }}
                      style={{ cursor: "pointer" }}
                    />

                    <img
                      src={editIcon}
                      alt="edit Icon"
                      className="action_icons editicon"
                      onClick={() => {
                        editHandler(content)
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </div>

                </div>
              </div>
              <div className="mobile-card-content-row">
                <Link className="hf-link" to="#">
                  {content.name}
                </Link>
                {/* <Link className="hf-link" to="#">
                  {content.address || content.email}
                </Link> */}
                <Link className="hf-link d-flex justify-content-end" to="#">
                  {content.lineItemType}
                </Link>
              </div>

              <div className="mobile-card-content-row">
                <Link className="hf-link" to="#">
                  {content.dtoUser.userName}
                </Link>
                <Link className="hf-link d-flex justify-content-end" to="#">
                  {content.dtoUser.insertedDate}
                </Link>
              </div>
              {/* <div className="mobile-card-content-row">
              <CustomButton
                bgcolor={BasicColor}
                color="white"
                padding="8px 8px"
                width="100%"
                type="submit"
                title="Edit"
                margin="auto"
                clicked={() => editHandler(content)}
              />
              <CustomButton
                bgcolor={PrimaryColor}
                color="white"
                padding="8px 8px"
                width="100%"
                type="submit"
                title="Delete"
                margin="auto"
                clicked={() => deleteHandler(content)}
              />
            </div> */}
            </div>
        );
      })}
      </div>
    </MobileCardContainer>
  );
};

export default Index;

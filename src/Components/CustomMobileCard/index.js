import React from "react";
import CustomButton from "../CustomButton/Index";
import { MobileCardContainer } from "./style";
import { Link } from "react-router-dom";
import { BasicColor, PrimaryColor } from "../GlobalStyle";

const index = ({ data, deleteHandler, editHandler }) => {
  return (
    <MobileCardContainer>
      {data?.map((content, i) => {
        return (
          <div key={i} className="mobile-card-content">
            <div className="mobile-card-content-row">
              <Link className="hf-link" to="#">
                {content.id}
              </Link>
              <Link className="hf-link" to="#">
                {content.name}
              </Link>
            </div>
            <div className="mobile-card-content-row">
              <Link className="hf-link" to="#">
                {content.address || content.email}
              </Link>
              <Link className="hf-link" to="#">
                {content.dtoUser.userName}
              </Link>
            </div>
            <div className="mobile-card-content-row">
              <Link className="hf-link" to="#">
                {content.dtoUser.insertedDate}
              </Link>
            </div>
            <div className="mobile-card-content-row">
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
            </div>
          </div>
        );
      })}
    </MobileCardContainer>
  );
};

export default index;

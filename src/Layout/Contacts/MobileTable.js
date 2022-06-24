import React from "react";
import { MobileCardContainer } from "../../Components/CustomMobileCard/style";
import { Link, useNavigate } from "react-router-dom";

import deleteIcon from "../../Assets/icons/ic_delete.svg";
import editIcon from "../../Assets/icons/ic_edit.svg";
import addIcon from '../../Assets/ic_add_new.svg';
const MobileIndex = ({ data, deleteHandler, editHandler , carddetailHandler}) => {
    const navigate = useNavigate();

    return (
        <MobileCardContainer>
            <div className=" plus-icon d-md-none">
                <img src={addIcon} onClick={() => navigate("/contact/createContact")} alt="add-icon" />
            </div>
            <div>
                {data?.map((content, i) => {
                    return (
                        <div key={i} className="mobile-card-content" onClick={() => carddetailHandler(content)}>
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
                            <div className="mobile-card-content-row ">
                                <Link className="hf-link fw-bold" to="#">
                                    {content.name}
                                </Link>
                                <Link className="hf-link d-flex justify-content-end fw-bold" to="#">
                                    {content.dtoUser.phoneNumber}
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
                        </div>
                    );
                })}
            </div>
        </MobileCardContainer>
    );
};

export default MobileIndex;

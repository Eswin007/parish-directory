import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import axios from "axios";
import Card from "./Card";
import Dropdown from "./Dropdown";
import { BLOOD_GROUP, RELATION, photoURL, apiKey } from "../App";
import Family from "./Family";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const MemberForm = ({
  saveFamilyHandler,
  formData,
  setFormData,
  formRevealHandler,
  setFamilyMembersList,
  errors,
  setErrors,
  setMembersToBeRemoved,
  familyPhoto,
  setFamilyPhoto,
}) => {
  const fileUploadHandler = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", selectedFile);

      try {
        await axios.put(`${photoURL}/${selectedFile?.name}`, uploadFormData, {
          headers: {
            apikey: apiKey,
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "multipart/form-data",
          },
        });

        setFamilyPhoto(selectedFile?.name);
        setFormData((prev) => ({
          ...prev,
          photo: selectedFile?.name,
        }));
      } catch (err) {
        console.log(err.response.data, "err");
      }
    }
  };

  const removeImage = (e) => {
    e.preventDefault();
    setFamilyPhoto(null);
    // const { photo, ...withoutPhoto } = formData;
    // setFormData(withoutPhoto);
    setFormData((prev) => ({
      ...prev,
      photo: "",
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    saveFamilyHandler(formData);
    console.log(formData, "formdataonsubmit");
  };
  const onChangeHandler = (e, inputName, index = null, isMember) => {
    const { value } = e.target;

    setErrors((prev) => {
      if (isMember === "isMember" && index !== undefined) {
        return {
          ...prev,
          [`members[${index}].${inputName}`]: null,
        };
      } else {
        return {
          ...prev,
          [inputName]: null,
        };
      }
    });

    setFormData((prev) => {
      if (index !== null) {
        const updatedMembers = [...prev.members];
        updatedMembers[index] = {
          ...updatedMembers[index],
          [inputName]: value,
        };

        return {
          ...prev,
          members: updatedMembers,
        };
      } else {
        return {
          ...prev,
          [inputName]: value,
        };
      }
    });
  };

  const addMoreHandler = (e, familyID) => {
    e.preventDefault();
    const { members } = formData;
    const updatedMembers = [
      ...members,
      {
        family_id: familyID,
        name: "",
        occupation: "",
        relation: "",
        dob: "",
        dom: "",
        blood: "",
        tempID: Date.now() + Math.random(),
      },
    ];
    setFormData((prev) => ({ ...prev, members: updatedMembers }));
  };

  const removeMemberHandler = (e, membersID, tempID) => {
    e.preventDefault();
    const { members } = formData;
    let afterRemoval = members || [];
    if (membersID) {
      afterRemoval = members.filter((item) => item.membersID !== membersID);
      setMembersToBeRemoved((prev) => [...prev, membersID]);
    } else if (!membersID && tempID) {
      afterRemoval = members.filter((item) => item.tempID !== tempID);
    }
    setFormData((prev) => ({ ...prev, members: afterRemoval }));
  };

  const yesImage =
    formData?.photo !== "" &&
    familyPhoto !== null &&
    familyPhoto !== undefined &&
    formData?.photo !== null;

  const noImage =
    formData?.photo === "" || familyPhoto === null || familyPhoto === undefined;

  return (
    <form onSubmit={onSubmitHandler} className="add-members">
      <h3>Basic Details</h3>
      <div className="photo">
        {formData?.photo !== "" ? (
          <div className="photo__family">
            <img src={`${photoURL}/${formData?.photo}`} />
            <button onClick={(e) => removeImage(e)} className="photo__remove">
              Remove Photo
            </button>
          </div>
        ) : (
          <div className="photo__upload">
            <FontAwesomeIcon icon={faCamera} style={{ fontSize: "4rem" }} />
            <input
              type="file"
              name=""
              id=""
              onChange={(e) => fileUploadHandler(e)}
            />
          </div>
        )}
      </div>
      <InputField
        placeholder="Name"
        label="Name"
        value={formData?.hof || ""}
        onChange={(e) => onChangeHandler(e, "hof")}
        errors={errors?.hof}
      />
      <InputField
        placeholder="Phone 1"
        label="Phone 1"
        value={formData?.phone1}
        onChange={(e) => onChangeHandler(e, "phone1")}
        errors={errors?.phone1}
      />
      <InputField
        placeholder="Phone 2"
        label="Phone 2"
        value={formData?.phone2}
        onChange={(e) => onChangeHandler(e, "phone2")}
        errors={errors?.phone2}
      />
      <InputField
        placeholder="Email"
        label="Email"
        value={formData?.email}
        onChange={(e) => onChangeHandler(e, "email")}
        errors={errors?.email}
      />
      <InputField
        placeholder="Mother Parish"
        label="Mother Parish"
        value={formData?.mother_parish}
        onChange={(e) => onChangeHandler(e, "mother_parish")}
        errors={errors?.mother_parish}
      />
      <InputField
        placeholder="Address"
        label="Address"
        value={formData?.address}
        onChange={(e) => onChangeHandler(e, "address")}
        errors={errors?.address}
      />
      <InputField
        placeholder="Occupation"
        label="Occupation"
        value={formData?.occupation}
        onChange={(e) => onChangeHandler(e, "occupation")}
        errors={errors?.occupation}
      />
      <InputField
        type="date"
        placeholder="DD/MM/YY"
        label="Date of Birth"
        value={formData?.dob}
        onChange={(e) => onChangeHandler(e, "dob")}
        errors={errors?.dob}
      />
      <InputField
        type="date"
        placeholder="DD/MM/YY"
        label="Date of Marriage"
        value={formData?.dom}
        onChange={(e) => onChangeHandler(e, "dom")}
        errors={errors?.dom}
      />

      <Dropdown
        label="Blood Group"
        placeholder="Select"
        options={BLOOD_GROUP}
        value={formData?.blood}
        onChange={(value) => onChangeHandler({ target: { value } }, "blood")}
        errors={errors?.blood}
      />

      {formData?.members?.map((item, index) => {
        return (
          <Card key={index} className="full-width-col member-card">
            <InputField
              placeholder="Name"
              label="Name"
              value={item.name || ""}
              onChange={(e) => onChangeHandler(e, "name", index, "isMember")}
              errors={errors?.[`members[${index}].name`]}
            />
            <Dropdown
              label="Relation"
              placeholder="Select"
              options={RELATION}
              value={item.relation}
              onChange={(value) =>
                onChangeHandler(
                  { target: { value } },
                  "relation",
                  index,
                  "isMember"
                )
              }
              errors={errors?.[`members[${index}].relation`]}
            />

            <InputField
              placeholder="Occupation"
              label="Occupation"
              value={item?.occupation}
              onChange={(e) =>
                onChangeHandler(e, "occupation", index, "isMember")
              }
              errors={errors?.[`members[${index}].occupation`]}
            />
            <InputField
              type="date"
              placeholder="DD/MM/YY"
              label="Date of Birth"
              value={item.dob}
              onChange={(e) => onChangeHandler(e, "dob", index, "isMember")}
              errors={errors?.[`members[${index}].dob`]}
            />
            <InputField
              type="date"
              placeholder="DD/MM/YY"
              label="Date of Marriage"
              value={item.dom}
              onChange={(e) => onChangeHandler(e, "dom", index, "isMember")}
              errors={errors?.[`members[${index}].dom`]}
            />

            <Dropdown
              label="Blood Group"
              placeholder="Select"
              options={BLOOD_GROUP}
              value={item.blood}
              onChange={(value) =>
                onChangeHandler(
                  { target: { value } },
                  "blood",
                  index,
                  "isMember"
                )
              }
              errors={errors?.[`members[${index}].blood`]}
            />
            <Button
              variant="secondary"
              className="remove-member-btn"
              onClick={(e) =>
                removeMemberHandler(
                  e,
                  item?.membersID,
                  item?.tempID,
                  index,
                  "isMember"
                )
              }
            >
              Remove
            </Button>
          </Card>
        );
      })}

      <div className="button-wrap">
        <Button
          variant="secondary"
          onClick={(e) => addMoreHandler(e, formData?.family_id)}
        >
          Add More
        </Button>
        <Button variant="secondary" onClick={() => formRevealHandler(false)}>
          Cancel
        </Button>
        <Button>Save</Button>
      </div>
    </form>
  );
};

export default MemberForm;

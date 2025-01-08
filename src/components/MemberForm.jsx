import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import axios from "axios";
import Card from "./Card";
import Dropdown from "./Dropdown";
import { BLOOD_GROUP } from "../App";
import Family from "./Family";

const MemberForm = ({
  saveFamilyHandler,
  formData,
  setFormData,
  formRevealHandler,
  setFamilyMembersList,
  familyMembersList,
  errors,
  setErrors,
}) => {
  const onSubmitHanlder = (e) => {
    e.preventDefault();
    saveFamilyHandler(formData);
  };
  const onChangeHandler = (e, inputName) => {
    setFormData((prev) => ({
      ...prev,
      [inputName]: e.target.value,
    }));
  };

  const addMoreHandler = (e, familyID) => {
    e.preventDefault();
    setFamilyMembersList((prev) => [
      ...prev,
      {
        family_id: familyID,
        name: "",
        occupation: "",
        relation: "",
        dob: "",
        dom: "",
        blood: "",
      },
    ]);
  };

  const removeMemberHandler = (e, memberID, formId) => {
    // e.preventDefault();
    // console.log(formId, "eswinid");
    // // console.log(formData.members);
    // if (formData.members?.family_id === formId) {
    //   const updatedData = formData?.members?.filter(
    //     (member) => member.id !== memberID
    //   );
    // }
  };

  return (
    <form onSubmit={onSubmitHanlder} className="add-members">
      <h3>Basic Details</h3>
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

      {familyMembersList?.map((item, index) => {
        return (
          <Card key={index} className="full-width-col member-card">
            <InputField
              placeholder="Name"
              label="Name"
              value={item.name || ""}
              onChange={(e) => onChangeHandler(e, "name", item.id, index)}
              errors={errors?.[`members[${index}].name`]}
            />
            <InputField
              placeholder="Relation"
              label="Relation"
              value={item.relation}
              onChange={(e) => onChangeHandler(e, "relation", item.id, index)}
              errors={errors?.[`members[${index}].relation`]}
            />
            <InputField
              placeholder="Occupation"
              label="Occupation"
              value={item.occupation}
              onChange={(e) => onChangeHandler(e, "occupation", item.id)}
              errors={errors?.[`members[${index}].occupation`]}
            />
            <InputField
              type="date"
              placeholder="DD/MM/YY"
              label="Date of Birth"
              value={item.dob}
              onChange={(e) => onChangeHandler(e, "dob", item.id)}
              errors={errors?.[`members[${index}].dob`]}
            />
            <InputField
              type="date"
              placeholder="DD/MM/YY"
              label="Date of Marriage"
              value={item.dom}
              onChange={(e) => onChangeHandler(e, "dom", item.id)}
              errors={errors?.[`members[${index}].dom`]}
            />

            <Dropdown
              label="Blood Group"
              placeholder="Select"
              options={BLOOD_GROUP}
              value={item.blood}
              onChange={(value) =>
                onChangeHandler({ target: { value } }, "blood", item.id)
              }
              errors={errors?.[`members[${index}].blood`]}
            />
            <Button
              variant="secondary"
              className="remove-member-btn"
              onClick={(e) =>
                removeMemberHandler(e, item.id, formData.family_id)
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
          onClick={(e) => addMoreHandler(e, formData.family_id)}
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

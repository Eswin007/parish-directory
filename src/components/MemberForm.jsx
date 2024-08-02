import React, { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import axios from "axios";
import Card from "./Card";

const MemberForm = ({
  saveFamilyHandler,
  formData,
  setFormData,
  setShowForm,
}) => {
  const onSubmitHanlder = (e) => {
    e.preventDefault();
    saveFamilyHandler(formData, formData.id);
  };
  const onChangeHandler = (e, inputName, membersId) => {
    setFormData((prev) => {
      const updatedMembers = prev.members?.map((member) => {
        if (member.id === membersId) {
          return { ...member, [inputName]: e.target.value };
        }
        return member;
      });
      return { ...prev, [inputName]: e.target.value, members: updatedMembers };
    });
  };
  // const onChangeHandler = (e, inputName, membersId) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [inputName]: e.target.value,
  //   }));
  // };

  const addMoreHandler = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={onSubmitHanlder} className="add-members">
      <h3>Basic Details</h3>
      <InputField
        placeholder="Name"
        label="Name"
        value={formData.hof}
        onChange={(e) => onChangeHandler(e, "hof")}
      />
      <InputField
        placeholder="Phone 1"
        label="Phone 1"
        value={formData.phone1}
        onChange={(e) => onChangeHandler(e, "phone1")}
      />
      <InputField
        placeholder="Phone 2"
        label="Phone 2"
        value={formData.phone2}
        onChange={(e) => onChangeHandler(e, "phone2")}
      />
      <InputField
        placeholder="Email"
        label="Email"
        value={formData.email}
        onChange={(e) => onChangeHandler(e, "email")}
      />
      <InputField
        placeholder="Mother Parish"
        label="Mother Parish"
        value={formData.mother_parish}
        onChange={(e) => onChangeHandler(e, "mother_parish")}
      />
      <InputField
        placeholder="Address"
        label="Address"
        value={formData.address}
        onChange={(e) => onChangeHandler(e, "address")}
      />
      <InputField
        placeholder="Occupation"
        label="Occupation"
        value={formData.dom}
        onChange={(e) => onChangeHandler(e, "occupation")}
      />
      <InputField
        type="date"
        placeholder="DD/MM/YY"
        label="Date of Birth"
        value={formData.dob}
        onChange={(e) => onChangeHandler(e, "dob")}
      />
      <InputField
        type="date"
        placeholder="DD/MM/YY"
        label="Date of Marriage"
        value={formData.dom}
        onChange={(e) => onChangeHandler(e, "dom")}
      />
      <InputField
        placeholder="Blood"
        label="Blood Group"
        value={formData.blood}
        onChange={(e) => onChangeHandler(e, "blood")}
      />

      {formData?.members?.map((item) => {
        return (
          <Card key={item.id} className="full-width-col member-card">
            <InputField
              placeholder="Name"
              label="Name"
              value={item.name}
              onChange={(e) => onChangeHandler(e, "name", item.id)}
            />
            <InputField
              placeholder="Relation"
              label="Relation"
              value={item.relation}
              onChange={(e) => onChangeHandler(e, "relation", item.id)}
            />
            <InputField
              type="date"
              placeholder="DD/MM/YY"
              label="Date of Birth"
              value={item.dob}
              onChange={(e) => onChangeHandler(e, "dob", item.id)}
            />
            <InputField
              type="date"
              placeholder="DD/MM/YY"
              label="Date of Marriage"
              value={item.dom}
              onChange={(e) => onChangeHandler(e, "dom", item.id)}
            />
            <InputField
              placeholder="Blood"
              label="Blood"
              value={item.blood}
              onChange={(e) => onChangeHandler(e, "blood", item.id)}
            />
          </Card>
        );
      })}

      <div className="button-wrap">
        <Button variant="secondary" onClick={addMoreHandler}>
          Add More
        </Button>
        <Button variant="secondary" onClick={() => setShowForm(false)}>
          Cancel
        </Button>
        <Button>Save</Button>
      </div>
    </form>
  );
};

export default MemberForm;

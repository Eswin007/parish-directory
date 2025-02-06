import axios from "axios";
import Header from "./components/Header";
import Family from "./components/Family";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import "./scss/main.scss";
import MemberForm from "./components/MemberForm";
import Loader from "./components/Loader";
import Toast from "./components/Toast";
import { AnimatePresence } from "framer-motion";
import FamilyList from "./components/FamilyList";
import { VALIDATION_SCHEMA } from "./components/Utilities";
import MemberPlaceholder from "./components/MemberPlaceholder";
import { RELATION, FAMILY_INITIAL, apiKey } from "./components/Utilities";

const headerConfig = {
  headers: {
    apikey: apiKey,
    Authorization: `Bearer ${apiKey}`,
    Accept: "application/json",
    "Content-Type": "application/json",
    Prefer: "return=representation",
  },
};

const supabaseURL = `https://vffwbrvixbmlabmozktp.supabase.co`;
export const photoURL = `${supabaseURL}/storage/v1/object/family-photos`;

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(FAMILY_INITIAL);
  const [familyList, setFamilyList] = useState([]);
  const [familyMembersList, setFamilyMembersList] = useState([]);
  const [filteredFamily, setFilteredFamily] = useState([]);
  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [membersToBeRemoved, setMembersToBeRemoved] = useState([]);
  const [familyPhoto, setFamilyPhoto] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeMember, setActiveMember] = useState(null);

  const fetchMembers = async () => {
    setIsLoading(true);
    const familyURL = `${supabaseURL}/rest/v1/family`;
    const familyMembersURL = `${supabaseURL}/rest/v1/familyMembers`;

    const familyList = await axios.get(familyURL, {
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",

        "Content-Type": "application/json",
      },
    });
    const membersList = await axios.get(familyMembersURL, {
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    setFilteredFamily(
      familyList.data.sort((a, b) => a.hof.localeCompare(b.hof))
    );
    setFamilyList(familyList.data.sort((a, b) => a.hof.localeCompare(b.hof)));
    setFamilyMembersList(membersList.data);
    setIsLoading(false);
  };

  const activeMemberHandler = (family) => {
    if (family === activeMember) return;
    setActiveMember(null);

    setTimeout(() => {
      setActiveMember(family);
    }, 200);
  };

  const formRevealHandler = (value) => {
    setShowForm(value);
    setErrors({});
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const toastRevealer = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const validationSchema = VALIDATION_SCHEMA;

  const saveFamilyHandler = async (formData) => {
    setIsLoading(true);
    const { members, ...familyHead } = formData;
    const finalFamilyHead = { ...familyHead, photo: familyPhoto };

    const familyURL = `${supabaseURL}/rest/v1/family`;
    const familyMembersURL = `${supabaseURL}/rest/v1/familyMembers`;

    const postMembers = (members, familyID) => {
      const updatedMembers = members?.map((member) => {
        if (member?.membersID) {
          axios.put(
            `${familyMembersURL}?membersID=eq.${member?.membersID}`,
            member,
            headerConfig
          );
        } else if (member?.family_id) {
          axios.post(familyMembersURL, member, headerConfig);
        } else {
          axios.post(
            familyMembersURL,
            { ...member, family_id: familyID },
            headerConfig
          );
        }
      });
      return updatedMembers;
    };

    const removeMembersFromForm = (ids) => {
      if (ids?.length > 0) {
        const removeMembers = ids?.map((id) => {
          axios.delete(`${familyMembersURL}?membersID=eq.${id}`, headerConfig);
        });
        return removeMembers;
      }
    };

    let returnedFamilyID;

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log(formData, "formdata on save family");
      setErrors({});
      if (finalFamilyHead?.family_id) {
        // this is a check to see if the family head already has a photo value in place, if it has the value, then it is just updating the form data, and if not, we're updaing it as family ehad and adding the family photo separately.

        if (familyHead.photo !== "") {
          await axios.put(
            `${familyURL}?family_id=eq.${familyHead?.family_id}`,
            { ...familyHead },
            headerConfig
          );
        } else {
          await axios.put(
            `${familyURL}?family_id=eq.${finalFamilyHead?.family_id}`,
            { ...finalFamilyHead, photo: familyPhoto || "" },
            headerConfig
          );
        }
      } else {
        await axios
          .post(
            familyURL,
            { ...finalFamilyHead, photo: familyPhoto || "" },
            headerConfig
          )
          .then((response) => (returnedFamilyID = response.data[0].family_id));
      }

      if (returnedFamilyID !== null) {
        await postMembers(members, returnedFamilyID);
      }

      if (membersToBeRemoved.length !== 0) {
        await removeMembersFromForm(membersToBeRemoved);
      }
      await fetchMembers();
      formRevealHandler(false);
      setFormData(FAMILY_INITIAL);
      setFamilyPhoto(null);
      setTimeout(() => {
        toastRevealer("Directory Updated");
      }, 700);
    } catch (validationErrors) {
      const formErrors = {};
      validationErrors.inner.forEach(
        (error) => (formErrors[error.path] = error.message)
      );
      setErrors(formErrors);
    }
    setMembersToBeRemoved([]);
    setIsLoading(false);
  };
  const onDeleteFamily = (id) => {
    const familyURL = `${supabaseURL}/rest/v1/family`;
    try {
      setIsLoading(true);
      axios
        .delete(`${familyURL}?family_id=eq.${id}`, headerConfig)
        .then((res) => fetchMembers())
        .catch((err) => {
          console.log("error", err);
        });
      setActiveMember(null);
    } catch (err) {
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        toastRevealer(`Family Removed`);
      }, 700);
    }
  };

  const onEditFamily = async (id) => {
    formRevealHandler(true);
    const editFamily = familyList?.find((family) => family.family_id === id);
    const editMember = familyMembersList?.filter(
      (members) => members?.family_id === id
    );

    setFormData({
      ...editFamily,
      members: editMember,
    });
    console.log(formData, "formData on edit");
  };
  const toggleMode = ()=>{
    const element = document.querySelector('html');
    element.dataset.theme = 'dark'
  }
  return (
    <>
    <div className="toggle" onClick={() => toggleMode()}>Toggle</div>
      <AnimatePresence mode="wait" initial={false}>
        {showToast && <Toast setShowToast={setShowToast}>{toastMessage}</Toast>}
      </AnimatePresence>
      {isLoading && <Loader />}

      <div className="body-wrap">
        <div className="family-listing-wrap">
          <Header
            formRevealHandler={formRevealHandler}
            showForm={showForm}
            setFormData={setFormData}
            fetchMembers={fetchMembers}
            setFilteredFamily={setFilteredFamily}
            familyList={familyList}
            familyMembersList={familyMembersList}
            setActiveMember={setActiveMember}
          />
          <div className="family-primary-data">
            <FamilyList
              activeMemberHandler={activeMemberHandler}
              activeMember={activeMember}
              filteredFamily={filteredFamily}
              onEditFamily={onEditFamily}
              onDeleteFamily={onDeleteFamily}
              showForm={showForm}
            />
            {!showForm && filteredFamily.length === 0 && (
              <div className="empty-results">No Results</div>
            )}
          </div>
          <div className="family-details">
            <AnimatePresence mode="wait" initial={false}>
              {showForm && (
                <MemberForm
                  formData={formData}
                  setFormData={setFormData}
                  saveFamilyHandler={saveFamilyHandler}
                  formRevealHandler={formRevealHandler}
                  errors={errors}
                  setErrors={setErrors}
                  familyList={familyList}
                  setFamilyMembersList={setFamilyMembersList}
                  setMembersToBeRemoved={setMembersToBeRemoved}
                  familyPhoto={familyPhoto}
                  setFamilyPhoto={setFamilyPhoto}
                />
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait" initial={false}>
              {!showForm && activeMember !== null && (
                <Family
                  family={activeMember}
                  familyMembers={familyMembersList
                    .filter(
                      (member) => member?.family_id === activeMember?.family_id
                    )
                    .sort(
                      (a, b) =>
                        RELATION.indexOf(a.relation) -
                        RELATION.indexOf(b.relation)
                    )}
                  onDeleteFamily={onDeleteFamily}
                  onEditFamily={onEditFamily}
                />
              )}
            </AnimatePresence>

            {!activeMember && !showForm && filteredFamily?.length > 0 && (
              <MemberPlaceholder />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

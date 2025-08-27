import axios from "axios";
import { Analytics } from "@vercel/analytics/react"
import Header from "./components/Header";
import Family from "./components/Family";
import { useEffect, useState } from "react";
import "./scss/main.scss";
import MemberForm from "./components/MemberForm";
import Loader from "./components/Overlays/Loader";
import Toast from "./components/Overlays/Toast";
import { AnimatePresence, motion } from "framer-motion";
import FamilyList from "./components/FamilyList";
import { VALIDATION_SCHEMA } from "./components/Utilities";
import BirthdayCalendar from "./components/BirthdayCalendar";
import { RELATION, FAMILY_INITIAL, apiKey } from "./components/Utilities";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

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
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
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
  const [bdayMembers, setBdayMembers] = useState([null]);
  const [showBday, setShowBday] = useState(() => {
    if (isTabletOrMobile) {
      return false;
    } else {
      return true;
    }
  });

  //Media Queries


  const [storage, setStorage] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const themePreference = () => {
    if (
      window.matchMedia &&
      storage !== "dark" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setStorage(() => "dark");
    }
    if (
      window.matchMedia &&
      storage !== "light" &&
      window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
      setStorage(() => "light");
    }
  };

  useEffect(() => {
    themePreference();
  }, []);
 

  const HTMLElement = document.querySelector("html");
  useEffect(() => {
    localStorage.setItem("theme", storage);
    HTMLElement.dataset.theme = storage;
  }, [storage]);

  const toggleMode = () => {
    setStorage((prev) => {
      const updatedTheme = prev === "light" ? "dark" : "light";
      return updatedTheme;
    });
    HTMLElement.dataset.theme = storage === "light" ? "dark" : "light";
  };

  //fetch members function
  const fetchMembers = async () => {
    setIsLoading(true);
    const familyURL = `${supabaseURL}/rest/v1/parish`;
    const familyMembersURL = `${supabaseURL}/rest/v1/parishMembers`;

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

  //Setting Active member to be shown in right panel and also to add an active state on the list item
  const activeMemberHandler = (family) => {
    if (family === activeMember) return;
    setActiveMember(family);
  };

  //showing edit/create form
  const formRevealHandler = (value) => {
    setShowForm(value);
    setErrors({});
  };

  //calling the main members at first
  useEffect(() => {
    fetchMembers();
    upcomingBirthdays(familyList, familyMembersList);
  }, []);

  const toastRevealer = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const upcomingBirthdays = (familyHeads, familyMembers) => {
    const fullFamily = [...familyHeads, ...familyMembers];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tenDaysLater = new Date();
    tenDaysLater.setDate(today.getDate() + 15);

    const bdays = fullFamily.filter((member) => {
      if (!member?.dob) return false;

      const birthdate = new Date(member?.dob);
      const memberBirthdayThisYear = new Date(
        today.getFullYear(),
        birthdate.getMonth(),
        birthdate.getDate()
      );
      return (
        memberBirthdayThisYear >= today &&
        memberBirthdayThisYear <= tenDaysLater
      );
    });
    const sortedBdays = bdays.sort((a, b) => new Date(a.dob) - new Date(b.dob));
    setBdayMembers(sortedBdays);
  };

  useEffect(() => {
    upcomingBirthdays(familyList, familyMembersList);
  }, [familyList, familyMembersList]);

  const validationSchema = VALIDATION_SCHEMA;

  const saveFamilyHandler = async (formData) => {
    console.log(formData, 'checkForm')
    setIsLoading(true);
    const { members, ...familyHead } = formData;
    const finalFamilyHead = { ...familyHead, photo: familyPhoto };

    const familyURL = `${supabaseURL}/rest/v1/parish`;
    const familyMembersURL = `${supabaseURL}/rest/v1/parishMembers`;

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
        setActiveMember(formData);
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
    const familyURL = `${supabaseURL}/rest/v1/parish`;
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

  const getSortedFamilyMembers = (family) => {
    return familyMembersList
      ?.filter((member) => member?.family_id === activeMember?.family_id)
      .sort(
        (a, b) => RELATION.indexOf(a.relation) - RELATION.indexOf(b.relation)
      );
  };

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {showToast && <Toast setShowToast={setShowToast}>{toastMessage}</Toast>}
      </AnimatePresence>
      {isLoading && <Loader />}

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
          toggleMode={toggleMode}
          storage={storage}
          setShowBday={setShowBday}
        />
        <AnimatePresence mode="wait">
          {activeMember && !showForm && !isTabletOrMobile && (
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 2 }}
              exit={{ y: 10, opacity: 0 }}
              className="active-clear-btn"
              onClick={() => setActiveMember(null)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </motion.button>
          )}
        </AnimatePresence>
        <div className="family-table-wrap">
          {!isLoading && (
            <FamilyList
              activeMemberHandler={activeMemberHandler}
              activeMember={activeMember}
              filteredFamily={filteredFamily}
              onEditFamily={onEditFamily}
              onDeleteFamily={onDeleteFamily}
              showForm={showForm}
            />
          )}
        </div>
        <div className="family-details custom-scroll">
          <AnimatePresence mode="wait" initial={false}>
            {!showForm ? (
              activeMember ? (
                <Family
                  key={activeMember?.family_id}
                  family={activeMember}
                  setActiveMember={setActiveMember}
                  familyMembers={getSortedFamilyMembers(
                    activeMember?.family_id
                  )}
                  onDeleteFamily={onDeleteFamily}
                  onEditFamily={onEditFamily}
                />
              ) : (
                filteredFamily?.length > 0 &&
                showBday && (
                  <BirthdayCalendar
                    familyList={familyList}
                    bdayMembers={bdayMembers}
                    setShowBday={setShowBday}
                  />
                )
              )
            ) : (
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
        </div>
      </div>
      <Analytics />
    </>
  );
};

export default App;

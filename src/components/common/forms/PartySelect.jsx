import { useCallback, useState, useRef, useEffect } from "react";
import { Button } from ".";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormikContext } from "formik";
import { AsyncSelect } from ".";
import { Query } from "appwrite";
import { appwriteConfig } from "../../../lib/appwrite/config";
import { databases, account } from "../../../lib/appwrite/client";

const FORM_STATE_KEY = "transaction_form_state";

const PartySelect = (props) => {
  const formikContext = useFormikContext();
  const { setFieldValue } = formikContext;
  const navigate = useNavigate();
  const location = useLocation();

  const newPartyIdRef = useRef(null);
  const [localStorageAvailable, setLocalStorageAvailable] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const partyId = searchParams.get("party_id");
    const returnFromParties = searchParams.get("return_from_parties");

    if (partyId && returnFromParties === "true") {
      newPartyIdRef.current = partyId;

      if (localStorageAvailable) {
        try {
          const savedState = localStorage.getItem(FORM_STATE_KEY);
          if (savedState) {
            const parsedState = JSON.parse(savedState);

            Object.keys(parsedState).forEach((key) => {
              if (key !== props.name) {
                setFieldValue(key, parsedState[key]);
              }
            });

            setFieldValue(props.name, partyId);

            localStorage.removeItem(FORM_STATE_KEY);
          }
        } catch (error) {
          console.error("Error restoring form state:", error);
        }
      }

      // Clean up URL parameters
      if (window.history && window.history.replaceState) {
        const newUrl = `${window.location.pathname}${window.location.hash}`;
        window.history.replaceState({}, "", newUrl);
      }
    }
  }, [location, setFieldValue, props.name, localStorageAvailable]);

  useEffect(() => {
    try {
      const testKey = "_test_localStorage_";
      localStorage.setItem(testKey, "test");
      const testValue = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);

      if (testValue !== "test") {
        setLocalStorageAvailable(false);
        console.error("localStorage doesn't appear to be working properly");
      }
    } catch (error) {
      setLocalStorageAvailable(false);
      console.error("localStorage is not available:", error);
    }
  }, []);

  const generateOption = (option) => ({
    value: option.$id,
    label: <div className="p-3 font-satoshi text-tiny">{option.name}</div>,
  });

  const handleNavigateToParties = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!localStorageAvailable) {
      console.error("Cannot save form state: localStorage is not available");
      navigate("/settings/parties?return_to_transaction=true");
      return;
    }

    try {
      localStorage.setItem(
        FORM_STATE_KEY,
        JSON.stringify(formikContext.values)
      );
      navigate("/settings/parties?return_to_transaction=true");
    } catch (error) {
      console.error("Error saving form state:", error);
      navigate("/settings/parties?return_to_transaction=true");
    }
  };

  const lastOption = {
    value: "new",
    label: (
      <div className="border-t border-t-[#CCCCCC] bg-white p-3">
        <Button
          type="button"
          className="font-medium text-[0.5rem] px-2 h-4 py-0 align-middle border-transparent text-black"
          onClick={handleNavigateToParties}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          kind="secondary"
        >
          Create Party
        </Button>
      </div>
    ),
    isDisabled: true,
  };

  const loadOptions = useCallback(async (inputValue) => {
    const currentPartyId = newPartyIdRef.current;

    try {
      const { $id: userId } = await account.get();
      const queries = [
        Query.limit(100),
        Query.equal("created_by", userId),
        Query.orderAsc("name"),
        Query.orderDesc("$createdAt"),
      ];

      if (inputValue) {
        queries.push(Query.contains("name", inputValue));
      }

      if (currentPartyId) {
        queries.push(Query.equal("$id", currentPartyId));
      }

      const response = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.collections.parties,
        queries
      );

      if (response?.total > 0) {
        return [...response.documents.map(generateOption), lastOption];
      }

      return [lastOption];
    } catch (error) {
      return [lastOption];
    }
  }, []);

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      setFieldValue(props.name, selectedOption.value);
      return;
    }

    setFieldValue(props.name, "");
  };

  return (
    <AsyncSelect
      handleChange={handleChange}
      loadOptions={loadOptions}
      defaultOptions={true}
      cacheOptions={false}
      {...props}
    />
  );
};

export default PartySelect;

import { useCallback, useState, useEffect, useRef } from "react";
import { AsyncSelect } from ".";
import { useFormikContext } from "formik";
import { Button } from ".";
import { useNavigate, useLocation } from "react-router-dom";
import { Query } from "appwrite";
import { appwriteConfig } from "../../../lib/appwrite/config";
import { databases } from "../../../lib/appwrite/client";

const FORM_STATE_KEY = "transaction_form_state";

const CategorySelect = (props) => {
  const formikContext = useFormikContext();
  const { values, setFieldValue } = formikContext;
  const navigate = useNavigate();
  const location = useLocation();

  const newCategoryIdRef = useRef(null);
  const [localStorageAvailable, setLocalStorageAvailable] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryId = searchParams.get("category_id");
    const returnFromCategories = searchParams.get("return_from_categories");

    if (categoryId && returnFromCategories === "true") {
      newCategoryIdRef.current = categoryId;

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

            setFieldValue(props.name, categoryId);

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

  const groupCategoryByType = useCallback((categories) => {
    return (categories || []).reduce((acc, category) => {
      const type = category.type || "other";
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(category);
      return acc;
    }, {});
  }, []);

  const generateOption = (category) => ({
    value: category.$id,
    label: <div className="p-3 font-satoshi text-tiny">{category.name}</div>,
    data: category,
  });

  const handleNavigateToCategories = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!localStorageAvailable) {
      console.error("Cannot save form state: localStorage is not available");
      navigate("/settings/categories?return_to_transaction=true");
      return;
    }

    try {
      localStorage.setItem(
        FORM_STATE_KEY,
        JSON.stringify(formikContext.values)
      );
      navigate("/settings/categories?return_to_transaction=true");
    } catch (error) {
      console.error("Error saving form state:", error);
      navigate("/settings/categories?return_to_transaction=true");
    }
  };

  const lastOption = {
    value: "new",
    label: (
      <div className="border-t border-t-[#CCCCCC] bg-white p-3">
        <Button
          type="button"
          className="font-medium text-[0.5rem] px-2 h-4 py-0 align-middle border-transparent text-black"
          onClick={handleNavigateToCategories}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          kind="secondary"
        >
          Create Category
        </Button>
      </div>
    ),
    isDisabled: true,
  };

  const loadOptions = useCallback(
    async (inputValue) => {
      const currentCategoryId = newCategoryIdRef.current;

      try {
        const queries = [
          Query.limit(100),
          Query.orderAsc("name"),
          Query.orderDesc("$createdAt"),
          Query.equal("is_active", true),
        ];

        if (inputValue) {
          queries.push(Query.contains("name", inputValue));
        }


        if (values.flow_type === "income") {
          queries.push(Query.equal("type", ["income", "both"]));
        } else if (values.flow_type === "expense") {
          queries.push(Query.equal("type", ["expense", "both"]));
        }

        if (currentCategoryId) {
          queries.push(Query.equal("$id", currentCategoryId));
        }

        const response = await databases.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.collections.categories,
          queries
        );

        const groupedCategories = groupCategoryByType(response.documents);

        let options = [];

        if (values.flow_type === "income") {
          const bothOptions = groupedCategories.both || [];
          const incomeOptions = groupedCategories.income || [];
          options = [...bothOptions, ...incomeOptions].map(generateOption);
        } else if (values.flow_type === "expense") {
          const bothOptions = groupedCategories.both || [];
          const expenseOptions = groupedCategories.expense || [];
          options = [...bothOptions, ...expenseOptions].map(generateOption);
        }

        if (currentCategoryId) {
          const newCategoryOption = options.find(
            (opt) => opt.value === currentCategoryId
          );

          if (newCategoryOption) {
            setFieldValue(props.name, currentCategoryId);
            setFieldValue("flow_type", newCategoryOption.data.type);
            newCategoryIdRef.current = null;
          }
        }

        return [...options, lastOption];
      } catch (error) {
        console.error("Error loading options:", error);
        return [lastOption];
      }
    },
    [values.flow_type, groupCategoryByType, props.name, setFieldValue]
  );

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

export default CategorySelect;

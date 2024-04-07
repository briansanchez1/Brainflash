import React, { useState, useEffect, useContext } from "react";
import { apiCategories } from "../helpers/axios_helper";
import CategoryModalView from "../components/modal_components/category_focus";
import GridView from "../components/grid_view";
import AlertBox from "../components/alert_component";
import { BrainflashContext } from "../components/context/brainflash_context";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  //Alert State
  const [showAlert, setAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const { categories, setCategories, removeCategory, updateCategory } =
    useContext(BrainflashContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all categories when the component mounts
    apiCategories
      .getAllCategories()
      .then((response) => {
        setCategories(
          response.data.map((c) => {
            return c;
          })
        );
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  const handleClick = (category) => {
    // Handle click event, navigate to a category detail page
    navigate(`/flashcards/category/${category.id}`);
  };

  const editModal = (c, handle) => {
    return <CategoryModalView category={c} onCategoryEdit={handle} />;
  };

  const confirmEditAction = (c, callback) => {
    setAlert(false);
    apiCategories
      .updateCategory(c.id, c)
      .then((response) => {
        updateCategory(c);
        setAlert(true);
        setAlertMessage(response.data.message);
        setAlertSeverity("success");
        callback(c);
      })
      .catch((error) => {
        setAlertMessage(error);
        setAlertSeverity("error");
      });
  };

  const confirmDeleteAction = (deletedCategory, callback) => {
    setAlert(false);

    apiCategories
      .deleteCategory(deletedCategory.id)
      .then((response) => {
        removeCategory(deletedCategory.id);
        setAlert(true);
        setAlertMessage(response.data.message);
        setAlertSeverity("success");
        callback(deletedCategory);
      })
      .catch((error) => {
        setAlertMessage(error);
        setAlertSeverity("error");
      });
  };

  return (
    <>
      {showAlert && (
        <AlertBox severity={alertSeverity} message={alertMessage} />
      )}
      <GridView
        title="Categories"
        items={categories}
        itemName="category"
        onItemClick={(item) => handleClick(item)}
        onItemDelete={(c, callback) => confirmDeleteAction(c, callback)}
        onItemEdit={(c, callback) => confirmEditAction(c, callback)}
        editModalContent={(c, handle) => editModal(c, handle)}
        cardContent={(category) => {
          return (
            <Typography variant="h6" component="h2" align="center">
              {category.title}
            </Typography>
          );
        }}
        onSearchFilter={(category, searchTerm) =>
          category.title.toLowerCase().includes(searchTerm.toLowerCase())
        }
      ></GridView>
    </>
  );
};

export default Categories;

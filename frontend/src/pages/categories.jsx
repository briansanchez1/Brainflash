import React, { useState, useEffect } from "react";
import { Typography, Container, Button } from "@mui/material";
import { apiCategories } from "../helpers/axios_helper";
import ActionModal from "../components/action_modal";
import CategoryView from "../components/modal_components/category_focus";
import CardGridView from "../components/grid_view";
import { SearchField } from "../components/text_fields";
import AlertBox from "../components/alert_component";
import { useNavigate } from "react-router-dom";

const CategoriesGrid = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // Modal states
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [handleAction, setHandleAction] = useState(null);
  //Alert State
  const [showAlert, setAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all categories when the component mounts
    apiCategories
      .getAllCategories()
      .then((response) => {
        setCategories(response.data); // Set the categories in state
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Updates filtered categories
  const filteredCategories = categories.filter((category) =>
    category.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Modal
  const handleEditModalOpen = (category) => {
    setModalTitle("Edit Category");
    setModalContent(
      <CategoryView
        category={category}
        onUpdate={(c) => {
          setHandleAction(() => () => confirmEditAction(c));
        }}
      />
    );
    setModalOpen(true);
    setAlert(false);
  };

  const handleDeleteModalOpen = (category) => {
    setModalTitle("Delete Category");
    setModalContent("Are you sure you want to delete this category?");
    setHandleAction(() => () => confirmDeleteAction(category));
    setModalOpen(true);
    setAlert(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const confirmDeleteAction = (category) => {
    setAlert(true);
    apiCategories
      .deleteCategory(category.id)
      .then((response) => {
        setCategories(categories.filter((c) => c.id !== category.id));
        handleCloseModal();
        setAlertMessage("Category successfully deleted.");
        setAlertSeverity("success");
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        setAlertMessage(error);
        setAlertSeverity("error");
      });
  };

  const confirmEditAction = (c) => {
    apiCategories
      .updateCategory(c.id, c.title)
      .then((response) => {
        // Assuming response.data is the updated category object
        const updatedCategories = categories.map((category) => {
          return category.id === c.id ? c : category;
        });
        setCategories(updatedCategories);
        handleCloseModal();
        setAlert(true);
        setAlertMessage("Category successfully edited.");
        setAlertSeverity("success");
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        setAlert(true);
        setAlertMessage(error);
        setAlertSeverity("error");
      });
  };

  const handleClick = (category) => {
    // Handle click event, for example, navigate to a category detail page
    //console.log("Clicked category:", category);
    navigate(`/flashcards/category/${category.id}`);
  };

  return (
    <Container>
      {showAlert && (
        <AlertBox severiry={alertSeverity} message={alertMessage} />
      )}

      <Typography sx={{ my: 4, textAlign: "left" }} variant="h4">
        Categories
      </Typography>
      <SearchField onSearch={(event) => setSearchTerm(event.target.value)} />
      <CardGridView
        itemName={"Categories"}
        items={filteredCategories}
        cardContent={(item) => (
          <Typography variant="h6" component="h2" align="center">
            {item.title}
          </Typography>
        )}
        onCardClick={(category) => handleClick(category)}
        onCardEdit={(category) => handleEditModalOpen(category)}
        onCardDelete={(category) => handleDeleteModalOpen(category)}
      ></CardGridView>
      <ActionModal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        title={modalTitle}
        content={modalContent}
        buttons={
          <>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button onClick={handleAction}>Confirm</Button>
          </>
        }
      />
    </Container>
  );
};

export default CategoriesGrid;

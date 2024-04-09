import React, { useState, useEffect } from "react";
import { Typography, Container, Button } from "@mui/material";
import ActionModal from "../components/action_modal";
import CardGrid from "../components/card_grid";
import { SearchField } from "../components/text_fields";

const btnStyle = {
  color: "#000",
  bgcolor: "#dec0b1",
  borderRadius: "10px",
  ":hover": {
    bgcolor: "#b5a69f",
    color: "#000",
  },
};
const GridView = ({
  title,
  items,
  itemName,
  onItemClick,
  onItemDelete,
  onItemEdit,
  editModalContent,
  cardContent,
  onSearchFilter,
  customItem,
}) => {
  const [gridItems, setGridItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // Modal states
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [handleAction, setHandleAction] = useState(null);

  useEffect(() => {
    setGridItems(items);
  }, [items]);
  // Updates filtered items
  const filteredItems = gridItems.filter((item) =>
    onSearchFilter(item, searchTerm)
  );

  const handleEditModalOpen = (item) => {
    setModalTitle(`Edit ${itemName}`);
    setModalContent(
      editModalContent(item, (i) => {
        setHandleAction(
          () => () =>
            onItemEdit(i, (updatedItem) => editActionCallback(updatedItem))
        );
      })
    );

    setModalOpen(true);
  };

  const handleDeleteModalOpen = (item) => {
    setModalTitle(`Edit ${itemName}`);
    setModalTitle("Delete items");
    setModalContent(`Are you sure you want to delete this ${itemName}?`);
    setHandleAction(
      () => () =>
        onItemDelete(item, (deletedItem) => deleteActionCallback(deletedItem))
    );
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const deleteActionCallback = (deletedItem) => {
    setGridItems(gridItems.filter((i) => i.id !== deletedItem.id));
    handleCloseModal();
  };

  const editActionCallback = (updatedItem) => {
    const updatedItems = gridItems.map((item) => {
      if (item.id === updatedItem.id) {
        item = updatedItem;
      }
      return item;
    });
    setGridItems(updatedItems);
    handleCloseModal();
  };

  return (
    <Container >
      <Typography sx={{ my: 4, textAlign: "left" }} variant="h4">
        {title}
      </Typography>
      <SearchField onSearch={(event) => setSearchTerm(event.target.value)} />
      <CardGrid
        itemName={"items"}
        items={filteredItems}
        cardContent={(curr_item) => cardContent(curr_item)}
        onCardClick={(item) => onItemClick(item)}
        onCardEdit={(item) => handleEditModalOpen(item)}
        onCardDelete={(item) => handleDeleteModalOpen(item)}
        customItem={
          customItem
            ? (i) => {
                return customItem(
                  i,
                  handleEditModalOpen,
                  handleDeleteModalOpen
                );
              }
            : null
        }
      ></CardGrid>
      <ActionModal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        title={modalTitle}
        content={modalContent}
        buttons={
          <>
            <Button onClick={handleCloseModal} sx={btnStyle}>
              Cancel
            </Button>
            <Button onClick={handleAction} sx={btnStyle}>
              Confirm
            </Button>
          </>
        }
      />
    </Container>
  );
};

export default GridView;

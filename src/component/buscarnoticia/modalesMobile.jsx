import ModalMobile from "component/common/modalMobile";
import CalendarModalMobile from "./calendarModalMobile";
import CategoriasModalMobile from "./categoriasModalMobile";
import MenuBarMobile from "./menuBarMobile";

export const ModalesMobile = ({
  isMobileModalOpen,
  setIsMobileModalOpen,
  isModalCalendarMobileOpen,
  setIsModalCalendarMobileOpen,
  isMenuBarMobileOpen,
  setIsMenuBarMobileOpen,
  toggleMenuBarMobile,
  selectedCategories,
  selectedTags,
  handleCategorySelect,
  handleTagSelect,
  handleTagRemove,
  handleRowsChange,
  setDateRange // Accept setDateRange here
}) => {

  const handleDateSelect = (dates) => {
    setDateRange({  // Use setDateRange to update the date range
      startDate: dates[0],
      endDate: dates[1] || dates[0]
    });
  };

  // Handle modal close and optionally open another one
  const handleMobileModalClose = (setMobileModalState, nextModalStateSetter = null) => () => {
    setMobileModalState(false); // Close the current modal
    if (nextModalStateSetter) nextModalStateSetter(true); // Optionally open the next modal
  };

  return (
    <>
      {/* Mobile Categories Modal */}
      {isMobileModalOpen && (
        <ModalMobile isOpen={isMobileModalOpen} onClose={handleMobileModalClose(setIsMobileModalOpen)}>
          <CategoriasModalMobile
            selectedCategories={selectedCategories}
            selectedTags={selectedTags}
            onCategorySelect={handleCategorySelect}
            onTagSelect={handleTagSelect}
            onTagRemoveCategory={handleTagRemove}
          />
        </ModalMobile>
      )}

      {isModalCalendarMobileOpen && (
        <ModalMobile isOpen={isModalCalendarMobileOpen} onClose={handleMobileModalClose(setIsModalCalendarMobileOpen)}>
          <CalendarModalMobile onClose={handleDateSelect} />
        </ModalMobile>
      )}

      {isMenuBarMobileOpen && (
        <ModalMobile isOpen={isMenuBarMobileOpen} onClose={toggleMenuBarMobile}>
          <MenuBarMobile
            isOpen={isMenuBarMobileOpen} // Control visibility with this prop
            closeModal={toggleMenuBarMobile} // Pass the toggle function
            handleRowsChange={handleRowsChange} // Handle rows change
          />
        </ModalMobile>
      )}
    </>
  );
};

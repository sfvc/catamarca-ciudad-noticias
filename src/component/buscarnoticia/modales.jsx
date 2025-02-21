import { CalendarModal } from "./calendarModal";
import CategoriasModal from "./categoriasModal";
import MenuBar from "./menuBar";

export const Modales = ({
    isModalOpen,
    setIsModalOpen,
    isModalCalendarOpen,
    setIsModalCalendarOpen,
    menuOpen,
    toggleMenuBar,
    selectedCategories,
    selectedTags,
    handleCategorySelect,
    handleTagSelect,
    handleDateSelect,
    handleRowsChange,
}) => {
    const handleModalClose = (setModalState) => () => setModalState(false);

    return (
        <>
            {isModalOpen && (
                <CategoriasModal
                    isOpen={isModalOpen}
                    onClose={handleModalClose(setIsModalOpen)}
                    onCategorySelect={handleCategorySelect}
                    onTagSelect={handleTagSelect}
                    selectedCategories={selectedCategories}
                    selectedTags={selectedTags}
                />
            )}

            {isModalCalendarOpen && (
                <CalendarModal
                    isOpen={isModalCalendarOpen}
                    onClose={handleModalClose(setIsModalCalendarOpen)}
                    onDateSelect={handleDateSelect}
                />
            )}

            {menuOpen && (
                <MenuBar
                    isOpen={menuOpen}
                    closeModal={toggleMenuBar}
                    handleRowsChange={handleRowsChange}
                />
            )}
        </>
    );
};

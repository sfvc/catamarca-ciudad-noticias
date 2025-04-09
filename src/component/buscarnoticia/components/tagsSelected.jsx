
import { useQuery } from "react-query";
import { catamarcaApi } from "api/catamarcaApi";
import { useCategorias } from "hooks/useCategories";
import { useEtiquetas } from "hooks/useEtiquetas";

const TagSelected = ({
  selectedCategories,
  selectedTags,
  onCategorySelect,
  onTagSelect,
  onCategoryRemove,
  onTagRemove
}) => {

  const toggleCategory = (category) => {
    const exists = selectedCategories.some(c => c.id === category.id);
    if (exists) {
      onCategoryRemove(category);
    } else {
      onCategorySelect(category);
    }
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      onTagRemove(tag);
    } else {
      onTagSelect(tag);
    }
  };


  const { data: etiquetas = [], errorT, isLoadingT } = useEtiquetas();
  const { data: categorias = [], errorC, isLoadingC } = useCategorias();


  const TagItemList = ({ items, selectedItems, onToggle, iconSrc }) => (
    <div className="tag-selected-categorias__content">
      {items.map((item) => (
        <span
          key={item.id}
          className={`tag-selected-categorias__item ${selectedItems.some(i => i.id === item.id) ? 'active' : ''}`}
          onClick={() => onToggle(item)}
        >
          <img src={iconSrc} alt="" />
          <small>{item.nombre}</small>
        </span>
      ))}
    </div>
  );

  if (isLoadingC || isLoadingT) return <p>Cargando...</p>;
  if (errorC || errorT) return <p>Ocurrió un error al cargar los datos.</p>;

  return (
    <div className="tag-selected">

      <TagItemList
        items={categorias}
        selectedItems={selectedCategories}
        onToggle={toggleCategory}
        iconSrc="/images/buscarnoticias/categorias.svg"
      />

      <TagItemList
        items={etiquetas}
        selectedItems={selectedTags}
        onToggle={toggleTag}
        iconSrc="/images/buscarnoticias/tag.svg"
      />

    </div>
  );
};

export default TagSelected;

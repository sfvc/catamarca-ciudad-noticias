const AccessItems = ({label, onClick, titulo, img, alt, itemMobile, itemDesk }) => {
  return (
    <li className={`${itemMobile} ${itemDesk}`} onClick={onClick}>
        <img src={img} alt={alt} />
        <p>{titulo}</p>
        <small>{label}</small>
    </li>
  );
};

export default AccessItems;

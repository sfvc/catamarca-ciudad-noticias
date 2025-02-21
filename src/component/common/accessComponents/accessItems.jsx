const AccessItems = ({label, onClick, titulo }) => {
  return (
    <li className="accessItem" onClick={onClick}>
        <p>{titulo}</p>
        <small>{label}</small>
        <img src="" alt="" />
    </li>
  );
};

export default AccessItems;

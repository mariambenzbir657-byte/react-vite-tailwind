function Button(props) {
    return (
      <button className={`${props.className || 'bg-pink-600'} text-white px-6 py-2 rounded`}>
        {props.nom}
      </button>
    );
  }
export default Button
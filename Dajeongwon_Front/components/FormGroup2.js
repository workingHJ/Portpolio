const FormGroup2 = ({children, light, className, onSubmit, ...props}) => {
  const isLight = light ? " form-group-light" : "",
    extraClass = className ? ` ${className}` : "";

  return (
    <form {...props} className={`form-group${isLight}${extraClass}`} onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default FormGroup2;

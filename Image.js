const Image = (props) => {
  const { alt, ...otherProps } = props;

  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt} {...otherProps} />;
};
return (
  <header>
    <Image alt="Logo" src="logo.jpg" />
  </header>
);

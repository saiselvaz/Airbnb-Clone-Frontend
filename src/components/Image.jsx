export default function Image({src,...rest}) {
    src = src && src.includes('https://')
      ? src
      : 'https://airbnb-clone-backend-yr0d.onrender.com/uploads/'+src;
    return (
      <img {...rest} src={src} alt={''} />
    );
  }
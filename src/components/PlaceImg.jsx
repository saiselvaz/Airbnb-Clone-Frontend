import Image from "./Image";

export default function PlaceImg({place,index=0,className=null}) {
  if (!place.photos?.length) {
    return '';
  }
  if (!className) {
    className = 'w-full h-full object-cover';
  }
  return (
    <Image className={className} src={place.photos[index]} alt=""/>
  );
}
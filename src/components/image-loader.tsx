import { useEffect, useState } from "react";
import Loader from "./loader";

type Props = {
  src: string;
  alt?: string;
  className?: string;
};

const ImageLoader = ({ src, className }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader small />}
      <img
        className={className}
        src={src}
        style={loaded ? { display: "block" } : { display: "none" }}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
};

export default ImageLoader;

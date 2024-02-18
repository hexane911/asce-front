import { useEffect, useState } from "react";
import Loader from "./loader";
import classNames from "classnames";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  shine?: boolean
};

const ImageLoader = ({ src, className, shine }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader shine={shine} small />}
      <img
        className={classNames(className, "loader__image")}
        src={src}
        style={{opacity: loaded ? 1 : 0, transition: ".3s"}}
        onLoad={() => setLoaded(true)}
      />
    </>
  );
};

export default ImageLoader;

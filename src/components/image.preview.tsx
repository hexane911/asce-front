import { useOutsideClick } from "../tools";
import './image.preview.css'
type Props = {
  src: string;
  onClose: (arg: boolean) => void;
  isOpen: boolean;
};

const ImagePreview = ({ src, isOpen, onClose }: Props) => {
  const ref = useOutsideClick(() => onClose(false));

  if (!isOpen || !src) {
    return null
  }

  return (
    <div className="image-preview">
      <div ref={ref} className="image-preview__box">
        <img src={src} alt="" className="image-preview__photo" />
      </div>
    </div>
  );
};

export default ImagePreview;

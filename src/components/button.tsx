import classNames from 'classnames';
import './button.css'

type Props = {
    children: any;
    onClick?: () => void;
    variant: "black" | "white";
    className?: string;
    disabled?: boolean;
    link?: string;
}

const Button = ({children, variant, onClick, className, disabled} : Props) => {
    

    return <button onClick={onClick} disabled={disabled} className={classNames("button", className, variant)}>{children}</button>
}

export default Button
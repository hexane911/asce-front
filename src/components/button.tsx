import classNames from 'classnames';
import './button.css'

type Props = {
    children: any;
    onClick?: (arg?: any) => void;
    variant: "black" | "white";
    className?: string;
    disabled?: boolean;
    link?: string;
    type?: "button" | "submit"
}

const Button = ({children, variant, onClick, className, disabled, type} : Props) => {
    

    return <button type={type} onClick={onClick} disabled={disabled} className={classNames("button", className, variant)}>{children}</button>
}

export default Button
import type { IconType } from "react-icons";
import { useMemo, type CSSProperties } from "react";

import styles from "./StandardBtn.module.css";

interface StandardBtnProps {
   LeftIcon?: IconType;
   RightIcon?: IconType;
   text?: string;
   onClick?: () => void;
   style?: CSSProperties;
   disabled?: boolean;
   filled?: boolean;
   outlined?: boolean;
   theme?: "standard" | "info" | "success" | "warning" | "error";
   type?: "button" | "submit" | "reset";
}

export default function StandardBtn({
   LeftIcon,
   RightIcon,
   text,
   onClick,
   style,
   disabled,
   filled,
   outlined,
   theme,
   type = "button",
}: StandardBtnProps) {
   // memoized values
   const classNames = useMemo(() => {
      const classNames = [styles.btn]

      if (disabled) classNames.push(styles.disabled);

      if (filled) {
         switch (theme) {
            case "info":
               classNames.push(styles.filledInfo);
               break;
            case "success":
               classNames.push(styles.filledSuccess);
               break;
            case "warning":
               classNames.push(styles.filledWarning);
               break;
            case "error":
               classNames.push(styles.filledError);
               break;
            default:
               classNames.push(styles.filledStandard);
         }
      } else if (outlined) {
         switch (theme) {
            case "info":
               classNames.push(styles.outlinedInfo);
               break;
            case "success":
               classNames.push(styles.outlinedSuccess);
               break;
            case "warning":
               classNames.push(styles.outlinedWarning);
               break;
            case "error":
               classNames.push(styles.outlinedError);
               break;
            default:
               classNames.push(styles.outlinedStandard);
         }
      } else {
         switch (theme) {
            case "info":
               classNames.push(styles.standardInfo);
               break;
            case "success":
               classNames.push(styles.standardSuccess);
               break;
            case "warning":
               classNames.push(styles.standardWarning);
               break;
            case "error":
               classNames.push(styles.standardError);
               break;
            default:
               classNames.push(styles.standard);
         }
      }

      return classNames.join(" ");
   }, [disabled, filled, theme, outlined]);

   return (
      <button
         className={classNames}
         style={style}
         onClick={onClick}
         disabled={disabled}
         type={type}
      >
         {LeftIcon && <LeftIcon className={styles.icon} />}
         {text && <span className={styles.text}>{text}</span>}
         {RightIcon && <RightIcon className={styles.icon} />}
      </button>
   );
}

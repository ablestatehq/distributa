import { NavLink } from "react-router-dom";
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE,
} from "../../data/constants/pagination";
import cn from "../../utils/cn";

const NavigationLink = ({
  to,
  Icon,
  children = null,
  exact = false,
  ...props
}) => {
  return (
    <NavLink
      to={{
        pathname: to,
        search: `?page=${DEFAULT_PAGE}&pageSize=${DEFAULT_PAGE_SIZE}`,
      }}
      end={exact}
      className={({ isActive }) =>
        cn("flex w-full gap-x-4 py-5", {
          "bg-grey border border-greyborder rounded-lg": isActive,
          "border border-transparent": !isActive,
          "px-8": children,
          "justify-center": !children,
        })
      }
      {...props}
    >
      {Icon && <Icon variation="black" />}
      {children && <span className="">{children}</span>}
    </NavLink>
  );
};

export default NavigationLink;

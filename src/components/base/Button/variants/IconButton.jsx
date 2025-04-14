import Button from "..";
const IconButton = ({ icon, ...props }) => (
  <Button iconOnly shape="circle" {...props}>
    {icon}
  </Button>
);

export default IconButton;

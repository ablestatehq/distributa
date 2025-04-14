import Button from "..";

export const SubmitButton = ({ children, ...props }) => (
  <Button type="submit" {...props}>
    {children}
  </Button>
);

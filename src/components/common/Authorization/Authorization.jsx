import useAuthorization from "../../../hooks/useAuthorization";

export default function Authorization({
  policyCheck,
  allowedRoles,
  forbiddenFallback,
  children,
}) {
  const { checkAccess } = useAuthorization();
  let canAccess = false;

  if (allowedRoles) canAccess = checkAccess({ allowedRoles });

  if (policyCheck !== "undefined") {
    canAccess = policyCheck;
  }
  return canAccess ? children : forbiddenFallback;
}

import { useNavigation } from "react-router-dom"; // Assuming you're using React Router's navigation

function useNavigationLoadingState() {
  const navigation = useNavigation();

  const isLoading =
    navigation.state === "loading" && navigation.formData == null;

  const isReloading =
    navigation.state === "loading" &&
    navigation.formData != null &&
    navigation.formAction === navigation.location.pathname;

  const isRedirecting =
    navigation.state === "loading" &&
    navigation.formData != null &&
    navigation.formAction !== navigation.location.pathname;

  const isSubmitting = navigation.state === "submitting";

  return {
    isLoading,
    isReloading,
    isRedirecting,
    isSubmitting,
  };
}

export default useNavigationLoadingState;

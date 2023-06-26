import { redirect } from "react-router-dom";

const checkUser = async (request, appwrite) => {
    const pathname = new URL(request.url).pathname;
    try {
        await appwrite.getAccount();
    } catch (error) {
        throw redirect(`/login?redirect=${pathname}`);
    }
}

export default checkUser;
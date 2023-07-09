//we are using hook to get the userID from local storage

export const useGetUserID = () => {
    return window.localStorage.getItem("userID");
  };
  
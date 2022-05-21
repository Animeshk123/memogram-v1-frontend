const getUser = async (setUser) => {
    let response = await fetch(`${process.env.REACT_APP_URL}/api/v1/user?id=${localStorage.getItem("id")}`);
    let data = await response.json();
    if (data.auth) {
        setUser(data.user);
    }
    else {
        localStorage.removeItem("id");
    }
}

export { getUser };
import axios from "axios";

const Admin = () => {
    const fetcher = async () => {
        await axios({
            method: "get",
            url: "/api/user",
        });
    };
    return (
        <div className="container">
            Admin
            <button onClick={fetcher}>Fetchh....</button>
        </div>
    );
};
export default Admin;

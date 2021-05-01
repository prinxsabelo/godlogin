import React from "react";

class LoginGoogle extends React.Component {
    state = {
        loading: true,
        error: null,
        data: {},
    };

    componentDidMount() {
        fetch(`/api/auth/google/callback${this.props.location.search}`, {
            headers: new Headers({ accept: "application/json" }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Something went wrong!");
            })
            .then((data) => {
                this.setState({ loading: false, data });
            })
            .catch((error) => {
                this.setState({ loading: false, error });
                console.error(error);
            });
    }

    render() {
        const { loading, error, data } = this.state;
        if (loading) {
            return <div>Loading....</div>;
        }

        if (error) {
            return (
                <>
                    <div>
                        <p>Error:</p>
                        <code className="Code-block">{error.toString()}</code>
                    </div>
                </>
            );
        }

        return (
            <>
                <div>
                    <details>
                        {/* <summary>Welcome {data.user.name}</summary> */}
                        {/* Login for google first here.. */}
                        <p>Here is your info: </p>
                        <code className="Code-block">
                            {JSON.stringify(data, null, 2)}
                        </code>
                    </details>
                </div>
            </>
        );
    }
}
export default LoginGoogle;

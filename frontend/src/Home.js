import React from "react";

class Home extends React.Component {
    state = {
        googleLoginUrl: null,
    };

    componentDidMount() {
        fetch("/api/auth/google/url", {
            headers: new Headers({ accept: "application/json" }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Something went wrong!");
            })
            .then((data) => this.setState({ googleLoginUrl: data.url }))
            .catch((error) => console.error(error));
        console.log(this.state.googleLoginUrl);
    }

    render() {
        const { googleLoginUrl } = this.state;
        return (
            <>
                {googleLoginUrl && (
                    <>
                        <a className="App-link" href={googleLoginUrl}>
                            Sign in with Google
                        </a>
                        <div>{googleLoginUrl}</div>
                    </>
                )}
            </>
        );
    }
}
export default Home;

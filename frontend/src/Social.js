import { Component } from "react";

class Social extends Component {
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
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-5 shadow p-3">
                        <div>
                            {googleLoginUrl && (
                                <>
                                    <a
                                        className="App-link btn btn-danger"
                                        href={googleLoginUrl}
                                    >
                                        Sign in with Google
                                    </a>
                                    {/* <div>{googleLoginUrl}</div> */}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Social;

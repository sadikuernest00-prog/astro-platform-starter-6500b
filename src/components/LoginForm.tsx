import { useState, type FormEvent } from "react";
import { FirebaseError } from "firebase/app";
import { login, register } from "../lib/auth";

export default function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [message, setMessage] = useState("");
	const [isError, setIsError] = useState(false);
	const [loading, setLoading] = useState(false);

	function showMessage(text: string, error = false) {
		setMessage(text);
		setIsError(error);
	}

	function validateInputs() {
		if (!email.trim()) {
			showMessage("Enter your email address.", true);
			return false;
		}

		if (password.length < 6) {
			showMessage("Password must contain at least 6 characters.", true);
			return false;
		}

		return true;
	}

	function getFirebaseError(error: unknown) {
		if (!(error instanceof FirebaseError)) {
			return "Something went wrong. Please try again.";
		}

		switch (error.code) {
			case "auth/email-already-in-use":
				return "An account already exists with this email.";

			case "auth/invalid-email":
				return "Enter a valid email address.";

			case "auth/invalid-credential":
				return "Incorrect email or password.";

			case "auth/user-disabled":
				return "This account has been disabled.";

			case "auth/weak-password":
				return "Choose a stronger password.";

			case "auth/too-many-requests":
				return "Too many attempts. Wait a moment and try again.";

			case "auth/network-request-failed":
				return "Network error. Check your internet connection.";

			default:
				return "Authentication failed. Please try again.";
		}
	}

	async function handleLogin(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!validateInputs()) return;

		setLoading(true);
		showMessage("");

		try {
			await login(email.trim(), password);
			showMessage("Signed in successfully.");
			window.location.assign("/dashboard");
		} catch (error) {
			showMessage(getFirebaseError(error), true);
		} finally {
			setLoading(false);
		}
	}

	async function handleRegister() {
		if (!validateInputs()) return;

		setLoading(true);
		showMessage("");

		try {
			await register(email.trim(), password);
			showMessage("Account created successfully.");
			window.location.assign("/dashboard");
		} catch (error) {
			showMessage(getFirebaseError(error), true);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="login-form">
			<form onSubmit={handleLogin}>
				<label htmlFor="email">Email</label>

				<input
					id="email"
					name="email"
					type="email"
					autoComplete="email"
					placeholder="you@example.com"
					value={email}
					onChange={(event) => setEmail(event.target.value)}
					disabled={loading}
					required
				/>

				<label htmlFor="password">Password</label>

				<input
					id="password"
					name="password"
					type="password"
					autoComplete="current-password"
					placeholder="Enter your password"
					value={password}
					onChange={(event) => setPassword(event.target.value)}
					disabled={loading}
					minLength={6}
					required
				/>

				<button type="submit" disabled={loading}>
					{loading ? "Please wait..." : "Sign in"}
				</button>
			</form>

			<div className="divider">
				<span>or</span>
			</div>

			<button
				type="button"
				className="secondary-button"
				onClick={handleRegister}
				disabled={loading}
			>
				{loading ? "Please wait..." : "Create account"}
			</button>

			{message && (
				<p
					className={`message ${isError ? "error-message" : "success-message"}`}
					role="status"
				>
					{message}
				</p>
			)}
		</div>
	);
}
